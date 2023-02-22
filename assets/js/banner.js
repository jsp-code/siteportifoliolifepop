var canvas =  document.querySelector("#teste");
var mudarSlider = false
var myBanner = new banner(canvas);
    myBanner.callUpDate = ()=>{
        if (myBanner._time%60 ==0) {
            //console.log(myBanner.getFrameInfo());
        }
    }
var image1 = new Image();
    image1.src = "./assets/png/banner_img/001.png"
var image2 = new Image();
    image2.src = "./assets/png/banner_img/002.png"
var image3 = new Image();
    image3.src = "./assets/png/banner_img/003.png"
var image4 = new Image();
    image4.src = "./assets/png/banner_img/004.png"

myBanner.addImage(
    {
        nome:"nome",
        image:image1,
        time_max:400,
        trasition:"trasitionMask7",
        trasitionInicialize:350,
        action:(time)=>{
            if(time == 3){
                //myBanner.stop()
            }
        }
    }
);
myBanner.addImage(
    {
        nome:"nome",
        image:image2,
        time_max:400,
        trasition:"trasitionMask8",
        trasitionInicialize:350,
        action:(time)=>{
            if(time == 1){
                console.log('frame2')
            }
        }
    }
);
myBanner.addImage(
    {
        nome:"nome",
        image:image3,
        time_max:400,
        trasition:"trasitionMask7",
        trasitionInicialize:350,
        action:(time)=>{
            if(time == 1){
                console.log('frame2')
            }
        }
    }
);
myBanner.addImage(
    {
        nome:"nome",
        image:image4,
        time_max:400,
        trasition:"trasitionMask1",
        trasitionInicialize:350,
        action:(time)=>{
            if(time == 1){
                console.log('frame2')
            }
        }
    }
);
var anima = myBanner.start;
requestAnimationFrame(anima);
document.querySelector("#b_left").onclick = function(){
    if (myBanner.playStatus() == false) {
        setTimeout(() => {
            myBanner.stop();
        }, 50);
        myBanner.play();
    }
    var frame = myBanner.getCurrentFrame()
                myBanner.setFrame(frame-1)
                console.log("click")
    
}
document.querySelector("#b_right").onclick = function(){
    if (myBanner.playStatus() == false) {
        setTimeout(() => {
            myBanner.stop();
        }, 50);
        myBanner.play();
    }
    var frame = myBanner.getCurrentFrame()
                myBanner.setFrame(frame+1)
                console.log("click")
}
document.querySelector("div#interface").style.zIndex = "100"
document.querySelector("#b_left").style.display ="none"
document.querySelector("#b_right").style.display ="none"
document.querySelector("div#interface").onmouseover = function(){
    document.querySelector("#b_left").style.display ="block"
    document.querySelector("#b_right").style.display ="block"
    myBanner.stop();
}
document.querySelector("div#interface").onmouseout = function(){
    document.querySelector("#b_left").style.display ="none"
    document.querySelector("#b_right").style.display ="none"
    myBanner.play();
}