var global = require("global");
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this.node.x + this.node.parent.x < -400) {
            this.node.destroy();
        }
    },
});
