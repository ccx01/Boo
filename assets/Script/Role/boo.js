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

        this.node.ori_xv = 1;
        this.node.ori_xa = 0.2;

        this.node.xv = 1;
        this.node.xa = 0.2;
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

            case 1001:
                // 弹起
                this.ori.v += 1;
                this.v = this.ori.v;

                global.game.setTip("跳跃变高！");
            break;
            case 1002:
                // 再跳高点吧
                this.v = this.ori.v;

                global.game.setTip("+2分！");
                global.game.setNum(2);
            break;
            case 1003:
                // 变小
                this.scale -= 0.2;
                this.scale = Math.max(0.3, this.scale);
                this.node.scaleX = this.scale;
                this.node.scaleY = this.scale;

                this.v = this.ori.v;
                global.game.setTip("变小！");
            break;
            case 1004:
                // 变大
                this.scale += 0.2;
                this.scale = Math.min(1.3, this.scale);
                this.node.scaleX = this.scale;
                this.node.scaleY = this.scale;

                this.v = this.ori.v;
                global.game.setTip("变大！");
            break;
            case 1005:
                // 每次弹跳额外+1分
                this.v = this.ori.v;
                global.bonus += 1;
                global.game.setTip("每次弹跳+" + (global.bonus + 1) + "分！");
            break;
            case 1006:
                // 每次弹跳额外-1分
                this.v = this.ori.v;
                global.bonus -= 1;
                global.bonus = Math.max(0, global.bonus);
                global.game.setTip("每次弹跳+" + (global.bonus + 1) + "分！");
            break;
            case 1007:
                // 水平移动加快
                this.v = this.ori.v;
                this.node.ori_xv += 1;
                global.game.setTip("水平初速度加快");
            break;
            case 1008:
                // 水平加速度加快
                this.v = this.ori.v;
                this.node.ori_xa += 0.1;
                global.game.setTip("水平加速度加快");
            break;
            case 1009:
                // 下降速度加快
                this.v = this.ori.v;
                this.ori.a -= 0.1;
                global.game.setTip("下降速度加快");
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
