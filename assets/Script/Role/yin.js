var global = require("global");
cc.Class({
    extends: cc.Component,

    properties: {
        pop: {
            default: null,
            url: cc.AudioClip
        }
    },

    // use this for initialization
    onLoad: function () {
        this.scale = 1;
        this.ori = {
            v: 10,
            a: -0.3
        }

        this.v = this.ori.v;
        this.a = this.ori.a;

        this.node.ori_v = 1;
        this.node.ori_a = 0.2;

        this.node.v = 1;
        this.node.a = 0.2;
    },

    onCollisionEnter: function (other, self) {
        if(this.node.mode == "leitai" && this.node.y < -100) {
            return;
        }
        cc.audioEngine.playEffect(this.pop, false);
        switch(other.tag) {
            case 1:
                // 方块，圆球，树杆
                this.v = this.ori.v;
            break;
            case 2:
                // 弹簧
                this.v = this.ori.v * 1.5;
            break;
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.node.y += this.v;
        this.v += this.a;

        if(this.node.y < - 500) {
            this.node.destroy();
            global.game.end();
        }
    },
});
