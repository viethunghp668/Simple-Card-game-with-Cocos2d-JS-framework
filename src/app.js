
var HelloWorldLayer = cc.Layer.extend({
    cards: [],
    backFaceCards: [],
    sprite:null,
    ctor:function () {

        this._super();

        var size = cc.winSize;
        var posW = [187.5, 891.5, 187.5, 891.5, 187.5, 891.5];
        var posH = [510, 510, 324, 324, 138, 138];
        var srcBai = ["res/Bai_bich1_", "res/Bai_nhep2_", "res/Bai_co3_", "res/Bai_ro4_"];
        var suffix = ".png";
        var srcCard = ["res/Bai_bich1_1.png", "res/Bai_bich1_1.png", "res/Bai_bich1_1.png", "res/Bai_bich1_1.png", "res/Bai_bich1_1.png", "res/Bai_bich1_1.png"]
        var randomChat;
        var randomSo;

        this.sprite = new cc.Sprite(res.Table_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
        });
        this.addChild(this.sprite);

        var startCard = new cc.Sprite(res.BackFaceCard_png);
        startCard.attr({
            x: size.width / 2,
            y: size.height / 2,
        });
        this.addChild(startCard);
        startCard.setScale(2.25);
        for(var i = 0; i <= 5; i++){
            randomChat = Math.floor(Math.random() * 4);
            randomSo = Math.floor(Math.random() * 10);
            while (randomSo == 0) {
                randomSo = Math.floor(Math.random() * 10);
            }
            srcCard[i] = srcBai[randomChat] + randomSo + suffix;
            if(i > 0) {
                for (var j = 0; j < i; j++) {
                    if (srcCard[i] == srcCard[j]) {
                        randomChat = Math.floor(Math.random() * 4);
                        randomSo = Math.floor(Math.random() * 10);
                        while (randomSo == 0) {
                            randomSo = Math.floor(Math.random() * 10);
                        }
                        srcCard[i] = srcBai[randomChat] + randomSo + suffix;
                    }
                }
            }
            var tempCard = new cc.Sprite(srcCard[i]);
            tempCard.attr({
                x: posW[i],
                y: posH[i],
            });
            this.addChild(tempCard);
            tempCard.setFlippedX(true);
            tempCard.setVisible(false);
            this.cards.push(tempCard);
        }
        for(var i = 0; i <= 5; i++) {
            var temp = new cc.Sprite(res.BackFaceCard_png);
            temp.attr({
                x: size.width / 2,
                y: size.height / 2,
            });
            this.addChild(temp);
            temp.setVisible(false);
            this.backFaceCards.push(temp);
        }
        var self=this;
        var temp = 0;
        if(cc.sys.capabilities.hasOwnProperty('mouse')){
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,

                onMouseDown: function (event) {
                    var n = Math.floor(event.getLocationX());
                    var m = Math.floor(event.getLocationY());
                    var x = startCard.getContentSize().height;
                    var y = startCard.getContentSize().width;
                    var k = startCard.getPosition().x;
                    var l = startCard.getPosition().y;

                    if (n >= k - (y * 1.125)&& n <= k + (y* 1.125) && m >= l - (x*1.125)&& m <= l + (x*1.125)){
                        if(temp<=5){
                            var sprite_action = cc.MoveTo.create(0.5, cc.p(posW[temp], posH[temp]));
                            self.backFaceCards[temp].setVisible(true);
                            self.backFaceCards[temp].setScale(2.25);
                            self.backFaceCards[temp].runAction(sprite_action);
                            temp++;
                        } else if (temp == 6){
                            for(var i = 0; i <= 5; i++) {
                                self.backFaceCards[i].setVisible(false);
                                self.cards[i].setVisible(true);
                                var fade_in = cc.RotateTo.create(0.5, 0, 180);
                                self.backFaceCards[i].runAction(fade_in);
                                self.cards[i].runAction(fade_in);
                            }
                            temp++;
                        } else {
                            var left = 0, right = 0;
                            var src0 = srcCard[0];
                            var src1 = srcCard[1];
                            var src2 = srcCard[2];
                            var src3 = srcCard[3];
                            var src4 = srcCard[4];
                            var src5 = srcCard[5];
                            var imgArr = [src0, src1, src2, src3, src4, src5]
                            left = parseInt(src0[src0.length - 5]) + parseInt(src2[src2.length - 5]) + parseInt(src4[src4.length - 5]);
                            right = parseInt(src1[src1.length - 5]) + parseInt(src3[src3.length - 5]) + parseInt(src5[src5.length - 5]);
                            var leftWin = "Bên trái thắng";
                            var rightWin = "Bên phải thắng";
                            while (left > 10) {
                                left = left - 10;
                            }
                            while (right > 10) {
                                right = right - 10;
                            }
                            if (left > right) {
                                var label = new cc.LabelTTF(leftWin, "Arial");
                                label.setFontSize(80);
                                label.setPosition(cc.p(size.width/2, size.height/2));
                                label.setColor(cc.color(255, 0, 0));
                                self.addChild(label);
                            }
                            else if (right > left) {
                                var label = new cc.LabelTTF(rightWin, "Arial");
                                label.setFontSize(80);
                                label.setPosition(cc.p(size.width / 2, size.height / 2));
                                label.setColor(cc.color(255, 0, 0));
                                self.addChild(label);
                            }
                            else {
                                var chatRight = [parseInt(imgArr[1][imgArr[1].length - 7]), parseInt(imgArr[3][imgArr[3].length - 7]), parseInt(imgArr[5][imgArr[5].length - 7])];
                                var chatLeft = [parseInt(imgArr[0][imgArr[0].length - 7]), parseInt(imgArr[2][imgArr[2].length - 7]), parseInt(imgArr[4][imgArr[4].length - 7])];
                                chatLeft.sort(function (a, b) { return a - b });
                                chatRight.sort(function (a, b) { return a - b });
                                if (chatLeft[chatLeft.length - 1] > chatRight[chatRight.length - 1]) {
                                    var label = new cc.LabelTTF("Bên trái thắng chất", "Arial");
                                    label.setFontSize(80);
                                    label.setPosition(cc.p(size.width / 2, size.height / 2));
                                    label.setColor(cc.color(255, 0, 0));
                                    self.addChild(label);
                                } else if (chatLeft[chatLeft.length - 1] < chatRight[chatRight.length - 1]) {
                                    var label = new cc.LabelTTF("Bên phải thắng chất", "Arial");
                                    label.setFontSize(80);
                                    label.setPosition(cc.p(size.width / 2, size.height / 2));
                                    label.setColor(cc.color(255, 0, 0));
                                    self.addChild(label);
                                } else {
                                    var diemLeft = chatLeft.indexOf(chatLeft[chatLeft.length - 1]);
                                    var diemRight = chatRight.indexOf(chatRight[chatRight.length - 1]);
                                    var valueCompareL = 0, valueCompareR = 0;
                                    var compareLeft = chatLeft[chatLeft.length - 1] + "_";
                                    var compareRight = chatRight[chatRight.length - 1] + "_";
                                    for (var i = 0; i <= 5; i++) {
                                        if (i % 2 == 0) {
                                            console.log(compareLeft);
                                            if (diemLeft < chatLeft.length - 1) {
                                                if (imgArr[i].indexOf(compareLeft) != -1) {
                                                    if (valueCompareL == 0) {
                                                        valueCompareL = parseInt(imgArr[i][imgArr[i].length - 5]);
                                                    } else if (valueCompareL - parseInt(imgArr[i][imgArr[i].length - 5]) < 0) {
                                                        valueCompareL = parseInt(imgArr[i][imgArr[i].length - 5]);
                                                    }
                                                };
                                            } else {
                                                if (imgArr[i].indexOf(compareLeft) != -1) {
                                                    console.log(compareLeft);
                                                    valueCompareL = parseInt(imgArr[i][imgArr[i].length - 5]);
                                                }
                                            }
                                        } else {
                                            if (diemRight < chatRight.length - 1) {
                                                if (imgArr[i].indexOf(compareRight) != -1) {
                                                    if (valueCompareR == 0) {
                                                        valueCompareR = parseInt(imgArr[i][imgArr[i].length - 5]);
                                                    } else if (valueCompareR - parseInt(imgArr[i][imgArr[i].length - 5]) < 0) {
                                                        valueCompareR = parseInt(imgArr[i][imgArr[i].length - 5]);
                                                    }
                                                };
                                            } else {
                                                if (imgArr[i].indexOf(compareRight) != -1) {
                                                    valueCompareR = parseInt(imgArr[i][imgArr[i].length - 5]);
                                                    console.log(valueCompareR);
                                                }
                                            }
                                        }
                                    }
                                    if (valueCompareL > valueCompareR) {
                                        var label = new cc.LabelTTF("Bên trái thắng cùng chất", "Arial");
                                        label.setFontSize(80);
                                        label.setPosition(cc.p(size.width / 2, size.height / 2));
                                        label.setColor(cc.color(255, 0, 0));
                                        self.addChild(label);
                                    } else {
                                        var label = new cc.LabelTTF("Bên phải thắng cùng chất", "Arial");
                                        label.setFontSize(80);
                                        label.setPosition(cc.p(size.width / 2, size.height / 2));
                                        label.setColor(cc.color(255, 0, 0));
                                        self.addChild(label);
                                    }
                                }
                            }
                        }
                    }
                }
            }, this)
        }

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});
