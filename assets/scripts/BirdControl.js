var Global = require("Global");

cc.Class({
    extends: cc.Component,

    properties: {
        jumpForce: 250,
        turnAngle: 45,
        scoreDisplay: cc.Node,
    },

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2();
        cc.director.getCollisionManager().enabled = true;
    },

    start () {
        this._rigidBody = this.getComponent("cc.RigidBody");
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        cc.find("Canvas").on("mousedown", this.onPlayerAction, this);
        cc.find("Canvas").on("touchstart", this.onTouchStart, this);
        cc.find("Canvas").on("touchend", this.onTouchEnd, this);
        this.audioEngine = this.getComponent("AudioEngine");
        this._pressed = false;
        this._touched = false;
        this._originalPos = new cc.Vec2(this.node.x, this.node.y);
        this._playedDieSound = false;
        
    },

    restartBird() {
        this.node.x = this._originalPos.x;
        this.node.y = this._originalPos.y;
        this.node.angle = 0;
        this._rigidBody.linearVelocity = cc.v2();
        this.getComponent("cc.Animation").start();
        cc.find("Canvas/PipeLayer").removeAllChildren();
        Global.gameLost = false;
        Global.gameStarted = false;
        this._playedDieSound = false;
        this._pressed = false;
        cc.director.getPhysicsManager().enabled = true;
        Global.score = 0;
        this.scoreDisplay.getComponent("ScoreDisplay").clearScore();
        this.scoreDisplay.getComponent("ScoreDisplay").refreshScore(Global.score);
    },

    onTouchStart(e) {
        if (this._touched) return;
        this._touched = true;
        this.onPlayerAction();
    },

    onTouchEnd(e) {
        this._touched = false;
    },

    onKeyDown(event) {
        switch(event.keyCode) {
            case 32:
                if (this._pressed) return;
                this._pressed = true;
                this.onPlayerAction();
                break;
        }
    },

    onKeyUp(event) {
        this._pressed = false;
    },

    onPlayerAction() {
        this.startGame();
        this.jump();
    },

    onCollisionEnter: function (other, self) {
        switch(other.tag) {
            case 0: case 1: case 2:
                if (other.tag == 0) {
                    cc.director.getPhysicsManager().enabled = false;
                }
                if (Global.gameLost) break;
                var gameOverNode = cc.find("Canvas/GameOver");
                gameOverNode.y += 50;
                cc.tween(gameOverNode).to(0.5, {opacity: 255, y: gameOverNode.y - 50}).start();
                cc.tween(cc.find("Canvas/GameOver/btn_playAgain")).delay(1).to(0.5, {opacity: 255}).start();
                Global.gameLost = true;
                this.getComponent("cc.Animation").stop();
                break;
            case 3:
                if (Global.gameLost) break;
                Global.score += 1;
                this.scoreDisplay.getComponent("ScoreDisplay").refreshScore(Global.score);
                this.audioEngine.play("point", false, 1.0);
                break;
        }
        if (Global.gameLost && !this._playedDieSound) {
            this.audioEngine.play("hit", false, 1.0);
            this.audioEngine.play("die", false, 1.0);
            this._playedDieSound = true;
        }
    },

    startGame () {
        if (Global.gameStarted) return;
        cc.director.getPhysicsManager().gravity = cc.v2(0, -450);
        Global.gameStarted = true;
        var titleNode = cc.find("Canvas/Title");
        cc.tween(titleNode).to(0.5, {opacity: 0}).start();
        cc.tween(this.scoreDisplay).to(0.5, {opacity: 255}).start();
    },

    jump() {
        if (Global.gameLost) return;
        this.audioEngine.play("wing", false, 1.0);
        this._rigidBody.linearVelocity = new cc.Vec2(0, this.jumpForce);
    },

    update (dt) {
        if (!Global.gameStarted) return;
        var velocityY = this._rigidBody.linearVelocity.y;
        var angleRate = Math.min(Math.max(velocityY, -this.jumpForce), this.jumpForce) / this.jumpForce;
        this.node.angle = -(angleRate) * -this.turnAngle;
        
    },
});
