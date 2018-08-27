var global = require("global");
cc.Class({
    extends: cc.Component,

    properties: {
        yin: {
            default: null,
            type: cc.Node
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
        num: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {

        global.game = this;
        global.num = 0;
        global.bonus = 0;

        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
        // manager.enabledDrawBoundingBox = true;
        this.schedule(function(argument) {
            this.setBLock();
            // this.setProp();
        }, 1, this);

        this.yin.ori_v = 1;
        this.yin.ori_a = 0.2;
        this.yin.v = this.yin.ori_v;
        this.yin.a = this.yin.ori_a;
        this.yin.zIndex = 9;
        this.node.on('touchstart', function ( event ) {

            if(!global.gameover) {
                this.yin.v = this.yin.ori_v;
                this.yin.a = this.yin.ori_a;
                this.yin_move = true;
            }

            var action = cc.sequence(
                cc.moveTo(0.1, 0, 100),
                cc.moveTo(0.1, 0, -200),
            );
            this.yin.runAction(action);
            // console.log(event.getLocation())
            // this.yin.setPosition(event.getLocation())
        }, this);


        this.node.on('touchend', function ( event ) {
            this.yin_move = false;
        }, this);

    },

    setBLock: function() {
        var rand = Math.floor(Math.seededRandom() * this.block.length);
        var block = cc.instantiate(this.block[rand]);

        // console.log(Math.max(0, (100 - global.num) / 100) );
        block.setPosition(500, 100);
        // block.scaleX = Math.min(1, Math.max(0, (200 - global.num) / 200)) + Math.seededRandom() * 0.2 + 0.2;
        // block.scaleY = block.scaleX;

        block.parent = this.map;

        var action = cc.moveTo(4, -500, 100);
        block.runAction(action);
    },

    setProp: function() {
        var rand = Math.floor(Math.seededRandom() * this.prop.length);
        var prop = cc.instantiate(this.prop[rand]);

        prop.setPosition(500, 0);
        prop.seed = Math.seededRandom();

        prop.parent = this.map;

        var action = cc.moveTo(4, -500, 0);
        prop.runAction(action);
    },

    setNum: function(num) {
        global.num += num + global.bonus;
        this.num.string = global.num;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {

        /*if(this.yin_move) {
            this.yin.y += this.yin.v;
            this.yin.v += this.yin.a;
        }*/
    },
});
