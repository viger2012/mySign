const bus = require('../../event')
const Storage = require('../../utils/storage')
const API = require('../../utils/api')
const $vm = getApp()

const time = 3000
const tm = 500
let timer = null
let clickLogin = false

const methods = (function (){
    return {
        /**
         * 事件监听的处理方案
         * @param {*} self
         */
        onEventHandle(self){
            
            // timer = setInterval(() => {
            //     console.log('----------------------------检测登录---------------------------')
            //     console.log(self.data.num,Storage.isLogin,clickLogin)
            //     console.log('----------------------------检测登录---------------------------')
            //     if(clickLogin){
            //         self.data.num = 0
            //         clearInterval(timer)
            //         return
            //     }
            //     if(Storage.isLogin){
            //         self.data.num = 0
            //         clearInterval(timer)
            //         return
            //     }
            //     if(self.data.num >= (time / tm)){
            //         self.data.num = 0
            //         console.log('检测登录---------------------------')
            //         clearInterval(timer)
            //         // 检测到未登录
            //         bus.emit('no-login-app', {} , 'app')
            //         return
            //     }
            //     self.data.num++
            // },tm)

            // 监听事件未登录状态信息
            if(Storage.loginRemoveId){
                // 移除当前事件
                bus.remove(Storage.loginRemoveId)   
            }
            Storage.loginRemoveId = bus.on('no-login-app',(res) => {
                console.log('是否成功通知到：',res)
                wx.hideLoading()
                wx.hideToast()
                self.setData({
                    showLogin : true
                })
            },'app')

            if(Storage.loginSuccessRemoveId){
                // 移除当前事件
                bus.remove(Storage.loginSuccessRemoveId)   
            }
            Storage.loginSuccessRemoveId = bus.on('login-success',(res) => {
                console.log('-----------------------------登录成功---------------------------------')
                Storage.isLogin = true
                clickLogin = false
                wx.hideLoading()
                self.setData({
                    showLogin : false
                })
            },'login-com')

            if(Storage.loadUserinfoSuccessRemoveId){
                // 移除当前事件
                bus.remove(Storage.loadUserinfoSuccessRemoveId)   
            }
            bus.on('load-userinfo-success',(res) => {
                console.log('上报用户信息=========================')
                // 判断是不是静默登录
                let silent = false
                if(res.silent){
                    res = res.data
                    silent = true
                }
                console.log('用户信息加载完成并且上报',res)
                console.log(Storage)
                // 上报用户加密信息
				API.loginForMore({
					encryptedData: res.encryptedData,
					iv: res.iv,
					sessionKey : Storage.sessionKey,
					nickName: res.userInfo.nickName,
					headImage: res.userInfo.avatarUrl,
					notShowLoading: true,
				}).then(result => {
                    console.log('加载的信息：',result)
                    if(result && result.status === 'SUCCESS'){
                        if(res.silent){
                            res.cb()
                        }
                        Storage.loginLock = false
                        // 缓存用户的配置信息
                        wx.setStorageSync('userConfig',{
                            userInfo : res.userInfo,
                            token : Storage.token,
                            openId : Storage.openId
                        })
                        // 登录成功通知
                        bus.emit('login-success', {} , 'login-com')
                    }else{
                        if(silent){
                            console.log('静默登录--------------------上报结果失败')
                            // 用户未授权
                            bus.emit('no-login-app', res , 'app')
                            return
                        }
                        wx.hideLoading()
                        wx.showToast({
                            title : '登录失败',
                            icon : 'none',
                            image : '/assets/img/error.svg',
                            duration : 3000,
                            mask : true
                        })
                        clickLogin = false
                    }
				}).catch(err => {
                    if(silent){
                        console.log('静默登录--------------------上报信息失败')
                        // 用户未授权
                        bus.emit('no-login-app', res , 'app')
                        return
                    }
                    clickLogin = false
                    wx.hideLoading()
                    wx.showToast({
                        title : '登录失败',
                        icon : 'none',
                        image : '/assets/img/error.svg',
                        duration : 3000,
                        mask : true
                    })
                })
            },'login-com')
        },
        /**
         * 用户登录获取用户iv
         * @param {*} self
         */
        login(self){
            wx.showLoading({
                title : '登录中...',
                mask : true
            })
            console.log('加载登录')
            $vm.getLogin().then(res => {
                console.log(`登录成功：`,res)
                // 缓存关键数据
                Storage.token = res.token
                wx.setStorageSync('token',res.token)
                Storage.sessionKey = res.sessionKey
                Storage.openId = res.openId
                wx.setStorageSync('openId',res.openId)

                // 获取用户信息进行上报
                wx.getUserInfo({
                    withCredentials: true,
                    success(data){
                        console.log('输出永华信息：',data)
                        Storage.userInfo = data.userInfo
                        Storage.userC = data
                        // 确定触发消息
                        bus.emit('load-userinfo-success', data , 'login-com')
                    },
                    fail (err){
                        clickLogin = false
                        wx.hideLoading()
                        wx.showToast({
                            title : '获取用户信息失败',
                            icon : 'none',
                            image : '/assets/img/error.svg',
                            duration : 3000,
                            mask : true
                        })
                    }
                })

            }).catch(err => {
                clickLogin = false
                wx.hideLoading()
                wx.showToast({
                    title : '登录失败',
                    icon : 'none',
                    image : '/assets/img/error.svg',
                    duration : 3000,
                    mask : true
                })
            })
        }
    }
})()

Component({
    /**
     * 组件的属性列表
     * 
     */
    properties: {
        opts : Object
    },

    /**
     * 组件的初始数据
     */
    data: {
        showLogin : false,
        iPhoneX : Storage.iPhoneX,
        num : 0
    },
    ready(){
        console.log('------------------------------------组件实例化了：')
        methods.onEventHandle(this)
    },
    /**
     * 组件的方法列表
     */
    methods: {
        getUserInfo(e){
            // 是否点击登录
            clickLogin = true
            console.log('用户详情信息:',e.detail)
            // e.detail.userInfo = undefined
            if(e.detail.userInfo){
                // 用户授权后进行登录
                methods.login(this)
            }else{
                clickLogin = false
                wx.hideLoading()
                wx.showToast({
                    title : '获取用户信息失败',
                    icon : 'none',
                    image : '/assets/img/error.svg',
                    duration : 3000,
                    mask : true
                })
            }
        }
    }
})

