var global = require("global");
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
        this.tips = [
            "When the world turns its back on you, you turn your back on the world.",
            "如果这个世界对你不理不睬，你也可以这样对待它。",
            
            "I’m only brave when I have to be. Being brave doesn’t mean you go looking for trouble.",
            "我只是在必要的时候才会勇敢，勇敢并不代表你要到处闯祸。",
            
            "Yes, the past can hurt. But I think you can either run from it or learn from it. ",
            "对，过去是痛楚的，但我认为你要么可以逃避，要么可以向它学习。",
            
            "Everything you see exists together in a delicate balance.",
            "世界上所有的生命都在微妙的平衡中生存。",

            "世界上所有的生命都有他存在的价值。",
            "身为国王，你不但要了解，还要去尊重所有的生命，包括爬行的蚂蚁和跳跃的羚羊。",
            
            "you are more than what you have become.",
            "你要记住，你是谁。",
            
            "你看那些星星， 过去那些伟大的君王从那些星星上看着我们呢。",
            "你要记住，靠着太阳走，看这世间生生不息，生生不息。",

        ];

    },

    onCollisionEnter: function (other, self) {
        if(other.tag == 0) {
            this.node.getChildByName("ball1").active = false;
            this.node.getChildByName("ball2").active = true;

            var finished = cc.callFunc(function() {
                this.node.destroy();
            }, this);
            var action = cc.sequence(cc.fadeOut(0.4), finished);
            this.node.runAction(action);

            // var tip = this.tips[Math.floor(Math.random() * this.tips.length)];
            // global.game.setTip(tip);

            global.game.setNum(1);
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this.node.x + this.node.parent.x < -400) {
            this.node.destroy();
        }
    },
});
