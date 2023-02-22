var banner = class banner{

    _images = [];
    _beforeImage=null;
    _nowImage=null;
    _nextImage=null;
    _time_max=0;
    _time=0;
    _isStarting=false;
    _isActive =true;
    _mask = new function(maskImage = {image:new Image(),dx:0,dy:0}){
        this._maskImage = maskImage;
        this._maskAction = function(){}

        this.sphereMask = (canvas,time)=>{
            this._maskAction = ()=>{
                var scale_x = canvas.width;
                var scale_y = canvas.height;
                var r = scale_x >= scale_y ? scale_x*1.2 : scale_y*1.2;

                var ctx = canvas.getContext("2d");
                ctx.save();
                    ctx.arc(scale_x/2, scale_y/2, r*time, 0, 2 * Math.PI);
                    ctx.clip();
                    ctx.drawImage(this._maskImage.image,this._maskImage.dx,this._maskImage.dy,scale_x,scale_y);
                ctx.restore();
            }
        }
        this.multeSphereMask = (canvas,time)=>{
            this._maskAction = ()=>{
                var nx=20;
                var ny=20;

                var scale_img_x = canvas.width;
                var scale_img_y = canvas.height;

                var scale_x = canvas.width/nx;
                var scale_y = canvas.height/ny;
                var r = scale_x >= scale_y ? scale_x*1.2 : scale_y*1.2;

                var ctx = canvas.getContext("2d");
                ctx.save();
                    ctx.beginPath();
                    for (let i = 0; i < nx; i++) {
                        for (let j = 0; j < ny; j++) {
                            ctx.moveTo(scale_x*i,scale_y*j);
                            ctx.arc(r*i +r/2,r*j +r/2, r*time, 0, 2 * Math.PI);
                            
                        }
                    }
                    ctx.closePath();
                    ctx.clip();
                    ctx.drawImage(this._maskImage.image,this._maskImage.dx,this._maskImage.dy,scale_img_x ,scale_img_y);
                ctx.restore();
            }
        }
        this.multeSphereWeveMask = (canvas,time)=>{
            this._maskAction = ()=>{
                var nx=20;
                var ny=20;

                var scale_img_x = canvas.width;
                var scale_img_y = canvas.height;

                var scale_x = canvas.width/nx;
                var scale_y = canvas.height/ny;
                var r = scale_x >= scale_y ? scale_x*1.2 : scale_y*1.2;

                var ctx = canvas.getContext("2d");
                ctx.save();
                    ctx.beginPath();
                    for (let i = 0; i < nx; i++) {
                        for (let j = 0; j < ny; j++) {
                            ctx.moveTo(scale_x*i,scale_y*j);
                            ctx.arc(r*i +r/2 - Math.sqrt(2)*r/2,
                                r*j +r/2 - Math.sqrt(2)*r/2, 
                                r*i*time <= r*Math.sqrt(2) ? r*i*time  : r*Math.sqrt(2), 
                                0, 2 * Math.PI);
                            
                        }
                    }
                    ctx.closePath();
                    ctx.clip();
                    ctx.drawImage(this._maskImage.image,this._maskImage.dx,this._maskImage.dy,scale_img_x ,scale_img_y);
                ctx.restore();
            }
        }
        this.multeSphereWeve2Mask = (canvas,time)=>{
            this._maskAction = ()=>{
                var nx=20;
                var ny=20;

                var scale_img_x = canvas.width;
                var scale_img_y = canvas.height;

                var scale_x = canvas.width/nx;
                var scale_y = canvas.height/ny;
                var r = scale_x >= scale_y ? scale_x*1.2 : scale_y*1.2;

                var ctx = canvas.getContext("2d");
                ctx.save();
                    ctx.beginPath();
                    for (let i = 0; i < nx; i++) {
                        for (let j = 0; j < ny; j++) {
                            ctx.moveTo(scale_x*i,scale_y*j);
                            ctx.arc(r*i +r/2 - Math.sqrt(2)*r/2,
                                r*j +r/2 - Math.sqrt(2)*r/2, 
                                r*(nx-i)*time <= r*Math.sqrt(2) ? r*(nx-i)*time  : r*Math.sqrt(2), 
                                0, 2 * Math.PI);
                            
                        }
                    }
                    ctx.closePath();
                    ctx.clip();
                    ctx.drawImage(this._maskImage.image,this._maskImage.dx,this._maskImage.dy,scale_img_x ,scale_img_y);
                ctx.restore();
            }
        }
        this.rectangleMask = (canvas,time)=>{
            this._maskAction = ()=>{
                var scale_x = canvas.width;
                var scale_y = canvas.height;
                

                var ctx = canvas.getContext("2d");
                ctx.save();
                    ctx.rect((1-time)*scale_x/2,
                             (1-time)*scale_y/2, 
                                time*scale_x, 
                                time*scale_y);
                    ctx.clip();
                    ctx.drawImage(this._maskImage.image,
                                  this._maskImage.dx,
                                  this._maskImage.dy,
                                  scale_x,scale_y);
                ctx.restore();
            }
        }


    }
    _trasitions = function(banner = this,time = "unlinear"){
        this.banner = banner;
        this.time = time;
        this.start=()=>{
            var trasitionInfo = banner.getFrameInfo().trasitionInfo;

            this.trasitionInfo = trasitionInfo;
            if(time == 'linear'){
                this.time =trasitionInfo.relativeTrasitionTimeIn100
            }else{
                this.time =Math.sin(trasitionInfo.relativeTrasitionTimeIn100*Math.PI/2);
            }
        }
        this.trasitionNull = ()=>{
            this.start();
        }
        this.trasition1 = ()=>{
            
            this.start();
            if(typeof this.time == "number"){
                this.banner._nowImage.opacity = 1 - this.time;
            }else{
                this.banner._nowImage.opacity = 1;
            }

        }
        this.trasition2 = ()=>{

            this.start();
            if(typeof this.time == "number"){
                this.banner._nowImage.dx = (- this.time)*this.banner.out.width;
            }else{
                this.banner._beforeImage.dx= 0;
                this.banner._nowImage.dx = 0;
                this.banner._nextImage.dx= 0;
            }
            
        }
        this.trasition3 = ()=>{
            this.start();
            if(typeof this.time == "number"){
                this.banner._nowImage.dx = ( this.time)*this.banner.out.width;
            }else{
                this.banner._beforeImage.dx= 0;
                this.banner._nowImage.dx = 0;
                this.banner._nextImage.dx= 0;
            }
        }
        this.trasition4 = ()=>{
            this.start();
            if(typeof this.time == "number"){
                this.banner._nowImage.dy = ( -this.time)*this.banner.out.width;
            }else{
                this.banner._beforeImage.dy= 0;
                this.banner._nowImage.dy = 0;
                this.banner._nextImage.dy= 0;
            }
        }
        this.trasition5 = ()=>{
            this.start();
            if(typeof this.time == "number"){
                this.banner._nowImage.dy = ( this.time)*this.banner.out.width;
            }else{
                this.banner._beforeImage.dy= 0;
                this.banner._nowImage.dy = 0;
                this.banner._nextImage.dy= 0;
            }
        }
        this.trasition6 = ()=>{
            this.start();
            if(typeof this.time == "number"){
                this.banner._nowImage.dx = this.time*this.banner.out.width;
                this.banner._nextImage.dx = (-1 + this.time)*this.banner.out.width;
            }else{
                this.banner._nowImage.dx = 0;
                this.banner._nextImage.dx= 0;
            }
        }
        this.trasition7 = ()=>{
            this.start();
            if(typeof this.time == "number"){
                this.banner._nowImage.dx = this.time*this.banner.out.width;
                this.banner._nextImage.dx = (-1 + this.time)*this.banner.out.width;
            }else{
                this.banner._beforeImage.dx= 0;
                this.banner._nowImage.dx = 0;
                this.banner._nextImage.dx= 0;
            }
        }
        this.trasition8 = ()=>{
            this.start();
            if(typeof this.time == "number"){
                this.banner._nowImage.dy = this.time*this.banner.out.height;
                this.banner._nextImage.dy = (1 + this.time)*this.banner.out.height;
            }else{
                this.banner._beforeImage.dy= 0;
                this.banner._nowImage.dy = 0;
                this.banner._nextImage.dy= 0;
            }
        }
        this.trasition9 = ()=>{
            this.start();
            if(typeof this.time == "number"){
                this.banner._nowImage.dy = this.time*this.banner.out.height;
                this.banner._nextImage.dy = (-1 + this.time)*this.banner.out.height;
            }else{
                this.banner._beforeImage.dy= 0;
                this.banner._nowImage.dy = 0;
                this.banner._nextImage.dy= 0;
            }
        }
        this.trasitionMask1 =()=>{
            this.start();
            this.banner._mask._maskImage = this.banner._nextImage;
            this.banner._mask.sphereMask(this.banner.out,this.time)
        }
        this.trasitionMask2 =()=>{
            this.start();
            this.banner._nowImage.opacity = 1;
            this.banner._mask._maskImage = {...this.banner._nowImage};
            this.banner._nowImage.opacity = 0;
            this.banner._mask.sphereMask(this.banner.out,1-this.time)
        }
        this.trasitionMask3 =()=>{
            this.start();
            this.banner._mask._maskImage = this.banner._nextImage;
            this.banner._mask.rectangleMask(this.banner.out,this.time)
        }
        this.trasitionMask4 =()=>{
            this.start();
            this.banner._nowImage.opacity = 1;
            this.banner._mask._maskImage = {...this.banner._nowImage};
            this.banner._nowImage.opacity = 0;
            this.banner._mask.rectangleMask(this.banner.out,1-this.time)
        }
        this.trasitionMask5 =()=>{
            this.start();
            this.banner._mask._maskImage = this.banner._nextImage;
            this.banner._mask.multeSphereMask(this.banner.out,this.time)
        }
        this.trasitionMask6 =()=>{
            this.start();
            this.banner._nowImage.opacity = 1;
            this.banner._mask._maskImage = {...this.banner._nowImage};
            this.banner._nowImage.opacity = 0;
            this.banner._mask.multeSphereMask(this.banner.out,1-this.time)
        }
        this.trasitionMask7 =()=>{
            this.start();
            this.banner._nowImage.opacity = 1;
            this.banner._mask._maskImage = {...this.banner._nowImage};
            this.banner._nowImage.opacity = 0;
            this.banner._mask.multeSphereWeveMask(this.banner.out,1-this.time)
        }
        this.trasitionMask8 =()=>{
            this.start();
            this.banner._nowImage.opacity = 1;
            this.banner._mask._maskImage = {...this.banner._nowImage};
            this.banner._nowImage.opacity = 0;
            this.banner._mask.multeSphereWeve2Mask(this.banner.out,1-this.time)
        }
        this.resertTrasition=()=>{
            var reserted = this.banner;
            reserted._images.forEach((element)=>{
                element.opacity =1;
                element.dx=0;
                element.dy=0;
            })
            this.banner._mask._maskAction = function(){}
        }
    }
    
    constructor(out = new Element()){
        this.out = out;
        this.callStart = function(){};
        this.callUpDate = function(){};
        this.trasitions = new  this._trasitions(this)
    }
    addImage(arg={nome:"nome","image":new Image(),time_max:0}){
        arg.opacity =1;
        arg.dx =0;
        arg.dy =0;
        if(arg.trasitionInicialize == undefined){
            arg.trasitionInicialize = arg.time_max - arg.time_max*20/100;
        }
        if(arg.trasition ==undefined){
            arg.trasition = 'trasition1';
        }
        if(arg.action == undefined){
            arg.action = (time)=>{
            };
        }
        this._images[this._images.length] = arg;
        return arg;
    }

    _setImageSequence=()=>{
        if(this._images.length>=3){
            this._nowImage = this._images[0]
            this._nextImage = this._images[1]
            this._beforeImage = this._images[this._images.length-1]
            return true;
        }else{
            return false;
        }
    }

    _updateImageSequence=(frame = this._setCurrentFrame())=>{
        if(frame == this._setCurrentFrame()){
            var info = this.getFrameInfo();
                this._images[frame].action(info.timeRelative);
        }else{
            this._time = this._getStartTimeToframe(frame);
        }
        if (frame==0) {
            this._nowImage = this._images[0];
            this._nextImage = this._images[1];
            this._beforeImage = this._images[this._images.length-1];
            return true;
        }else if (frame== this._images.length-1) { 
            this._beforeImage = this._nowImage;
            this._nowImage = this._images[this._images.length-1];
            this._nextImage = this._images[0];
            return true;
        } else {
            this._beforeImage = this._nowImage;
            this._nowImage = this._images[frame];
            this._nextImage = this._images[frame+1];
            return true;
        }
        
    }
    getCurrentFrame(){
        var atTime = this._time;
        var timeMim =0;
        var cont =this._images.reduce( ( prevVal, elem, id)=> {
            if(timeMim<atTime){
                timeMim += elem.time_max;
                prevVal = prevVal +1;
                return prevVal;
            }else{
                return prevVal;
            }
        }, 0 );

        if(timeMim!=0){
            return cont -1;
        }else{
            return cont;
        }
        
    }
    _setCurrentFrame=()=>{
        var atTime = this._time;
        var timeMim =0;
        var cont =this._images.reduce( ( prevVal, elem, id)=> {
            if(timeMim<atTime){
                timeMim += elem.time_max;
                prevVal = prevVal +1;
                return prevVal;
            }else{
                return prevVal;
            }
        }, 0 );
        
        if(timeMim!=0){
            return cont -1;
        }else{
            return cont;
        }
    }
    _getStartTimeToframe=(frame = 0)=>{
        var frameTime = 0;
        if(frame ==0){
            return 0;
        }else{
            this._images.forEach((elemente,index)=>{
                if (index<frame) {
                    frameTime += elemente.time_max;
                }
            })
        }
        return frameTime;
    }
    setFrame=(frame)=>{
        if(frame<0){
            frame = this._images.length-1;
        }
        var timeFrame = this._getStartTimeToframe(frame)
        this._time =  timeFrame+1;
        return timeFrame;
    }
    getFrameInfo(frame = this.getCurrentFrame()){
        var timeStart = this._getStartTimeToframe(frame);
        var timeTotal = this._images[frame].time_max
        var timeEnd = timeStart + timeTotal;
        if (this._time>= timeStart && this._time<=timeEnd) {
            var timeRelative = this._time - timeStart;
            var timeRelativeIn100 = timeRelative*100/timeTotal;

        } else{
            if (frame < this._getStartTimeToframe(frame)) {
                var timeRelative = -1;
                var timeRelativeIn100 = 0;
            } else {
                var timeRelative = timeTotal+1;
                var timeRelativeIn100 = 100;
            }
        }
        var trasitionInicialize = this._images[frame].trasitionInicialize;
        var trasitionDuration = timeTotal - trasitionInicialize;
        if(trasitionInicialize>0){
            var relativeTrasitionTime = timeRelative - trasitionInicialize;
            var relativeTrasitionTimeIn100 = relativeTrasitionTime/trasitionDuration;
            if(relativeTrasitionTime<0){
                relativeTrasitionTime = false;
                relativeTrasitionTimeIn100 = false;
            }else if (timeRelative >timeTotal) {
                relativeTrasitionTime = true;
                relativeTrasitionTimeIn100 = true;
            }
        }else{
            var relativeTrasitionTime = null;
            var relativeTrasitionTimeIn100 = null;
        }
        return{
            frame: frame,
            timeTotal: timeTotal,
            timeStart: timeStart,
            timeEnd: timeEnd,
            timeRelative: timeRelative,
            timeRelativeIn100:timeRelativeIn100,
            trasitionInfo:{
                trasitionInicialize:trasitionInicialize,
                trasitionDuration:trasitionDuration,
                relativeTrasitionTime:relativeTrasitionTime,
                relativeTrasitionTimeIn100:relativeTrasitionTimeIn100
            }
        }
    }
    stop(){
        this._isActive =false;
    }
    play(){
        this._isActive =true;
        requestAnimationFrame(this.start)
    }
    playStatus(){
        return this._isActive
    }
    _set_time_max=()=>{
        this._time_max =0;
        this._images.forEach(element => {
            this._time_max += element.time_max;
            
        });
        return this._time_max;
    }
    _time_update =()=>{
        if (this._time < this._time_max) {
            this._time ++;
        }else if (this._time < 0) {
            this._time = 0;
        } else {
            this._time = 0;
        }
        return this._time;
    }
    _prepareOut(){
        this.out.width = this.out.clientWidth;
        this.out.height = this.out.clientHeight;
        this.out.style.width = "100%";
        this.out.style.height = "100%";
    }
    _prepareImages(){
        this._images.forEach(
            (element)=>{
                element.image.style.width = "100%";
                element.image.style.height = "100%";
            }
        )
    }
    render=()=>{
        const ctx = this.out.getContext("2d");
        const myTrasition = this._nowImage.trasition;
        this.trasitions[myTrasition]();
        ctx.save();
        ctx.drawImage(this._nextImage.image,this._nextImage.dx,this._nextImage.dy,this.out.width,this.out.height);
        ctx.restore()
        ctx.save();
        ctx.globalAlpha = this._nowImage.opacity;
        ctx.drawImage(this._nowImage.image,this._nowImage.dx,this._nowImage.dy,this.out.width,this.out.height);
        ctx.restore()
        this._mask._maskAction();
        this.trasitions.resertTrasition();

    }
    update=()=>{
        this.callUpDate();
        this._prepareOut();
        this.render();
        this._time_update();
        this._updateImageSequence();
        return true;
    }
    start=()=>{
        if(this._isStarting == false){
            this.callStart();
            if (this._setImageSequence()) {
                this._isStarting = true;
                this._set_time_max();
                this.trasitions.start();
                this._prepareImages();
            }else{
                console.log(`To work we need at least 3 banners.
                             Para funcionar precisamos de pelomenos 3 banners.`)
                return;
            }
        }
        if (this._isActive ==true) {
            this.update();
            requestAnimationFrame(this.start)
        }
    }
}