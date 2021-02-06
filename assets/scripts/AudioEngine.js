cc.Class({
    extends: cc.Component,

    properties: {
        wing: {
            default: null,
            type: cc.AudioClip
        },
        hit: {
            default: null,
            type: cc.AudioClip
        },
        die: {
            default: null,
            type: cc.AudioClip
        },
        point: {
            default: null,
            type: cc.AudioClip
        },
    },
    
    play(id, loop, volume) {
        cc.audioEngine.play(this[id], loop, volume);
    }
});