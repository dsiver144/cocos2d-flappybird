// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

var Global = require("Global");

cc.Class({
    extends: cc.Component,

    properties: {
        pipePrefab: {
            default: null,
            type: cc.Prefab
        },
        maxSpacing: 200,
    },

    start () {
        this._frameCount = 0;
    },

    spawnPipes() {
        var pipes = cc.instantiate(this.pipePrefab);
        var downPipe = pipes.getChildByName("Pipe Downward");
        var upPipe = pipes.getChildByName("Pipe Upward");
        var offsetY = -this.maxSpacing/2 + Math.floor(Math.random() * this.maxSpacing);
        upPipe.x = 500;
        downPipe.x = 500;
        upPipe.y += offsetY;
        downPipe.y += offsetY;
        this.node.addChild(pipes);
    },

    update (dt) {
        if (!Global.gameStarted) return;
        if (Global.gameLost) return;
        this._frameCount += 1;
        if (this._frameCount == Global.spawnPipeTime) {
            this.spawnPipes();
            this._frameCount = 0;
        }
    },
});
