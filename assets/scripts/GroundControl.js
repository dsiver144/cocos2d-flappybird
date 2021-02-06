var Global = require("Global");

cc.Class({
    extends: cc.Component,

    properties: {
        moveSpeed: -50,
    },

    onLoad () {
        
    },

    start () {
        this._ground1 = this.node.getChildByName("Ground1").getComponent(cc.Sprite);
        this._ground2 = this.node.getChildByName("Ground2").getComponent(cc.Sprite);
    },

    update (dt) {
        if (Global.gameLost) return;
        this._ground1.node.x += this.moveSpeed * dt;
        this._ground2.node.x += this.moveSpeed * dt;
        if (this._ground1.node.x + this._ground1.node.width <= 0) {
            this._ground1.node.x = this._ground2.node.x + this._ground2.node.width;
        }
        if (this._ground2.node.x + this._ground2.node.width <= 0) {
            this._ground2.node.x = this._ground1.node.x + this._ground1.node.width;
        }
    },
});
