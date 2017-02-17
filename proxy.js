/**
 * Created by gunjoe on 2017/2/16.
 */
let imageSet = (function () {
    let img = document.createElement("img");
    document.body.appendChild(img);
    return function (src) {
        img.src = src;
    }
})();

let imageProxy = (function () {
    let img = new Image;
    img.onload = function () {
        imageSet(this.src);
    };
    return function (src) {
        img.src = src;
        imageSet("cache.jpg");
    }
})();

imageProxy("bigImg.jpg");

