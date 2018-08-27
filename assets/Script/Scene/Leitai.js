var global = require("global");
cc.Class({
    extends: cc.Component,

    properties: {
        num: {
            default: null,
            type: cc.Label
        },
        map: {
            default: null,
            type: cc.Node
        },
        block: {
            default: [],
            type: cc.Prefab
        },
        prop: {
            default: [],
            type: cc.Prefab
        },
        tips: {
            default: null,
            type: cc.Label
        },
        stage: {
            default: null,
            type: cc.Node
        },
        boo: {
            default: null,
            type: cc.Node
        },
        bg: {
            default: null,
            type: cc.Node
        },
        /*stage2: {
            default: null,
            type: cc.Node
        },
        map2: {
            default: null,
            type: cc.Node
        },
        boo2: {
            default: null,
            type: cc.Node
        }*/
    },

    // use this for initialization
    onLoad: function () {



        global.game = this;

        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
        // manager.enabledDrawBoundingBox = true;


        // 擂台赛记录
        Math.seed = new Date().getDate();
        this.seed = Math.seed;
        /*global.time = 0;
        global.record = {};

		this.r_data = JSON.parse(cc.sys.localStorage.getItem('r'));
        this.r_data = this.r_data || {
            12:"1",
            18:"0",
            22:"1",
            29:"0",
            32:"1",
            44:"0",
            48:"1",
            57:"0",
            63:"1",
            71:"0",
            75:"1",
            82:"0"
        }*/

        /*this.schedule(function(argument) {
            
            global.time += 1;

            if(this.r_data[global.time] == 1) {
                if(!global.gameover) {
                    this.boo2.xv = this.boo2.ori_xv;
                    this.boo2.xa = this.boo2.ori_xa;
                    this.boo2_move = true;
                }
            }
            if(this.r_data[global.time] == 0) {
                this.boo2_move = false;
            }
        }, 0.01, this);*/

        // 擂台赛
        global.bonus = 0;

        // this.boo.ori_xv = 1;
        // this.boo.ori_xa = 0.2;

        this.boo.xv = this.boo.ori_xv;
        this.boo.xa = this.boo.ori_xa;

        this.boo.mode = "leitai";

        global.distance = 0;
        global.num = 0;
        global.gameover = false;

        this.edge = 0;

        this.boo_move = false;

        this.node.on('touchstart', function ( event ) {
            if(!global.gameover) {
                this.boo.xv = this.boo.ori_xv;
                this.boo.xa = this.boo.ori_xa;
                this.boo_move = true;
                // global.record[global.time] = 1;
            }
        }, this);
        this.node.on('touchend', function ( event ) {
            this.boo_move = false;
            // global.record[global.time] = 0;
        }, this);


        if(typeof(wx) != "undefined") {
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
                title: '好想成为今日擂主啊！',
                imageUrl: "res/raw-assets/Texture/share/s2.png",
                success: function(res) {
                }
              }
            });


            wx.login({
              success: function (loginCode) {
                    self.data = {
                        'type': 'leitai_check',
                        'seed': self.seed,
                        'loginCode': loginCode.code
                    };

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
                        	var t = 3 - res.data[0].num;

                            if(res.data[0].num > 10) {
                                wx.showModal({
                                    title: '小卜:',
                                    content: '你已挑战超过10次了哟……去试试最强模式或着练习模式吧~',
                                    success: function (res) {
                                    },
                                    fail: function (argument) {
                                    }
                                });
                                self.outOfToday();
                            } else if(t > 0) {
	                            wx.showModal({
	                                title: '小卜:',
	                                content: '你今天还剩' + t + '次挑战机会~',
	                                success: function (res) {
                                        if(res.cancel) {
                                            self.outOfToday();
                                        }
	                                },
	                                fail: function (argument) {

	                                }
	                            });
                        	} else {
	                            wx.showModal({
	                                title: '小卜:',
	                                content: '你今天的挑战机会已经用完了哟~，分享到群可以获得额外的挑战机会',
	                                success: function (res) {
                                        if(res.confirm) {
                                            wx.shareAppMessage({
                                                title: '好想成为今日擂主啊！',
                                                imageUrl: "res/raw-assets/Texture/share/s2.png",
                                                success: function(res) {
                                                    if(!res.shareTickets) {
                                                        wx.showModal({
                                                            title: '小卜:',
                                                            content: '不要调皮哦~直接点开始游戏没有每日挑战次数限制~',
                                                            success: function (res) {
                                                            },
                                                            fail: function (argument) {

                                                            }
                                                        });
                                                        
                                                        self.outOfToday();
                                                    }
                                                },
                                                fail: function(res) {

                                                    wx.showModal({
                                                        title: '小卜:',
                                                        content: '直接点开始游戏没有每日挑战次数限制哦~',
                                                        success: function (res) {
                                                        },
                                                        fail: function (argument) {

                                                        }
                                                    });
                                                    self.outOfToday();
                                                }
                                            });
                                        } else {
                                            wx.showModal({
                                                title: '小卜:',
                                                content: '直接点开始游戏没有每日挑战次数限制哦~',
                                                success: function (res) {
                                                },
                                                fail: function (argument) {

                                                }
                                            });
                                            self.outOfToday();
                                        }
	                                },
	                                fail: function (argument) {
                                        self.outOfToday();
	                                }
	                            });
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

    setBLock: function() {
        var rand = Math.floor(Math.seededRandom() * this.block.length);
        var block = cc.instantiate(this.block[rand]);

        block.setPosition(global.distance + 400, -100);
        block.scaleX = Math.min(1, Math.max(0, (200 - global.num) / 200)) + Math.seededRandom() * 0.2 + 0.2;
        block.scaleY = block.scaleX;

        /*var block2 = cc.instantiate(block);
        block2.parent = this.map2;*/

        block.parent = this.map;

    },

    setProp: function() {
        var rand = Math.floor(Math.seededRandom() * this.prop.length);
        var prop = cc.instantiate(this.prop[rand]);

        prop.setPosition(global.distance + 400 - Math.seededRandom() * 200, 200);

        prop.seed = Math.seededRandom();

        /*var prop2 = cc.instantiate(prop);
        prop2.seed = prop.seed;
        prop2.parent = this.map2;*/

        prop.parent = this.map;

    },

    setNum: function(num) {
        global.num += num + global.bonus;
        this.num.string = global.num;
    },

    setTip: function(str) {
        this.tips.string = str;
    },

    outOfToday: function() {
        // console.log(global.record)
        // cc.sys.localStorage.setItem('r', JSON.stringify(global.record));
        this.boo.destroy();
        var self = this;
        global.gameover = true;

        self.data = {
            'type': 'leitai',
            'seed': self.seed
        }
        global.rank.showWrank(self.data);
    },

    end: function() {
        // console.log(global.record)
        // cc.sys.localStorage.setItem('r', JSON.stringify(global.record));
        var self = this;
        global.gameover = true;

        /*wx.showModal({
            title: '小卜:',
            content: '完成挑战，现在正在结算你的分数~',
            success: function (res) {

            },
            fail: function (argument) {

            }
        });*/

        self.data = {
            'type': 'leitai',
            'num': global.num,
            'seed': self.seed
        }
        global.rank.showWrank(self.data);
    },


    // called every frame, uncomment this function to activate update callback
    update: function (dt) {

        /*global.time += 1;

        if(this.r_data[global.time] == 1) {
            if(!global.gameover) {
                this.boo2.xv = this.boo2.ori_xv;
                this.boo2.xa = this.boo2.ori_xa;
                this.boo2_move = true;
            }
        }
        if(this.r_data[global.time] == 0) {
            this.boo2_move = false;
        }

        if(this.boo2_move) {
            this.map2.x -= this.boo2.xv;
            this.boo2.xv += this.boo2.xa;

            this.stage2.x += this.boo2.xv;
        }*/

        if(this.boo_move) {
            this.map.x -= this.boo.xv;
            this.boo.xv += this.boo.xa;

            // this.stage2.x -= this.boo.xv;
        }

        // if(this.boo2_move || this.boo_move) {
        if(this.boo_move) {
            global.distance += this.boo.xv;
            // global.distance = Math.max(-this.map.x, -this.map2.x);
            // this.stage2.x = this.map.x - this.map2.x;
            if(global.distance > this.edge) {
                this.edge += 200 + Math.seededRandom() * 200 + this.boo.xv * this.boo.xv;
                this.setBLock();
                if(global.num % 50 > 45) {
                    var action = cc.tintTo(2, Math.seededRandom() * 255, Math.seededRandom() * 255, Math.seededRandom() * 255);
                    this.bg.runAction(action);
                }
                if(Math.seededRandom() < 0.3) {
                    this.setProp();
                }
            }
        }

        /*if(!global.gameover) {
            if(this.boo.y > 400) {
                this.stage.scaleX = Math.max(0.2, 1 - (this.boo.y - 400) / 1000);
                this.stage.scaleY = Math.max(0.2, 1 - (this.boo.y - 400) / 1000);
            } else {
                this.stage.scaleX = 1;
                this.stage.scaleY = 1;
            }
        }*/

    },
});
