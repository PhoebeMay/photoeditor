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

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function definitions here

function makeMoreBlue(pixels, adjust) {

    //var pixels = ImageUtils.getPixels(img);
    var length = pixels.data.length;
    var data = pixels.data;

    for (var i = 0; i < length; i += 4) {
        data[i+2] = data[i+2] + adjust;
    }
    //ImageUtils.putPixels(pixels, img.width, img.height);
}

function makeMoreRed(pixels, adjust) {

    //var pixels = ImageUtils.getPixels(img);
    var length = pixels.data.length;
    var data = pixels.data;

    for (var i = 0; i < length; i += 4) {
        data[i] = data[i] + adjust;
    }
    //ImageUtils.putPixels(pixels, img.width, img.height);
}

function makeMoreGreen(pixels, adjust) {

    //var pixels = ImageUtils.getPixels(img);
    var length = pixels.data.length;
    var data = pixels.data;

    for (var i = 0; i < length; i += 4) {
        data[i+1] = data[i+1] + adjust;
    }
    //ImageUtils.putPixels(pixels, img.width, img.height);
}

function makeInvert(pixels, adjust) {
        //var pixels = ImageUtils.getPixels(img);
        var length = pixels.data.length;
        var data = pixels.data;


        for (var i = 0; i < length; i += 4) {
            data[i] = 255 - data[i] ;
            data[i+1] = 255 -data[i+1];
            data[i+2] = 255 -data[i+2] ;
        }
        //ImageUtils.putPixels(pixels, img.width, img.height);
}

function brighten(img, adjust) {
    //var pixels = ImageUtils.getPixels(img);
    var length = pixels.data.length;
    var data = pixels.data;


    for (var i = 0; i < length; i += 4) {
        data[i] = data[i] + adjust;
        data[i+1] = data[i+1] + adjust;
        data[i+2] = data[i+2] + adjust;
    }
    //ImageUtils.putPixels(pixels, img.width, img.height);

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

function makeFunky(pixels) {
    //var pixels = ImageUtils.getPixels(img);
    var length = pixels.data.length;
    var data = pixels.data;

    for (var i = 0; i < length/2; i += 2) {
        var temp = data[i];
        data[i] = data[length - i];
        data[length - i] = temp;
    }
    //ImageUtils.putPixels(pixels, img.width, img.height);
}


$(document).ready(function() {
    var img = new Image();
    img.src = "img/kermit.jpg";
    var pixels = ImageUtils.getPixels(img);
    makeFunky(pixels);
    makeMoreRed(pixels,-255);
    //var pixels = ImageUtils.getPixels(img);
    //var heightPixelsToHide = 100;
    ////console.log(pixels);
    //
    //for(var i = 0; i < img.width * heightPixelsToHide * 4; i++) {
    //    pixels.data[i] = 255;
    //}

    ImageUtils.putPixels(pixels, img.width, img.height);
});

//pixels[(i * pixels.width + j) * 4]