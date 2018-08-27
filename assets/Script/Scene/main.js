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
        bbs: {
            default: null,
            type: cc.Node
        },
        msg: {
            default: null,
            type: cc.EditBox
        },
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
        }
    },

    // use this for initialization
    onLoad: function () {

        if(new Date().getHours() > 0 && new Date().getHours() < 5) {
            this.tips.string = "熬夜很辛苦\n谢谢你选择让小卜陪你";
        }

        global.game = this;

        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
        // manager.enabledDrawBoundingBox = true;

        global.bonus = 0;

        this.boo.ori_xv = 1;
        this.boo.ori_xa = 0.2;
        this.boo.xv = this.boo.ori_xv;
        this.boo.xa = this.boo.ori_xa;

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
            }
        }, this);
        this.node.on('touchend', function ( event ) {
            this.boo_move = false;
        }, this);


        if(typeof(wx) != "undefined") {
            var info = wx.getSystemInfoSync();
            this.rankAd = wx.createBannerAd({
                adUnitId: 'adunit-xxx',
                style: {
                    left: 0,
                    top: info.windowHeight - 110,
                    width: info.windowWidth,
                    height: 110
                }
            });
        }


        this.restart.on('touchstart', function ( event ) {
            this.rankAd.hide();
            cc.game.restart();
        }, this);

        this.btn_bbs.on('touchstart', function ( event ) {
        	this.bbs.active = true;
        }, this);

        this.btn_cancel.on('touchstart', function ( event ) {
        	this.bbs.active = false;
        }, this);


        global.msg = true;
        this.btn_msg.on('touchstart', function ( event ) {
        	if(!global.msg) {
                wx.showModal({
                    title: '小卜:',
                    content: '你已经留言过了哟~你也可以到左上角的游戏圈和小伙伴们一起玩耍~',
                    success: function (res) {

                    },
                    fail: function (argument) {

                    }
                });
                return;
        	}
	        if(typeof(wx) != "undefined") {

	            var self = this;
	            var msg = this.msg.string;

	            if(msg.length == 0) {
	            	return;
	            }

                global.msg = false;
                wx.showModal({
                    title: '小卜:',
                    content: '谢谢，我会认真听你的悄悄话的~',
                    success: function (res) {
                        self.bbs.active = false;
                    },
                    fail: function (argument) {
                        self.bbs.active = false;
                    }
                });
                
	            wx.login({
	              success: function (loginCode) {
		                self.data = {
		                    'type': 'msg',
		                    'msg': msg,
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

    setBLock: function() {
        var rand = Math.floor(Math.seededRandom() * this.block.length);
        var block = cc.instantiate(this.block[rand]);

        // console.log(Math.max(0, (100 - global.num) / 100) );
        block.setPosition(global.distance + 400, -100);
        block.scaleX = Math.min(1, Math.max(0, (200 - global.num) / 200)) + Math.seededRandom() * 0.2 + 0.2;
        block.scaleY = block.scaleX;

        block.parent = this.map;
    },

    setProp: function() {
        var rand = Math.floor(Math.seededRandom() * this.prop.length);
        var prop = cc.instantiate(this.prop[rand]);

        prop.setPosition(global.distance + 400 - Math.seededRandom() * 200, 100 + Math.seededRandom() * 50);
        prop.seed = Math.seededRandom();

        prop.parent = this.map;
    },

    setNum: function(num) {
        global.num += num + global.bonus;
        this.num.string = global.num;
    },

    setTip: function(str) {
        this.tips.string = str;
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

    showWrank: function(argument) {
        if(typeof(wx) != "undefined") {

            this.rankAd.show();

            var self = this;

            wx.login({
              success: function (loginCode) {

                self.data = {
                    'type': 'rank',
                    'num': global.num,
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
    update: function (dt) {

        /*var color = this.bg.color;
        if (color.equals(cc.Color.BLACK)) {
            return;
        }*/
        // this.ratio += dt * 0.01;
        // this.bg.color = cc.Color.WHITE.lerp(cc.Color.WHITE, this.ratio);

        if(this.boo_move) {
            global.distance += this.boo.xv;
            this.map.x -= this.boo.xv;
            this.boo.xv += this.boo.xa;
            // this.boo.xv = Math.min(this.boo.xv, 10)

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

        if(!global.gameover) {
            if(this.boo.y > 400) {
                this.stage.scaleX = Math.max(0.2, 1 - (this.boo.y - 400) / 1000);
                this.stage.scaleY = Math.max(0.2, 1 - (this.boo.y - 400) / 1000);
            } else {
                this.stage.scaleX = 1;
                this.stage.scaleY = 1;
            }
        }

    },
});
