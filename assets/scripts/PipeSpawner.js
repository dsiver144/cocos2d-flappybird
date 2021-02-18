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
        this._spawned = false;
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
        if (!this._spawned) {
            this._spawned = true;
            setTimeout(()=>{
                this.spawnPipes();
                this._spawned = false;
            }, 1.5 * 1000);
        }
    },
});
