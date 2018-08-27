
cc.Class({
    extends: cc.Component,

    properties: {
        display: cc.Sprite,
        btn_share: {
            default: null,
            type: cc.Node
        }
    },

    start () {
        /*this._isShow = false;

        
        this.tex = new cc.Texture2D();*/


        if(typeof(wx) != "undefined") {
            var self = this;

            wx.showShareMenu({
              withShareTicket: true
            });

            wx.updateShareMenu({
              withShareTicket: true
            });

            this.btn_share.on('touchstart', function ( event ) {
                wx.shareAppMessage({
                    title: '最强挑战赛排行，看见没？那个就是第一名的人~',
                    imageUrl: canvas.toTempFilePathSync({
                        x: 75,
                        y: 300,
                        width: 600,
                        height: 480,
                        destWidth: 500,
                        destHeight: 400
                    }),
                    success: function(res) {
                    }
                });
            }, this);
            wx.onShareAppMessage(function () {
              // 用户点击了“转发”按钮
              return {
                title: '最强挑战赛，火热进行中~',
                imageUrl: "res/raw-assets/Texture/share/s1.png",
                success: function(res) {
                }
              }
            });

            /*wx.login({
              success: function (loginCode) {

                    wx.getUserInfo({
                        lang: 'zh_CN',
                        success: function (res) {

                            self.data = {
                                'type': 'user',
                                'name': res.userInfo.nickName,
                                'ava': res.userInfo.avatarUrl,
                                'sex': res.userInfo.gender,
                                'loginCode': loginCode.code
                            }

                            wx.request({
                                url: 'https://url/',
                                method: 'POST',
                                data: self.data,    //参数为键值对字符串
                                header: {
                                    //设置参数内容类型为x-www-form-urlencoded
                                    'Content-Type':'application/x-www-form-urlencoded',
                                    'Accept': 'application/json'
                                },
                                success: function (res) {

                                },
                                fail: function (res) {

                                    // console.log('f',res)
                                }
                            });

                        },
                        fail: function (res) {

                            // iOS 和 Android 对于拒绝授权的回调 errMsg 没有统一，需要做一下兼容处理
                            if (res.errMsg.indexOf('auth deny') > -1 || res.errMsg.indexOf('auth denied') > -1 ) {
                              // 处理用户拒绝授权的情况
                                wx.showModal({
                                    title: '小卜:',
                                    content: '登录后才可以在排行榜看到你的分数哦',
                                    success: function (res) {
                                      if (res.confirm) {
                                            wx.openSetting({
                                                success:function(res){
                                                    wx.getUserInfo({
                                                        lang: 'zh_CN',
                                                        success: function (res) {

                                                            self.data = {
                                                                'type': 'user',
                                                                'name': res.userInfo.nickName,
                                                                'ava': res.userInfo.avatarUrl,
                                                                'sex': res.userInfo.gender,
                                                                'loginCode': loginCode.code
                                                            }

                                                            wx.request({
                                                                url: 'https://url/',
                                                                method: 'POST',
                                                                data: self.data,    //参数为键值对字符串
                                                                header: {
                                                                    //设置参数内容类型为x-www-form-urlencoded
                                                                    'Content-Type':'application/x-www-form-urlencoded',
                                                                    'Accept': 'application/json'
                                                                },
                                                                success: function (res) {

                                                                },
                                                                fail: function (res) {

                                                                    // console.log('f',res)
                                                                }
                                                            });
                                                        }

                                                    });
                                                }

                                            })
                                      }
                                    },
                                    fail: function (argument) {
                                    }
                                });

                            }


                        }
                    })

              }
            });*/

        }

    },

    _updaetSubDomainCanvas () {
        /*if (!this.tex) {
            return;
        }
        this.tex.initWithElement(sharedCanvas);
        this.tex.handleLoadedTexture();

        
        this.display.spriteFrame = new cc.SpriteFrame(this.tex);*/

    },

    update () {
        // this._updaetSubDomainCanvas();
    }

});
