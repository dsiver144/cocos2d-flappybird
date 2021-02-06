var Global = require("Global");

cc.Class({
    extends: cc.Component,

    properties: {
        moveSpeed: -100,
    },

    start () {
        this._upwardPipe = this.node.getChildByName("Pipe Upward");
        this._downwardPipe = this.node.getChildByName("Pipe Downward");
    },

    update (dt) {
        if (Global.gameLost) return;
        this._upwardPipe.x += this.moveSpeed * dt;
        this._downwardPipe.x += this.moveSpeed * dt;
    },
});
