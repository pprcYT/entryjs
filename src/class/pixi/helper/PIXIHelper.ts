let PIXITempStore:any = require('../etc/PIXITempStore').PIXITempStore;
let PIXIText:any = require('../text/PIXIText').PIXIText;

declare let OffscreenCanvas:any;
declare let PIXI:any;

console.log("PIXIText", PIXIText);

export default class PIXIHelper {

    private static _canvasFactory:()=>HTMLCanvasElement;

    static text(str:string, font:string, color:string, textBaseline:string, textAlign:string) {
        // console.log(str, font);
        var reg = /((\d+)(pt|sp|px))?\s*(.+)/gi;
        var result:any[] = reg.exec(font) || [];
        var fontName = (result[4]) || "NanumGothic";
        var size = (result[1]) || "10pt";

        // console.log({
        //     input: font,
        //     fontName: fontName,
        //     size: size
        // });

        // var t = new PIXI.Text(str, {
        var t = new PIXIText(str, {
            fontFamily: fontName,
            fontSize: size,
            fill: color,
            textBaseline: textBaseline || 'alphabetic',
            align: textAlign || "left",
            miterLimit: 2.5 //createjs default value
        });
        return t;
    }

    static getOffScreenCanvas() {
        if(!this._canvasFactory) {
            this._createCanvasFactory();
        }
        return this._canvasFactory();
    }
    
    static _createCanvasFactory() {
        if( "OffscreenCanvas" in window ) {
            this._canvasFactory = ()=>{
                return new OffscreenCanvas(1,1);
            };
        } else {
            this._canvasFactory = ()=>{
                return document.createElement('canvas');
            };
        }
    }

    /**
     * createjs.Text.getMeasuredWidth() 의 pollyfill
     * @param pixiText
     */
    static textWidth(pixiText:any) {
        return pixiText.measuredWidth;
    }
    static textHeight(pixiText:any) {
        return pixiText.measuredHeight;
    }
    static getMeasuredLineHeight(pixiText:any) {
        return pixiText.measuredLineHeight;
    }


    static cacheIfHasFilters(that:any) {
        // if (!_.isEmpty(that.object.filters)) that.cache();
        // else that.object.uncache();
    }

    /**
     *
     * @param {PIXI.Sprite} sp
     * @param {HTMLImageElement} image
     */
    static setTextureToPIXISprite(sp:any, image:any) {
        sp.texture = PIXI.Texture.from(image);
    }


    static createjsUncache(target:any) {
        // object.uncache()
    }

    /**
     * #ff00ff --> 0xff00ff
     * @param strColor
     */
    static colorToUint(strColor:any) {
        return strColor ? Number(strColor.replace("#", "0x")) : undefined;
    }

    static needDestroy(target:any) {

    }

    static todo(msg:string) {

    }

    /**
     * createjs.DisplayObject#getTransformBound()
     * @param {PIXI.DisplayObject} target
     */
    static getTransformBound(target:any) {
        var bounds = target.getLocalBounds(PIXITempStore.rect);

        var x = bounds.x, y = bounds.y, width = bounds.width, height = bounds.height;
        var mtx = PIXITempStore.matrix1;
        target.localTransform.copy(mtx);

        if (x || y) {
            var mat2 = PIXITempStore.matrix2.identity().translate(-x,-y);
            mtx.append(mat2);
        }

        var x_a = width*mtx.a, x_b = width*mtx.b;
        var y_c = height*mtx.c, y_d = height*mtx.d;
        var tx = mtx.tx, ty = mtx.ty;

        var minX = tx, maxX = tx, minY = ty, maxY = ty;

        if ((x = x_a + tx) < minX) { minX = x; } else if (x > maxX) { maxX = x; }
        if ((x = x_a + y_c + tx) < minX) { minX = x; } else if (x > maxX) { maxX = x; }
        if ((x = y_c + tx) < minX) { minX = x; } else if (x > maxX) { maxX = x; }

        if ((y = x_b + ty) < minY) { minY = y; } else if (y > maxY) { maxY = y; }
        if ((y = x_b + y_d + ty) < minY) { minY = y; } else if (y > maxY) { maxY = y; }
        if ((y = y_d + ty) < minY) { minY = y; } else if (y > maxY) { maxY = y; }

        bounds.x = minX;
        bounds.y = minY;
        bounds.width = maxX-minX;
        bounds.height = maxY-minY;
        return bounds;
    }


    static HSVtoRGB(h:number, s:number, v:number):{r:number, g:number, b:number} {
        var r, g, b, i, f, p, q, t;
        // https://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately
        //https://ko.wikipedia.org/wiki/HSV_%EC%83%89_%EA%B3%B5%EA%B0%84
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0: r = v; g = t; b = p; break;
            case 1: r = q; g = v; b = p; break;
            case 2: r = p; g = v; b = t; break;
            case 3: r = p; g = q; b = v; break;
            case 4: r = t; g = p; b = v; break;
            case 5: r = v; g = p; b = q; break;
        }
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    }


}
