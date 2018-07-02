// pages/lot/lotdetail/lotdetail.js
const $vm = getApp()
let _GData = $vm.globalData
const { canvasTextAutoLine, parseLot } = $vm.utils
var mta = require('../../../utils/mta_analysis.js');
const imgs = require('./imgs.js')
const Storage = require('../../../utils/storage')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isFromShare: false,
		huan: false,//拆签成功
		showCanvas: false,
		imgs: imgs,
		lock: false, //锁
		navConf: {
			title: '拆签',
			state: 'root',
			isRoot: false,
			isIcon: true,
			iconPath: '',
			root: '',
			isTitle: true
		},
		lotDetail: {
			troops : [{photo : '/assets/images/default_head.png'}],
			qianOpenSize: 3,
			showChai: true,
			hasChai: false,
			lotNotCompleted : true,
			troops : []
		},
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		mta.Page.init()
		// 重新获取一次全局数据
		_GData = $vm.globalData
		console.log(options)
		wx.hideShareMenu({
			success: function (res) { },
			fail: function (res) { },
			complete: function (res) { },
		})
		if (options.sound) {
			const innerAudioContext = wx.createInnerAudioContext()
			innerAudioContext.autoplay = true
			innerAudioContext.src = '/assets/incoming.m4a'
			innerAudioContext.onPlay(() => {
				console.log('开始播放')
			})
		}

		const _self = this
		const _SData = this.data
		let qId = options.lotId
		let pageFrom = options.from
		_self.setData({
			userInfo: _GData.userInfo
		})
		let login_timer = ''
		if (!_GData.userInfo) {
			console.log('进入授权功能=============')
			login_timer = setInterval(() => {
				console.log('进入授权功能=============',Storage)
				if(!Storage.loginStatus){
					return false
				}
				// 清除等待
				clearInterval(login_timer)
				wx.getUserInfo({
					success: function (res) {
						console.log(res)
						if (res.userInfo) {
							wx.setStorage({
								key: 'userInfo',
								data: res.userInfo,
							})
							_GData.userInfo = res.userInfo
							_self.setData({
								userInfo: _GData.userInfo
							})
							if(!Storage.loginForMore){
								// 上报用户加密信息
								$vm.api.loginForMore({
									encryptedData: res.encryptedData,
									iv: res.iv,
									sessionKey : Storage.sessionKey,
									nickName: res.userInfo.nickName,
									headImage: res.userInfo.avatarUrl,
									notShowLoading: true,
								}).then(result => {
									// 确定用户信息已经上报
									Storage.loginForMore = true
									// 获取签的数据
									getTokenQian(pageFrom,_self,qId,_GData)
								}).catch(err => {
									Storage.loginForMore = false
									wx.redirectTo({
										url: '/pages/checklogin/checklogin?from=' + _SData.fromPage + '&and=shake'
									})
								})

							}else{
								getTokenQian(pageFrom,_self,qId,_GData)
							}
						}
					},
					fail: function (res) {
						// 查看是否授权
						wx.getSetting({
							success: function (res) {
								if (!res.authSetting['scope.userInfo']) {
	
									_self.setData({
										hasAuthorize: false
									})
									wx.redirectTo({
										url: '/pages/checklogin/checklogin?from=' + pageFrom + '&lotId=' + qId
									})
								}
							}
						})
					}
				})
			},200)
			
		}else{
			// 获取签的数据
			getTokenQian(pageFrom,_self,qId,_GData)
		}
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function (res) {
		if (res.from === 'menu') {
			mta.Event.stat("ico_shake_right_share", {})
		}
		const _self = this
		const SData = this.data
		var shareImg = '/assets/images/share_qian.jpg'
		var shareMsg = '快来戳，真的是令人脸红心跳的结果！'
		var sharepath = '/pages/lot/lotdetail/lotdetail?from=share&lotId=' + SData.lotDetail.id
		if (!SData.lotDetail.lotNotCompleted) {
			shareImg = '/assets/images/share_tong.jpg'
			shareMsg = '快来戳，真的是令人脸红心跳的结果！'
			sharepath = '/pages/lot/shakelot/shake?from=share&where=detail'
		}
		console.log("shareImg-qId===" + shareImg)
		console.log("onShareAppMessage-qId===" + SData.lotDetail.id)
		return {
			title: shareMsg,
			imageUrl: shareImg,
			path: sharepath,
			success: function (res) {
				// 转发成功
			},
			fail: function (res) {
				// 转发失败
			}
		}
	},
	//拆签或者去
	chai: function (e) {
		let formid = e.detail.formId
		if (this.data.lock && !this.data.lotDetail.hasChai) {
			return false;
		}
		this.data.lock = true;
		$vm.api.getX610({ notShowLoading: true, formid: formid })
		const _self = this
		const _Sdata = this.data

		if (_Sdata.lotDetail.hasChai) {
			wx.navigateTo({
				url: '/pages/lot/shakelot/shake?formid=' + formid
			})
			return
		}
		_self.setData({
			showHaoren: true,
		})
		$vm.api.getX506({ id: _Sdata.lotDetail.id, notShowLoading: true })
			.then(res => {
				console.log('未知数据：',res)
				var lotDetail = parseLot(res)
				if (res.status == 1) {
					mta.Event.stat("ico_chai_completed", {})
					_self.setData({
						huan: true,
					})
					setTimeout(function () {
						_self.setData({
							lotDetail: lotDetail,
						})
					}, 2000)
				} else {
					_self.setData({
						lotDetail: lotDetail
					})
				}

				setTimeout(function () {
					_self.setData({
						showHaoren: false,
					})
					_self.data.lock = true;
				}, 2800)
			})
			.catch(err => {

			})
	},
	onclickShareFriend: function (e) {
		mta.Event.stat("ico_detail_share", {})
		let formid = e.detail.formId

		$vm.api.getX610({ notShowLoading: true, formid: formid })
	},
	//保存图片
	onclickShareCircle: function (e) {
		mta.Event.stat("ico_detail_save", {})
		let formid = e.detail.formId

		$vm.api.getX610({ notShowLoading: true, formid: formid })
		const _self = this
		const _SData = _self.data
		wx.showLoading({
			title: '图片生成中...',
			mask: true
		})
		_self.setData({
			showCanvas: true,
		})

		console.log(e)
		const ctx = wx.createCanvasContext('shareCanvas')
		ctx.drawImage('/assets/images/share1Bg.png', 0, 0, 750, 750)
		// 签类型
		ctx.setTextAlign('center')    // 文字居中
		ctx.setFillStyle('#ffffff')  // 文字颜色：白色
		ctx.setFontSize(40)         // 文字字号：22px
		ctx.fillText(_SData.lotDetail.qianName, 750 / 2, 77 * 2 + 40)


		var s = _SData.lotDetail.qianContent.split('\n')

		console.log(s)
		if (s.length == 1) {
			ctx.setTextAlign('left')
			ctx.setFontSize(29)
			canvasTextAutoLine(ctx, _SData.lotDetail.qianContent, 64, 125 * 2 + 32, 40, 64)
		} else {
			ctx.setTextAlign('center')
			ctx.setFontSize(29)
			for (var i = 0; i < s.length; i++) {
				ctx.fillText(s[i], 375, 125 * 2 + (32 + 10) * i, 310 * 2)
			}
		}

		ctx.setTextAlign('left')
		ctx.setFontSize(28)
		const metrics1 = ctx.measureText(_SData.lotDetail.ownerNickName).width / 2
		ctx.fillText(_SData.lotDetail.ownerNickName, 750 - metrics1 - 64 * 2 - 32, 205 * 2 + 28, 310 * 2)
		let timer = new Date();
		let newDate = timer.getFullYear() + '-' + (timer.getMonth() + 1 > 9 ? timer.getMonth() + 1 : '0' + (timer.getMonth() + 1)) + '-' + (timer.getDate() > 9 ? timer.getDate() : '0' + timer.getDate());
		console.log('输出日期：', newDate)
		// 计算文本长度
		const metrics2 = ctx.measureText(newDate).width / 2

		ctx.fillText(newDate, 750 - metrics2 - 64 * 2 - 32, 225 * 2 + 28, 310 * 2)

		const qrImgSize = 110
		ctx.drawImage('/assets/images/qrcodeonelot.png', 297 * 2, 306 * 2, qrImgSize, qrImgSize)
		ctx.stroke()
		ctx.draw()
		setTimeout(function () {
			wx.canvasToTempFilePath({
				canvasId: 'shareCanvas',
				success: function (res) {
					console.log(res.tempFilePath)
					wx.saveImageToPhotosAlbum({
						filePath: res.tempFilePath,
						success(res) {
							wx.hideLoading()
							wx.showModal({
								title: '保存成功',
								content: '图片已经保存到相册，可以分享到朋友圈了',
								showCancel: false
							})

						}, fail(res) {
							wx.showToast({
								title: '图片保存失败，请检查右上角关于小哥星座的设置中查看是否开启权限',
								icon: 'none',
								duration: 3000
							})
							_self.setData({
								showCanvas: false,
							})
						}, complete(res) {
							// wx.hideLoading()
							_self.setData({
								showCanvas: false
							})
						}
					})
				},
				fail: function (res) {
					console.log(res)
					wx.hideLoading()
					wx.showToast({
						title: '图片保存失败，请检查右上角关于小哥星座的设置中查看是否开启权限',
						icon: 'none',
						duration: 3000
					})
					_self.setData({
						showCanvas: false
					})
				}
			})
		}, 1000)
	},
	//分享的返回主页
	onclickHome: function (e) {
		mta.Event.stat("ico_shake_home", {})
		let formid = e.detail.formId
		$vm.api.getX610({ notShowLoading: true, formid: formid })
		wx.reLaunch({
			url: '/pages/home/home',
		})
	}
})


