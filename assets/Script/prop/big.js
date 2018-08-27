var global = require("global");
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
        // this.node.y = 100 + this.node.seed * 50;
        this.tips = [
            "变大吧！" + "\n每次分数额外+" + global.bonus,
            "扣1分！" + "\n每次分数额外+" + global.bonus
        ];
    },

    onCollisionEnter: function (other, self) {
        if(other.tag == 0) {
            var finished = cc.callFunc(function() {
                this.node.destroy();
            }, this);
            var action = cc.sequence(cc.fadeOut(0.4), finished);
            this.node.runAction(action);

            var tip = this.tips[Math.floor(Math.random() * this.tips.length)];
            // global.game.setTip(tip);s

            global.game.setNum(-1);
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this.node.x + this.node.parent.x < -400) {
            this.node.destroy();
        }
    },
});
