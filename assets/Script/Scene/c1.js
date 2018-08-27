var global = require("global");
cc.Class({
    extends: cc.Component,

    properties: {
        restart: {
            default: null,
            type: cc.Node
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

        if(typeof(wx) != "undefined") {
            wx.showShareMenu({
              withShareTicket: true
            });

            wx.updateShareMenu({
              withShareTicket: true
            });

            wx.onShareAppMessage(function () {
              // 用户点击了“转发”按钮
              return {
                title: '小卜与花生的故事，想要讲给你听……',
                imageUrl: "res/raw-assets/Texture/share/s3.png",
                success: function(res) {
                }
              }
            });

            wx.showModal({
                title: '小卜:',
                content: '这里是练习模式，没有分数和排行，只有一个小故事，随时可以点击左下角按钮退出',
                success: function (res) {

                },
                fail: function (argument) {

                }
            });
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

        global.word = 0;

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


        this.restart.on('touchstart', function ( event ) {
            cc.game.restart();
        }, this);

    },

    setBLock: function() {
        var block = cc.instantiate(this.block[0]);
        block.setPosition(global.distance + 400, -100);
        block.mode = "c1";

        block.parent = this.map;
    },

    setNum: function(num) {
        global.num += num + global.bonus;
        this.num.string = global.num;
    },

    setTip: function(str) {
        this.tips.string = str;
    },

    end: function() {
        global.gameover = true;

        if(typeof(wx) != "undefined") {
            wx.showModal({
                title: '小卜:',
                content: '返回主菜单咯~',
                success: function (res) {
                    cc.game.restart();
                },
                fail: function (argument) {
                    cc.game.restart();
                }
            });
        }
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
                this.edge += 200 + Math.seededRandom() * 50 + this.boo.xv * this.boo.xv;
                this.setBLock();
                if(global.num % 50 > 45) {
                    var action = cc.tintTo(2, Math.seededRandom() * 255, Math.seededRandom() * 255, Math.seededRandom() * 255);
                    this.bg.runAction(action);
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
