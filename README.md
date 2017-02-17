#简述图片预加载

实在不想吐槽网速这种东西了，说多了都是泪啊！网络高峰期的时候打开一些电商网经常都是一堆的空白啊，
而出现这种情况多数是因为网络太慢的原因导致图片加载太慢，在短时间内出现了一大堆的空白，这时候我
就在想，我们可不可以用同一张较小的图片来先预加载这一部分空白的区域，以至于用户不用看到一大片的
空白，然后就想到了代理模式。

那么如何将代理模式运用到我们的图片预加载中呢。

我们先创建一个设置图片闭包函数：

```js

//创建一个私有域，返回一个设置图片src的闭包
let imageSet = (function () {
    let img = document.createElement("img");
    document.body.appendChild(img);
    return function (src) {
        img.src = src;
    }
})();

//设置大图路径
imageSet("bigImg.jpg");

```
一般我们在实际写代码中呢，有个常见的情景，通过ajax像后台请求回一堆的图片路径，然后循环插入到页面的
图片容器当中，那么这时候就有个问题了，如果现在网络很慢，并且本地并没有缓存服务器的资源文件，那么就
会有一部分时间页面出现大量的空白了。

而如果现在我们有一张通用的小size的图片先请求回来，先在页面中占一定的空间，等到大图下载完成之后再插
入到页面的img.src中，就可以解决短暂的页面空白问题了，我们这里加一个代理该任务的对象：

```js

let imageProxy = (function () {
    //创建一个新的图片实例，暂时不添加到页面当中
    let img = new Image;
    //监听img是否下载完成
    img.onload = function () {
	    //完成则重写已添加到页面的图片
        imageSet(this.src);
    };
    return function (src) {
        img.src = src;
	    //先给添加到页面中的img设置小图
        imageSet("cache.jpg");
    }
})();

imageProxy("bigImg.jpg");

```

上面我们创建了一个代理图片的函数，当我执行imageProxy时，添加的bigImg.jpg将会在加载完成之后才加入到
页面图片的容器中，这就是一种通过代理这种思维来实现的一种场景啊。



