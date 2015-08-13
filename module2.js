class ImageUtils {

    static getCanvas(w, h) {
        var c = document.querySelector("canvas");
        c.width = w;
        c.height = h;
        return c;
    }

    static getPixels(img) {
        var c = ImageUtils.getCanvas(img.width, img.height);
        var ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);
        return ctx.getImageData(0,0,c.width,c.height);
    }

    static putPixels(imageData, w, h) {
        var c = ImageUtils.getCanvas(w, h);
        var ctx = c.getContext('2d');
        ctx.putImageData(imageData, 0, 0);
    }

}

class RGBA {
    constructor(redValue, greenValue, blueValue, alphaValue){
        this.red = redValue;
        this.green = greenValue;
        this.blue = blueValue;
        this.alpha = alphaValue;
    }

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function colourise(pixels, colour, level) {

    var all = pixels.data.length;
    var data = pixels.data;

    for (var i = 0; i < all; i += 4) {
        var origRGBA = new RGBA(data[i], data[i+1], data[i+2], data[i+3]);

        var modifiedRGBA = colourisePixel(origRGBA, colour, level);
        setPixel(data, i, modifiedRGBA);
    }
}

function colourisePixel(originalRGBA, colour, level) {

    var diffRed = (originalRGBA.red - colour.red) * (level / 100);
    var modifiedRed = originalRGBA.red - diffRed;

    var diffGreen = (originalRGBA.green - colour.green) * (level / 100);
    var modifiedGreen = originalRGBA.green - diffGreen;

    var diffBlue = (originalRGBA.blue - colour.blue) * (level / 100);
    var modifiedBlue = originalRGBA.blue - diffBlue;

    return new RGBA(modifiedRed, modifiedGreen, modifiedBlue, colour.alpha);
}

function clip(pixels, range){
        var all = pixels.data.length;
        var data = pixels.data;

        for (var i = 0; i < all; i += 4) {
            var origRGBA = new RGBA(data[i], data[i+1], data[i+2], data[i+3]);
            var modifiedRGBA = clipPixel(origRGBA, range);
            //console.log(modifiedRGBA);
            setPixel(data, i, modifiedRGBA);
        }

}

function clipPixel(colour, range) {

    var clippedRed = 0;
    var clippedGreen = 0;
    var clippedBlue = 0;

    if(colour.red > 255 - range) {
        clippedRed = 255;
    }

    if(colour.green > 255 - range) {
        clippedGreen = 255;
    }

    if(colour.blue > 255 - range) {
        clippedBlue = 255;
    }

    return new RGBA(clippedRed, clippedGreen, clippedBlue, colour.alpha);

}

function noise(pixels) {
    //var pixels = ImageUtils.getPixels(img);
    var length = pixels.data.length;
    var data = pixels.data;


    for (var i = 0; i < length; i += 4) {
        data[i] = data[i] + getRandomInt(-50, 50);
        data[i+1] = data[i+1] + getRandomInt(-50, 50);
        data[i+2] = data[i+2] + getRandomInt(-50, 50);
    }
    //ImageUtils.putPixels(pixels, img.width, img.height);
}


function setPixel(data, i, colour) {
    data[i] = colour.red;
    data[i+1] = colour.green;
    data[i+2] = colour.blue;
    data[i+3] = colour.alpha;
}

var colour = new RGBA(59, 55,22,255);

$(document).ready(function() {
    var img = new Image();
    img.src = "img/kermit.jpg";
    var pixels = ImageUtils.getPixels(img);

    noise(pixels);

    console.log(pixels);
    ImageUtils.putPixels(pixels, img.width, img.height);
});
