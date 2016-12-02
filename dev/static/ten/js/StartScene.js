var size = size || {};
size.width = 512;
size.height = 1024;

var ChineseNumber = [ "一", "二", "三", "四","五", "六"];
if(typeof FRAME_RATE === "undefined") {
    var FRAME_RATE = {};
    FRAME_RATE.waterDrop_shake = 0.1;   // 水滴振动
    FRAME_RATE.waterDrop_break = 0.1;   // 水滴爆炸
    FRAME_RATE.waterBomb_move = 0.05;   // 水弹移动
    FRAME_RATE.waterBomb_hitWall = 0.05;    // 水滴撞墙
    FRAME_RATE.check_gameover = 1;    // 检测游戏是否结束
}
if(typeof LAYER_TAG === "undefined") {
    var LAYER_TAG = {};
    LAYER_TAG.game_animation = 0;
    LAYER_TAG.game_failure = 1;
    LAYER_TAG.game_success = 2;
    LAYER_TAG.game_state = 3;
}
if(typeof ACTION_TAG === "undefined") {
    var ACTION_TAG = {};
    ACTION_TAG.water_break = 0;
}


var WinSize;
var VOICE_STATE = 0;    // 音乐是否在播放（0则播放，1则停止）
var StartLayer = cc.Layer.extend({
    audioId: null,
    soundSprite: null,
    init: function() {
        if(this._super()) {
            WinSize = cc.director.getWinSize();
            var centerPoint = cc.p(WinSize.width / 2, WinSize.height / 2);
            cc.spriteFrameCache.addSpriteFrames(res.images_plist, res.images_png);
            var bgSprite = cc.Sprite.create(res.background);
            bgSprite.setPosition(centerPoint);
            this.addChild(bgSprite);
            var logoSprite = cc.Sprite.create("#title.png");
            logoSprite.attr({
                x: centerPoint.x,
                y: centerPoint.y + 150,
                scaleX: 0.8,
                scaleY: 0.8
            });
            this.addChild(logoSprite);
            var startMenuItem = cc.MenuItemSprite.create(cc.Sprite.create("#startButton.png"), null, null, this.startGame, this);
            var startMenu = cc.Menu.create([startMenuItem]);
            startMenu.attr({
                x: centerPoint.x,
                y: centerPoint.y - 50
            });
            this.addChild(startMenu);
            if(VOICE_STATE == 0) {
                this.soundSprite = cc.Sprite.create("#btnvoiceon.png");
            } else {
                this.soundSprite = cc.Sprite.create("#btnvoiceoff.png");
            }
            var soundMenuItem = cc.MenuItemSprite.create(this.soundSprite, null, null, this.settingsSound, this);
            var soundMenu = cc.Menu.create([soundMenuItem]);
            soundMenu.attr({
               x: WinSize.width - 60,
               y: 100
            });
            this.addChild(soundMenu);
            return true;
        }
    },
    startGame: function() {
        if(VOICE_STATE === 0) {
            cc.audioEngine.playEffect(res.voice_press);
        }
        // 进入主题选择场景
        cc.director.runScene(new ThemeScene());
    },
    settingsSound: function() {
        // 设置音乐按钮的状态
        if(VOICE_STATE === 0) {
            this.soundSprite.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("btnvoiceoff.png"));
            VOICE_STATE = 1;
        } else {
            this.soundSprite.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("btnvoiceon.png"));
            cc.audioEngine.playEffect(res.voice_press);
            VOICE_STATE = 0;
        }
    }
});

StartLayer.create = function(){
    var sc = new StartLayer();
    if(sc && sc.init()){
        return sc;
    }
    return null;
}

var StartScene = cc.Scene.extend({
    onEnter:function(){
        this._super();

        var layer = new StartLayer.create();
        this.addChild(layer);
    }
})