
cc.Class({
    extends: cc.Component,

    properties: {
    },

    start () {
        //this.node.on("click", this.onBtnPlayAgainClick, this);
    },

    onBtnPlayAgainClick() {
        if (this.node.opacity < 200) return;
        var birdNode = cc.find("Canvas/Bird");
        var birdControl = birdNode.getComponent("BirdControl");
        cc.tween(this.node).to(0.5, {opacity: 0}).start();
        cc.tween(this.node.parent).to(0.5, {opacity: 0}).start();
        birdControl.restartBird();
        
    },
});
