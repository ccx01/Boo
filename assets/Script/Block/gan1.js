var global = require("global");
cc.Class({
    extends: cc.Component,

    properties: {
        gan2: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        
    },

    onCollisionEnter: function (other, self) {
        if(other.tag == 0) {
            this.gan2.active = true;
            this.node.active = false;

            global.game.setNum(1);
        }

    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {

    },
});
