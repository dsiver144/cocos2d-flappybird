var Global = require("Global");

cc.Class({
    extends: cc.Component,

    properties: {
        scoreSpriteFrames: [cc.SpriteFrame],
        maxScoreDigits: 3,
    },

    start () {
        this._digitNodes = [];
        for (let i = 0; i < this.maxScoreDigits; i++) {
            var node = new cc.Node("Digit Sprite " + i);
            let sprite = node.addComponent(cc.Sprite);
            node.parent = this.node;
            this._digitNodes.push(node);
        }
        this.refreshScore(Global.score);
    },

    clearScore() {
        for (let i = 0; i < this.maxScoreDigits; i++) {
            const node = this._digitNodes[i];
            const sprite = node.getComponent(cc.Sprite);
            sprite.spriteFrame = null;
        }
    },

    refreshScore(score) {
        const digits = score == 0 ? 1 : Math.floor(Math.log10(score)) + 1;
        score = String(score);
        const spacing = 1;
        const digitWidth = this.scoreSpriteFrames[0].getOriginalSize().width;
        const totalWidth = (digitWidth * digits) + spacing * (digits - 1);
        const displayX = -totalWidth / 2;
        for (let i = 0; i < digits; i++) {
            const node = this._digitNodes[i];
            node.x = displayX + (digitWidth + spacing) * i;
            const sprite = node.getComponent(cc.Sprite);
            sprite.spriteFrame = this.scoreSpriteFrames[Number(score[i])];
        }
    },

});