/**
 * 重新加载数据
 * @param {*} qId
 */
function getQian(qId,_self,GData){
	wx.getNetworkType({
		success: function(res) {
			console.log('输出当前网络状态：',res)
			if(res.networkType === 'none'){
				wx.showLoading({
					title : '加载中...',
					mask : true
				})
				setTimeout(function(){
					$vm.api.getX511({ id: qId })
					.then(res => {
						console.log('签的数据===================：', res)
						var lotDetail = parseLot(res)
						_self.setData({
							lotDetail: lotDetail
						})
					}).catch(err =>{
						_self.setData({
							isError : true
						})
						wx.showModal({
							title: '网络错误',
							content: '小主您的网络有点小问题哦,请重新尝试',
							confirmText : '重新尝试',
							showCancel: false,
							success (){
								login(_self,GData,qId)
							}
						})
						console.log('进入错误状态')
					})
				},3000)
			}else{
				$vm.api.getX511({ id: qId })
				.then(res => {
					console.log('签的数据===================：', res)
					var lotDetail = parseLot(res)
					_self.setData({
						lotDetail: lotDetail
					})
				}).catch(err =>{
					_self.setData({
						isError : true
					})
					wx.showModal({
						title: '网络错误',
						content: '小主您的网络有点小问题哦,请重新尝试',
						confirmText : '重新尝试',
						showCancel: false,
						success (){
							// getQian(qId,_self);
							login(_self,GData,qId)
						}
					})
					console.log('进入错误状态')
				})
			}
		}
	})
}

