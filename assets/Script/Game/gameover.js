var global = require("global");
cc.Class({
    extends: cc.Component,

    properties: {
        item: {
            default: null,
            type: cc.Node
        },
        all_rank: {
            default: null,
            type: cc.Node
        },
        f_rank: {
            default: null,
            type: cc.Node
        },
        w_rank: {
            default: null,
            type: cc.Node
        },
        content: {
            default: null,
            type: cc.Node
        },
        restart: {
            default: null,
            type: cc.Node
        },
        btn_rank: {
            default: null,
            type: cc.Node
        },
        btn_bbs: {
            default: null,
            type: cc.Node
        },
        btn_msg: {
            default: null,
            type: cc.Node
        },
        btn_cancel: {
            default: null,
            type: cc.Node
        },
        btn_share: {
            default: null,
            type: cc.Node
        },
        bbs: {
            default: null,
            type: cc.Node
        },
        msg: {
            default: null,
            type: cc.EditBox
        },
    },

    // use this for initialization
    onLoad: function () {
        global.rank = this;

        if(typeof(wx) != "undefined") {
            var info = wx.getSystemInfoSync();
            this.leitaiAd = wx.createBannerAd({
                adUnitId: 'adunit-xxxxxxxx',
                style: {
                    left: 0,
                    top: info.windowHeight - 110,
                    width: info.windowWidth,
                    height: 110
                }
            });
        }

        this.restart.on('touchstart', function ( event ) {
            this.leitaiAd.hide();
            cc.game.restart();
        }, this);

        this.btn_bbs.on('touchstart', function ( event ) {
            this.bbs.active = true;
        }, this);

        this.btn_cancel.on('touchstart', function ( event ) {
            this.bbs.active = false;
        }, this);

        this.btn_share.on('touchstart', function ( event ) {
            if(typeof(wx) != "undefined") {
                wx.shareAppMessage({
                    title: '看见了吗？这位就是今天的擂主~',
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
            }
        }, this);

        global.msg = true;
        this.btn_msg.on('touchstart', function ( event ) {
            if(typeof(wx) != "undefined") {
                if(!global.msg) {
                    wx.showModal({
                        title: '小卜:',
                        content: '你已经留言过了哟~',
                        success: function (res) {

                        },
                        fail: function (argument) {

                        }
                    });
                    return;
                }

                var self = this;
                var msg = this.msg.string;

                if(msg.length == 0) {
                    return;
                }
                global.msg = false;
                wx.showModal({
                    title: '小卜:',
                    content: '我收到了哟~',
                    success: function (res) {
                        self.bbs.active = false;
                    },
                    fail: function (argument) {
                        self.bbs.active = false;
                    }
                });
                wx.login({
                  success: function (loginCode) {
                        self.data = {};

                        wx.request({
                            url: 'https://url/',
                            method: 'POST',
                            data: self.data,
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

        }, this);

        /*this.rank_flag = "w";
        this.btn_rank.on('touchstart', function ( event ) {
            switch(this.rank_flag) {
                case "f":
                    this.w_rank.active = true;
                    this.f_rank.active = false;
                    this.rank_flag = "w";
                    this.btn_rank.getChildByName("btn_f_rank").active = false;
                    this.btn_rank.getChildByName("btn_w_rank").active = true;
                break;
                case "w":
                    this.w_rank.active = false;
                    this.f_rank.active = true;
                    this.rank_flag = "f";
                    this.btn_rank.getChildByName("btn_w_rank").active = false;
                    this.btn_rank.getChildByName("btn_f_rank").active = true;
                break;
            }
        }, this);*/

    },

    end: function() {
        console.log(global.record)
        this.all_rank.active = true;
        global.gameover = true;

        this.showWrank();
        // this.showFrank();
    },

    showFrank: function(argument) {
        /*var openDataContext = wx.getOpenDataContext();
        openDataContext.postMessage([
            {key: "num",value: global.num}
        ]);*/
    },

    showWrank: function(data) {
        this.all_rank.active = true;
        if(typeof(wx) != "undefined") {

            this.leitaiAd.show();

            var self = this;

            wx.login({
              success: function (loginCode) {

                data.loginCode = loginCode.code;

                wx.request({
                    url: 'https://url/',
                    method: 'POST',
                    data: data,    //参数为键值对字符串
                    header: {
                        //设置参数内容类型为x-www-form-urlencoded
                        'Content-Type':'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    },
                    success: function (res) {
                        for (var i = 0; i < res.data.length; i++) {
                            self.genItem(i, res.data[i]);
                        }
                    },
                    fail: function (res) {
                        // console.log('f',res)
                    }
                });

              }
            });

        }
    },

    genItem: function(i, res) {
        var item = cc.instantiate(this.item);
        if(res.ava) {
            cc.loader.load({url:res.ava, type: 'png'}, function (err, img) {
                item.getChildByName("ava").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(img);
            });
        }

        item.getChildByName("raw").getComponent(cc.Label).string = i + 1;
        item.getChildByName("name").getComponent(cc.Label).string = res.name;
        item.getChildByName("num").getComponent(cc.Label).string = res.num;

        // item.active = true;

        item.parent = this.content;
    },

    // called every frame, uncomment this function to activate update callback
    /*update: function (dt) {

    },*/
});
