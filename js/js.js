
window.onload = function(){
    //登录
    function $(id){
        return document.getElementById(id);
    }


    //搜索框;妈的为什么不能写在这里
    /*var test = document.getElementById("test");
    //alert(3333);
    test.onfocus = function() {
        if (test.value == "q") {
            test.value = "";
        }
    }
    test.onblur = function(){
        if(test.value == ""){
            test.value = "6666";
        }
    }
*/
//登录框
    $("hell").onclick = function(event){
        //因为要冒泡，所以不能打开登录框
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!事件要在return之前做啊
        $("all").style.display = "block";
        $("login").style.display = "block";
        var event = event || window.event;

        if(event && event.stopPropagation){
            //iesb
            return event.stopPropagation()
        }
        else{
            return event.cancelBubble = true;
        }
    }
    $("closeAll").onclick = function(){
        $("all").style.display = "none";
        $("login").style.display = "none";
        }
    var login = $("login");
    //点击空白关闭登录框
    document.onclick = function(event){
        var event = event || window.event;
        //target方法，兼容问题iesb
        var targetId = event.target.id ? event.target.id : event.srcElement.id;
        if(targetId != "login"){
            $("all").style.display = "none";
            $("login").style.display = "none";
        }
    }

//关闭顶部bannner
    closeBanner.onclick = function(){
        topBanner.style.display = "none";
    }

    //轮播图
    var pics = $("pics");
    var picsUl = pics.children[0];
    var yuandian = $("focus").children[0].children[2];
    var picsChildren = pics.children[0].children;


    //为远点插入li标签，
    yuandian.appendChild(document.createElement("ul"));
    //这个ul是在创建之后才插入的所以变量要后面声明
    var yuandianUl = yuandian.children[0];
    //循环图片数量动态插入
    for(var i = 0 ; i < picsChildren.length ; i++){
        var li = document.createElement("li");
        li.innerHTML = i + 1;
        yuandianUl.appendChild(li);
    }
    var yuandianUls = yuandianUl.children;
    yuandianUls[0].className = "current";
    //要实现滑过哪个点就显示哪张图片，那么就要用到匀速动画，就是那个点的序列号乘以他们的宽度或长度
    for(var i = 0 ; i < yuandianUls.length ; i++){
        yuandianUls[i].index = i ;
        yuandianUls[i].onmouseover = function(){
            for(var j = 0 ; j < yuandianUls.length ; j++){
                yuandianUls[j].className = "";
            }
            this.className = "current"
            //因为要用到动画效果，
            //animate(picsUl, - (this.index * picsChildren[0].offsetWidth),20);
            animateHc(picsUl, - (this.index * picsChildren[0].offsetWidth));
            key = xyd = this.index;
        }
    }
    function animate(obj,target,speed){
        clearInterval(obj.aike);
        obj.aike = setInterval(function(){
            var noWspeed = obj.offsetLeft > target ? -speed : speed;
            var result = obj.offsetLeft - target;
            obj.style.left = obj.offsetLeft + noWspeed + "px";
            if(Math.abs(result) < speed){
                clearInterval(obj.aike);
                obj.style.left = target + "px";
            }
        },10)
    }
    //缓冲动画
    function animateHc (obj,target){
        clearInterval(obj.aike1);
        obj.aike1 = setInterval(function(){
            var step = (target - obj.offsetLeft) / 10 ;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            obj.style.left = obj.offsetLeft + step + "px";
        },10)
    }
    //轮播效果,要克隆一张图到最后
    picsUl.appendChild(picsChildren[0].cloneNode(true));
    var key = 0,xyd = 0;
    var aike = null;
    aike = setInterval(autoPlay,3000);
    function autoPlay(){
        key ++;
        if(key > picsChildren.length - 1){
            picsUl.style.left = 0;
            key = 1;
        }
        //animate(picsUl,key * -(picsChildren[0].offsetWidth),20);
        animateHc(picsUl,key * -(picsChildren[0].offsetWidth));
        xyd ++;
        if(xyd > yuandianUls.length - 1){
            xyd = 0;
        }
        for(var i = 0 ; i < yuandianUls.length ; i++){
            yuandianUls[i].className = "";
        }
        yuandianUls[xyd].className = "current";
    }

    pics.offsetParent.onmouseover = function(){
        clearInterval(aike);
        jiantou.style.display = "block";
    }
    pics.offsetParent.onmouseout = function(){
        aike = setInterval(autoPlay,3000);
        jiantou.style.display = "none";
    }
    //左右箭头
    var jiantou = $("focus").children[0].children[1];
    var jiantouLeft = jiantou.children[0];
    var jiantouRight = jiantou.children[1];

    jiantouRight.onclick = function(){
        autoPlay();
    }
    jiantouLeft.onclick = function(){
        autoLeft();
    }
    function autoLeft(){
        key --;
        if(key < 0){
            picsUl.style.left = picsChildren[0].offsetWidth * -(picsChildren.length - 1) + "px";
            key = picsChildren.length - 2;
        }
        //animate(picsUl, -key * picsChildren[0].offsetWidth,20);
        animateHc(picsUl, -key * picsChildren[0].offsetWidth);
        xyd --;
        if(xyd < 0){
            xyd = yuandianUls.length - 1;
        }
        for(var i = 0 ; i < yuandianUls.length ; i++){
            yuandianUls[i].className = "";
        }
        yuandianUls[xyd].className = "current"
    }











}