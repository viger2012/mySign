const API = require('../../../../utils/api')
const Storage = require('../../../../utils/storage')
const mta = require('../../../../utils/mta_analysis')
const util = require('../../../../utils/util')
const getImageInfo = util.wxPromisify(wx.getImageInfo)
let timer = null
let query = wx.createSelectorQuery()
// 结果值
let ran = 0
// 是否处在分享状态
let isShare = false
// 已经购买的数量
let ids = []
// 题目是否正在被点击状态
let isClick = false
const pageConf = {

    data: {
        navConf: {
            title: '占卜测试',
            state: 'root',
            isRoot: false,
            isIcon: true,
            root: '',
            bg : '#9262FB',
            isTitle: true,
        },
        baseUrl : 'https://xingzuo-1256217146.file.myqcloud.com',
        // 根据导航高度做出适配
        height : 64,
        IPX : false,
        res : {
            bg : '../../tmp/bg.png',
            title : '../../tmp/title.png',
            button : '../../tmp/button.png',
            desc : '../../tmp/bottom.png',
            code : '/assets/images/qrcodetoday.png'
        },
        lists : [{
            id : 11111,
            question : '你喜欢看什么类型的电视节目',
            answer : ['惊悚类','喜剧类','综艺类','喜剧类','综艺类']
        }],
        title : '',
        results : [1,2,3],
        // 整体面板高度
        pageHei:-1,
        // 答题面板高度
        subHei: 840,
        // 答题面板距离面板顶部
        subTop:80,
        keys : ['A','B','C','D','E','F'],
        // 当前题目选择的答案
        ind : -1,
        // 当前正在答题数
        current : 1,
        // 当前答题数的切换变量
        tmpCurrent : 1,
        // 当前测试第几步
        status : 1,
        // 结果图
        resImg : '../../tmp/res_1.png',
        resBg : '#fff',
        head : '/assets/images/default_head.png',
        nickName : '',
		mask: true,
		system: {},
		animate: ''
    },

    onLoad: function(options) {
        mta.Page.init()
        this._handleShare(options)
        isClick = false
		isShare = false
		ids = []
        console.log('分享的信息参数：',options)
        setTimeout(() => {
            this.setData({
                head : Storage.userInfo.avatarUrl === '' ? '/assets/images/default_head.png' : Storage.userInfo.avatarUrl,
                nickName : Storage.userInfo.nickName,
				system: Storage.systemInfo
            })
        },150)
    },

    onShow: function() {
        if (this.data.mask && isShare) {
			this.setData({
				animate: 'fly-animate'
			})
			setTimeout(() => {
				this.setData({
					mask: false
				})
			}, 1700)
		}
    },

    onHide: function() {

    },

    onShareAppMessage: function() {
        mta.Event.stat('divine_one_share_click',{gameid:this.data.gameId})
		// 正在分享状态
		isShare = true
        return {
            title : this.data.title,
            imageUrl : '../../source/share_test.png',
			path : '/pages/home/home?to=divine_one&from=share&source=share&id=999996&tid=123453&shareform=divine&gameId=' + this.data.gameId,
		}
    },
    // 开始游戏
    _startGame(){
        mta.Event.stat('start_game',{ gameid : this.data.gameId })
        this.setData({
            status : 2
        })
        setTimeout(() => {
            this._resizePanel()
        },300)
        console.log('打开游戏')
    },
    // 选择当前题目的答案并且进入下一题
    _switchSub(e){
        let self = this
        let {index} = e.currentTarget.dataset
        if(isClick){
            return
        }
        isClick = true
        console.log(e)
        console.log('题目下标：',index)
        let n = this.data.current + 1
        this.setData({
            current : n,
            ind : index
        })
        setTimeout(() => {
            isClick = false
        },300)
        if(n > this.data.lists.length){
            ran = util.random(0,this.data.results.length - 1)
            this.setData({
                resImg : this.data.results[ran]
            })
            wx.showLoading({
                title: '正在计算结果',
                mask: true,
            })

            wx.getStorage({
                key: 'divineIds',
                complete: function (v) {
                    console.log('输出游戏Id', v)
                    let mask = true
                    
                    if (v.data && v.data.constructor === Array && v.data.indexOf(parseInt(self.data.gameId)) != -1) {
                        mask = false
                    }
    
                    ids = v.data ? v.data : []
    
                    setTimeout(() => {
                        self.setData({
                            status: 3,
                            mask: mask,
                            'navConf.title': '测试结果'
                        })
                        wx.hideLoading();
                    }, 1600)
                }
            })
            
            // 进入结果页
            return
        }else{
            timer = setTimeout(() => {
                this.setData({
                    tmpCurrent : n
                })
                this._resizePanel()
            },200)
        }
    },
    // 支付小星星购买
    _payStar() {
        let self = this
        let starNum = 9
        console.log('前往支付')
        mta.Event.stat('pay_click_test', {})
        wx.showModal({
            title: '确定快速查看？',
            content: '快速查看需要消耗' + starNum + '颗小星星',
            showCancel: true,
            cancelColor: '#999999',
            cancelText: '我再想想',
            confirmText: '确定',
            confirmColor: '#9262FB',
            success: function (res) {
                console.log(res)
                mta.Event.stat('pay_click_test_success', {})
                if (res.confirm) {
                    API.getBlance({
                        notShowLoading: true
                    }).then(data => {
                        if (!data) {
                            return
                        }
                        console.log('钱包星星数量：', data)
                        // data.balance = 2000
                        // 当小星星不足时进行提示
                        if (data.balance < starNum) {

                            mta.Event.stat('pay_test_fail', {})

                            if (!Storage.isLogin) {
                                return
                            }

                            wx.showModal({
                                title: '余额不足',
                                content: '请先去获取一些小星星吧',
                                showCancel: true,
                                cancelColor: '#999999',
                                cancelText: '我再想想',
                                confirmText: '立即获取',
                                confirmColor: '#9262FB',
                                success: function (res) {
                                    if (res.confirm) {
                                        // 跳转到小星星页面
                                        wx.navigateTo({
                                            url: '/pages/banner/banner'
                                        })
                                    }
                                }
                            })
                        } else {

                            mta.Event.stat('pay_test_success', {})
                            wx.showLoading({
                                title: '购买中...'
                            })

                            API.setStar({
                                id: 0,
                                balance: -starNum,
                                notShowLoading: true
                            }).then(data => {
                                console.log('购买结果：', data)
                                wx.hideLoading()
                                if (data && data.status === 'SUCCESS') {
                                    self.setData({
                                        animate: 'fly-animate'
                                    })
                                    console.log(ids)
                                    ids.push(parseInt(self.data.gameId))
                                    wx.setStorage({
                                        key: 'divineIds',
                                        data: ids
                                    })
                                    setTimeout(() => {
                                        self.setData({
                                            mask: false
                                        })
                                    }, 1700)
                                } else {
                                    console.log('购买失败')
                                    wx.showModal({
                                        title: '失败提示',
                                        content: '未知错误，请联系我们',
                                        showCancel: false,
                                        confirmText: '确定',
                                        confirmColor: '#9262FB'
                                    })
                                }
                            }).catch(err => {
                                wx.hideLoading()
                                console.log('购买失败')
                                wx.showModal({
                                    title: '失败提示',
                                    content: '购买失败',
                                    showCancel: false,
                                    confirmText: '确定',
                                    confirmColor: '#9262FB'
                                })
                            })
                        }
                    })
                }
            }
        })
    },
    // 处理分享参数
    _handleShare(opts){
        if(opts){
            if(!opts.gameId){
                wx.showToast({
                    title: '不存在此占卜，请重新尝试',
                    icon: 'none',
                    duration: 1600,
                    mask: true
                });
                return
            }
            this.setData({
                gameId : opts.gameId
            })
            if(opts.from === 'share'){
                mta.Event.stat('divine_share_come',{ gameid : opts.gameId })
            }else{
                mta.Event.stat('divine_click_come',{ gameid : opts.gameId })
            }
            // 总量统计
            mta.Event.stat('one_from_count',{ gameid : opts.gameId })
            // 获取游戏的内容
            this._getGameInfo()
        }
    },
   
    // 获取内容信息
    _getGameInfo(){
        console.log('执行了')
        API.getGameInfo({id : this.data.gameId}).then(res => {
            console.log('玩法结果',res)
            if(!res){
                wx.showToast({
                    title: '当前测试已失踪，正在为你返回',
                    icon: 'none',
                    duration: 1600,
                    mask: true,
                    success(){
                        setTimeout(() => {
                            wx.navigateBack({
                                delta: 1
                            });
                        },1600)
                    }
                });
                return
            }
            let tmp = res.test
            let data = this.data
            console.log(tmp)
            try {
                let _res = {
                    bg : `${data.baseUrl}${tmp.picA}`,
                    title : `${data.baseUrl}${tmp.picB}`,
                    button : `${data.baseUrl}${tmp.picC}`,
                    desc : `${data.baseUrl}${tmp.picD}`,
                    code : `${data.baseUrl}${tmp.picE}`
                }
                let _list = res.test.results.map((v) => {
                    return `${data.baseUrl}${v}`
                })
                this.setData({
                    lists : res.test.questions,
                    res:_res,
                    title : tmp.name,
                    results : _list,
                    'navConf.title' : tmp.name
                })
            } catch (error) {
                
                wx.showToast({
                    title: '当前测试已失踪，正在为你返回',
                    icon: 'none',
                    duration: 1600,
                    mask: true,
                    success(){
                        setTimeout(() => {
                            wx.navigateBack({
                                delta: 1
                            });
                        },1600)
                    }
                });
            }
        }).catch(err => {
            console.log(err)
            wx.showToast({
                title: '当前测试已失踪，正在为你返回',
                icon: 'none',
                duration: 1600,
                mask: true,
                success(){
                    setTimeout(() => {
                        wx.navigateBack({
                            delta: 1
                        });
                    },1600)
                }
            });
        })
        this._resizePanel()
    },

    // 重置答题面板的高度
    _resizePanel(){
        query = wx.createSelectorQuery()
        query.select('.page-panel').boundingClientRect()
        query.select('.card_' + (this.data.tmpCurrent - 1)).boundingClientRect()
        query.exec((res) => {
            console.log('输出查询内容：',res)
            if(!res[1]){
                return
            }
            this.setData({
                subHei : res[1].height,
                pageHei : res[0].height,
                subTop : (res[0].height - res[1].height) / 2
            })
        })
    },
    // 前往摇一摇
    _goShake(){
		mta.Event.stat("divine_shake_click", {})
		wx.navigateTo({
			url:'/pages/lot/shake/shake'
		})
    },
    // 前往好友配对
    _goPairPYQ(){
		mta.Event.stat("divine_pair_click", {})
		wx.navigateTo({
			url:'/pages/components/pages/pairCus/pairCus'
		})
    },
    // 绘制图片生成图片并将图片展示到页面上
    _drawCode(){
        mta.Event.stat("test_pic_toimg",{gameid:this.data.gameId})
        let head = ''
        let self = this
        wx.showToast({
            title : '生成图片中...',
            icon : 'loading',
            mask : true
        })
        // wx.request({
        //     url : 'https://cli.im/mina/generate_qrcode',
        //     header: {
		// 		'Content-Type': 'application/x-www-form-urlencoded',
		// 	},
        //     data : {
        //         tpl_id : '17792',
        //         code_type : 'wxcode',
        //         'param_value[0]' : 'share',
        //         'param_value[1]' : 'divine_one',
        //         'param_value[2]' : this.data.gameId,
        //     },
        //     success(res){
        //         if(res && res.statusCode === 200 && res.data){
        //             let data = res.data
        //             if(data.code === 1 && data.data){
                        
        //                 head = data.data.replace('http://','https://')
                        // console.log('二维码网络地址:',head)
                        // console.log('二维码：',data,self.data.results[ran],Storage)
                        util.Promise.all([
                            getImageInfo({
                                src: self.data.res.code
                            }),
                            getImageInfo({
                                src: self.data.results[ran]
                            }),
                            getImageInfo({
                                src: Storage.userInfo.avatarUrl === '' ? '/assets/images/default_head.png' : Storage.userInfo.avatarUrl
                            })
                        ]).then(res => {
                            console.log('图片信息',res)
                            // 画图
                            const ctx = wx.createCanvasContext('shareCanvas')
                            ctx.save()
                            ctx.setFillStyle('#fff');
                            ctx.fillRect(0, 0, 750, 1436)
                            ctx.drawImage(res[0].path, 0, 0, 750, 1206) //背景图
                            // ctx.drawImage('../../tmp/res_1.png', 0, 0, 750, 1206)
                            ctx.drawImage(res[1].path, 0, 0, 750, 1206) //结果图

                            ctx.save()
                            ctx.arc(100, 100, 40, 0, 2 * Math.PI, false)
                            ctx.fill()
                            ctx.clip()
                            ctx.drawImage(res[2].path, 60, 60, 80, 80); // 头像
                            ctx.restore()

                            ctx.drawImage(res[0].path, 520, 1246, 150, 150);

                            ctx.setFillStyle('#fff')
                            ctx.setTextAlign('left')
                            ctx.setFontSize(36)
                            ctx.fillText(Storage.userInfo.nickName, 160, 115)
                            console.log(ctx)
                            ctx.setFillStyle('#000')
                            ctx.setLineWidth(5)
                            ctx.fillText('小哥星座', 80, 1310)
                            ctx.setFillStyle('#999999')
                            ctx.setFontSize(24)
                            ctx.fillText('长按识别二维码,获取你的测试结果', 80, 1370)

                            
                            ctx.draw()
                            console.log('画图完成===================')
                            setTimeout(() => {
                                wx.canvasToTempFilePath({
                                    x : 0,
                                    y : 0,
                                    width : 750,
                                    height : 1436,
                                    destWidth : 750,
                                    destHeight : 1436,
                                    canvasId: 'shareCanvas',
                                    success: function (res) {
                                        console.log(res.tempFilePath)
                                        wx.saveImageToPhotosAlbum({
                                            filePath: res.tempFilePath,
                                            success(data) {
                                                setTimeout(() => {
                                                    wx.hideLoading()
                                                    wx.showModal({
                                                        title: '保存成功',
                                                        content: '图片已经保存到相册，可以分享到朋友圈了',
                                                        showCancel: false,
                                                    })
                                                },300)
                                            },
                                            fail() {
                                                wx.hideLoading()
                                                wx.showToast({
                                                    title: '图片保存失败，请检查右上角关于小哥星座的设置中查看是否开启权限',
                                                    icon: 'none',
                                                    duration: 1700
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
                                            duration: 1700
                                        })
                                    },
                                })
                            },500)
                        }).catch(err => {
                            wx.showToast({
                                title: '生成分享信息失败',
                                icon: 'none',
                                duration: 1700,
                                mask: true
                            })
                        })
        //             }else{
        //                 wx.showToast({
        //                     title: '生成分享信息失败',
        //                     icon: 'none',
        //                     duration: 1700,
        //                     mask: true
        //                 })
        //             }
        //         }else{
        //             wx.showToast({
        //                 title: '生成分享信息失败',
        //                 icon: 'none',
        //                 duration: 1700,
        //                 mask: true
        //             })
        //         }
        //     },
        //     fail(){
        //         wx.showToast({
        //             title: '生成分享信息失败',
        //             icon: 'none',
        //             duration: 1700,
        //             mask: true
        //         })
        //     }
        // })
    },
 
    // 根据导航设置高度
    _setHeight(e){
        let temp = e.detail || 64 
        this.setData({
            height:temp,
            IPX : temp === 64 ? false : true
        })
    },
    /**
     * 上报formId
     * @param {*} e
     */
    _reportFormId(e){
        console.log(e.detail.formId)
        let formid = e.detail.formId
        API.getX610({ notShowLoading: true, formid: formid })
    }
}

Page(pageConf);