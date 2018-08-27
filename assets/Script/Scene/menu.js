var global = require("global");
cc.Class({
    extends: cc.Component,

    properties: {
        btn_start: {
            default: null,
            type: cc.Node
        },
        btn_leitai: {
            default: null,
            type: cc.Node
        },
        btn_tanke: {
            default: null,
            type: cc.Node
        },
        btn_xian: {
            default: null,
            type: cc.Node
        },


        btn_menu: {
            default: null,
            type: cc.Node
        },
        btn_share: {
            default: null,
            type: cc.Node
        },
        btn_rank: {
            default: null,
            type: cc.Node
        },
        btn_info: {
            default: null,
            type: cc.Node
        },

        panel: {
            default: null,
            type: cc.Node
        },
        panel_close: {
            default: null,
            type: cc.Node
        },
        panel_cont: {
            default: null,
            type: cc.Node
        },

        cont_menu: {
            default: null,
            type: cc.Node
        },
        menu_c1: {
            default: null,
            type: cc.Node
        },

        cont_info: {
            default: null,
            type: cc.Node
        },
        info_msg: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {

        if(typeof(wx) != "undefined") {
        	var info = wx.getSystemInfoSync();
			this.bannerAd = wx.createBannerAd({
			    adUnitId: 'adunit-xxxx',
			    style: {
			        left: 0,
			        top: info.windowHeight - 110,
			        width: info.windowWidth,
			        height: 110
			    }
			});
        
            var self = this;

            wx.showShareMenu({
              withShareTicket: true
            });

            wx.updateShareMenu({
              withShareTicket: true
            });

            wx.onShareAppMessage(function () {
              // 用户点击了“转发”按钮
              return {
                title: '来啊，互相伤害啊',
                imageUrl: "res/raw-assets/Texture/share/s1.png",
                success: function(res) {
                }
              }
            });

            wx.login({
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

              },
              fail: function(res) {
                  console.log("fail",res)
              }
            });

        }


        this.btn_start.on('touchend', function ( event ) {
			this.bannerAd.hide();
            cc.director.loadScene('Boo');
        }, this);

        this.btn_leitai.on('touchend', function ( event ) {
			this.bannerAd.hide();
            cc.director.loadScene('Leitai');

            /*wx.showModal({
                title: '小卜:',
                content: '正在制作中，今天没赶上QAQ',
                success: function (res) {

                },
                fail: function (argument) {

                }
            });*/
        }, this);

        this.menu_c1.on('touchstart', function ( event ) {
            cc.director.loadScene('C1');
        }, this);


        this.btn_menu.on('touchstart', function ( event ) {
            this.panel.active = true;
            this.panel_cont.children[0].active = true;
        }, this);

        this.panel_close.on('touchstart', function ( event ) {
            this.panel.active = false;
            this.panel_cont.children[0].active = false;
            this.panel_cont.children[1].active = false;
        }, this);

        this.panel_cont.on('touchstart', function ( event ) {
            return false;
        }, this);


        if(typeof(wx) != "undefined") {

            this.btn_info.on('touchstart', function ( event ) {
                this.panel.active = true;
                this.panel_cont.children[1].active = true;

                var self = this;
                self.data = {
                    'type': 'notice'
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
                        self.info_msg.string = res.data[0].msg;
                    },
                    fail: function (res) {

                        // console.log('f',res)
                    }
                });
            }, this);

            this.btn_share.on('touchstart', function ( event ) {
                wx.shareAppMessage({
                    title: '据说有神秘嘉宾，快来看看吧~',
                    imageUrl: "res/raw-assets/Texture/share/dolo_share.png",
                    success: function(res) {
                        wx.showToast({
                          title: '恭喜你触发彩蛋：神秘嘉宾Dolo~',
                          icon: 'success',
                          duration: 2000
                        });
                        cc.director.loadScene('Dolo');
                    }
                });
            }, this);

            var is_show = true;
            this.btn_tanke.on('touchstart', function ( event ) {
                if(is_show) {
                    wx.showToast({
                      title: '广告彩蛋……',
                      icon: 'success',
                      duration: 2000
                    });
					this.bannerAd.show();
					is_show = false;
                } else {
					this.bannerAd.hide();
					is_show = true;
                }

	        }, this);

            this.btn_xian.on('touchstart', function ( event ) {
                wx.previewImage({
                    current: "http://url/get10.jpg",
                    urls: [
                        "http://url/get10.jpg",
                        "http://url/xian.jpg",
                        "http://url/tanke.jpg"
                        
                    ]
                });
            }, this);

            if(wx.createGameClubButton) {
                var button = wx.createGameClubButton({
                    icon: 'white',
                    style: {
                        left: 10,
                        top: 12,
                        width: 30,
                        height: 30
                    }
                })
            }

            /*if(wx.createUserInfoButton) {
                var button = wx.createUserInfoButton({
                    type: 'text',
                    text: '登录',
                    style: {
                        left: 10,
                        top: 76,
                        width: 100,
                        height: 40,
                        lineHeight: 40,
                        backgroundColor: '#ffffff',
                        color: '#000000',
                        textAlign: 'center',
                        fontSize: 16,
                        borderRadius: 4
                    }
                });

                button.onTap(function (res) {
                    console.log("tap",res)
                });
            }*/
        }

    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {

    },
});
