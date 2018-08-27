var global = require("global");
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
        this.touch = false;
        this.count = 0;

        this.tips = [
            "你在这里停留的有点久了~",
            "虽然不知道前方有什么在等着你~",
            "轻轻按住屏幕就好~",
            "人生就是在不清楚前方是否有路的时候依然要勇敢的踏出~",
            "该出发了~",
            "从前，有个勇者……",
            "你想听我讲故事吗？",
            "当时年少的你，有着超龄的成熟",
            "你藏身与伞下，连句再见也没说"
        ];

        if(this.node.mode == "c1") {
            this.tips = [
                "小卜和花生是好朋友~",
                "他们总是很快乐的在一起玩耍",
                "但是花生心里很自卑",
                "终于有一天，它问小卜",
                "『小卜，你为什么愿意和我一起玩呢？』",
                "小卜回答，『因为我们是朋友啊』",
                "『可是我是花生……』花生似乎想要说什么",
                "小卜说『你是花生，同时也是我的好朋友啊』",
                "『不，我隐瞒了你……』",
                "花生鼓足了勇气",
                "『花生不是长我这样的……我是个……』",
                "『我是个正方形的花生!』",
                "花生憋红了脸……『真正的花生是椭圆形的……』",
                "因为是朋友，花生不想欺骗小卜",
                "但也因为是朋友，花生很害怕小卜离开",
                "花生没有其他朋友，因为他",
                "因为他是正方形的……花生",
                "没有一个正常的花生愿意和正方形的花生做朋友",
                "……",
                "花生偷偷的瞄了一眼小卜",
                "『可是你是花生啊』小卜说",
                "『你就是你，你是我的朋友，花生啊』小卜说",
                "花生呆住了",
                "这是第一次有人对他说这样的话",
                "花生开始抽泣",
                "谢谢，非常感谢…………谢谢你，小卜…………",
                "花生一边哭，一边道谢",
                "小卜不明白花生为什么哭",
                "一直也不明白",
                "……",
                "『小卜与花生』1 end~",
                "『小卜与花生』1 end~",
                "『小卜与花生』1 end~",
                "『小卜与花生』1 end~",
                "『小卜与花生』1 end~",
                "点击左下角按钮可以退出练习模式"
            ];
        }
    },

    onCollisionEnter: function (other, self) {
        this.count++;

        this.node.getChildByName("box1").active = false;
        this.node.getChildByName("box2").active = true;

        if(this.count > 7 && this.node.mode != "c1") {
            var tip = this.tips[Math.floor(Math.random() * this.tips.length)];
            global.game.setTip(tip);
        }

        if(other.tag == 0 && !this.touch) {
            this.touch = true;
            if(this.node.mode == "c1") {
                var tip = this.tips[global.word];
                if(tip) {
                    global.game.setTip(tip);
                    global.word++;
                }
            } else {
                global.game.setNum(1);
            }
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this.node.x + this.node.parent.x < -400) {
            this.node.destroy();
        }
    },
});
