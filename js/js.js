
window.onload = function(){
    //��¼
    function $(id){
        return document.getElementById(id);
    }


    //������;���Ϊʲô����д������
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
//��¼��
    $("hell").onclick = function(event){
        //��ΪҪð�ݣ����Բ��ܴ򿪵�¼��
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!�¼�Ҫ��return֮ǰ����
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
    //����հ׹رյ�¼��
    document.onclick = function(event){
        var event = event || window.event;
        //target��������������iesb
        var targetId = event.target.id ? event.target.id : event.srcElement.id;
        if(targetId != "login"){
            $("all").style.display = "none";
            $("login").style.display = "none";
        }
    }

//�رն���bannner
    closeBanner.onclick = function(){
        topBanner.style.display = "none";
    }

    //�ֲ�ͼ
    var pics = $("pics");
    var picsUl = pics.children[0];
    var yuandian = $("focus").children[0].children[2];
    var picsChildren = pics.children[0].children;


    //ΪԶ�����li��ǩ��
    yuandian.appendChild(document.createElement("ul"));
    //���ul���ڴ���֮��Ų�������Ա���Ҫ��������
    var yuandianUl = yuandian.children[0];
    //ѭ��ͼƬ������̬����
    for(var i = 0 ; i < picsChildren.length ; i++){
        var li = document.createElement("li");
        li.innerHTML = i + 1;
        yuandianUl.appendChild(li);
    }
    var yuandianUls = yuandianUl.children;
    yuandianUls[0].className = "current";
    //Ҫʵ�ֻ����ĸ������ʾ����ͼƬ����ô��Ҫ�õ����ٶ����������Ǹ�������кų������ǵĿ�Ȼ򳤶�
    for(var i = 0 ; i < yuandianUls.length ; i++){
        yuandianUls[i].index = i ;
        yuandianUls[i].onmouseover = function(){
            for(var j = 0 ; j < yuandianUls.length ; j++){
                yuandianUls[j].className = "";
            }
            this.className = "current"
            //��ΪҪ�õ�����Ч����
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
    //���嶯��
    function animateHc (obj,target){
        clearInterval(obj.aike1);
        obj.aike1 = setInterval(function(){
            var step = (target - obj.offsetLeft) / 10 ;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            obj.style.left = obj.offsetLeft + step + "px";
        },10)
    }
    //�ֲ�Ч��,Ҫ��¡һ��ͼ�����
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
    //���Ҽ�ͷ
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