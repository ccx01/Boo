// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
var global = require("global");
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onCollisionEnter: function (other, self) {
        this.node.getChildByName("spring1").active = false;
        this.node.getChildByName("spring2").active = true;

        this.scheduleOnce(function(argument) {
            this.node.getChildByName("spring2").active = false;
            this.node.getChildByName("spring1").active = true;
        }, 1);

        if(other.tag == 0 && !this.touch) {
            this.touch = true;
            global.game.setNum(1);

            var tip = this.tips[Math.floor(Math.random() * this.tips.length)];
            // global.game.setTip(tip);
        }

        this.count++;
        if(this.count > 5) {
            this.node.destroy();
        }
        
    },
    // onLoad () {},

    start () {
        this.count = 0;
        this.touch = false;
        this.tips = [
            "好高",
            "是不是只有这种时候，你才会注意到我？",
            "我不会和你讲勇者的故事",
            "也许你该担心一下落脚的位置",
            "飞呀飞呀我的……",
            "不好意思，我想唱歌",
            "你是否想和其他人不一样",
            "你是否和其他人不一样",
            "你是否和其他人一样",
            "你该不会是为了看这些字而来的吧？",
            "下次再和你讲一个完整的故事",
            "哇哦",
            "再见~",
            "你居然有心思注意这些无聊的字？",
            "你要听我说鸡汤吗？",
            "我不会讲那些大道理",
            "有些事想告诉你",
            "勇者为了打败魔王踏上旅途",
            "勇者遇到了强力的弓箭手伙伴",
            "勇者遇到了强力的魔法师伙伴",
            "勇者遇到了可爱的牧师伙伴",
            "勇者打败了魔王",
            "勇者身上沾满了魔王的气息……"
        ];
    },

    update (dt) {

        if(this.node.x + this.node.parent.x < -400) {
            this.node.destroy();
        }

    },
});