/**
 * 获取用户信息后进行登录拉取签的数据
 * @param {*} pageFrom
 * @param {*} _self
 * @param {*} qId
 * @param {*} _GData
 */
function getTokenQian(pageFrom,_self,qId,_GData){
	if (pageFrom == 'share' || pageFrom == 'list' || pageFrom == 'form') {
		if (pageFrom == 'share' || pageFrom == 'form') {
			_self.setData({
				isFromShare: true,
				"navConf.root": '/pages/home/home'
			})
		}
		let token = wx.getStorageSync('token')
		if (token) {
			getQian(qId,_self)
		} else {
			login(_self,_GData,qId)
		}
	} else {
		_self.setData({
			lotDetail: _GData.lotDetail
		})
	}
}

/**
 * 重新登录，重新授权
 * @param {*} self
 * @param {*} GData
 * @param {*} qId
 */
function login(self,GData,qId){
	$vm.getLogin().then(data => {
		console.log(data)
		wx.setStorageSync('token', data.token)
		// 登录状态
		Storage.loginStatus = true
		Storage.sessionKey = data.sessionKey
		wx.getUserInfo({
			success: function (res) {
				console.log(res)
				if (res.userInfo) {
					wx.setStorage({
						key: 'userInfo',
						data: res.userInfo,
					})
					GData.userInfo = res.userInfo
					self.setData({
						userInfo: GData.userInfo
					})
					// 上报用户加密信息
					$vm.api.loginForMore({
						encryptedData: res.encryptedData,
						iv: res.iv,
						sessionKey : Storage.sessionKey,
						nickName: res.userInfo.nickName,
						headImage: res.userInfo.avatarUrl,
						notShowLoading: true,
					}).then(result => {
						// 确定用户信息已经上报
						Storage.loginForMore = true
						// 获取签的数据
						getQian(qId,self,GData)
					}).catch(err => {
						Storage.loginForMore = false
						wx.redirectTo({
							url: '/pages/checklogin/checklogin?from=' + _SData.fromPage + '&and=shake'
						})
					})
					
					$vm.api.getSelectx100({
						constellationId: GData.selectConstellation.id,
						nickName: res.userInfo.nickName,
						headImage: res.userInfo.avatarUrl,
						notShowLoading: true,
					}).then(res => {
						
					})
				}
			},
			fail: function (res) {
				// 查看是否授权
				wx.getSetting({
					success: function (res) {
						if (!res.authSetting['scope.userInfo']) {
							self.setData({
								hasAuthorize: false
							})
							wx.redirectTo({
								url: '/pages/checklogin/checklogin?from=' + pageFrom + '&lotId=' + qId
							})
						}
					}
				})
			}
		})
	}).catch(err => {
		Storage.loginStatus = false
		Storage.sessionKey = ''
		wx.showModal({
			title: '网络错误',
			content: '小主您的网络有点小问题哦,请重新尝试',
			confirmText : '重新尝试',
			showCancel: false,
			success (){
				login(self,GData,qId)
			}
		})
	})
}