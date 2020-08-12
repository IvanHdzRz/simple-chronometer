'use strict'


class Cronometro {
    constructor(Display){
        this.min=0;
        this.sec=0;
        this.dec=0;
        this.isRunning=false;
        this.runInterval;
        this.time="";
        this.display=Display;
    }
   
    Start(display){
        this.isRunning=true;
        this.min=0;
        this.sec=0;
        this.dec=0;
        this.runInterval=setInterval(()=>{
            //las decimas de segundo son menor a 9? si aumenta 1 no regresa a 0
            if(this.dec<9){
                this.dec++;
            }else{
                this.dec=0;
                if(this.sec<59){
                    this.sec++;
                }else{
                    this.sec=0;
                    this.min++;
                }
            }
            this.display.innerHTML=this.Time;
        },100);
        
    }
    Stop(){
        clearInterval(this.runInterval);
        this.isRunning=false;
    }
    get Time(){
        this.time=""+(this.min).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    +":"+(this.sec).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    +":<span>"+this.dec+"</span>";
        
    return this.time;
    }
}

const spaceKey =32;
var display =document.getElementById('Display');
var cronometro= new Cronometro(display);
var pagina=document.getElementById('cuerpo');

pagina.addEventListener("keypress",(event)=>{
    if(event.keyCode==spaceKey){
        if(cronometro.isRunning==false){
            cronometro.Start();
            display.style.animationName='start-count';
            display.style.color='rgba(10,200,100,1)';
            display.style.animationIterationCount='initial';
            
        }else{
            cronometro.Stop();
            display.style.animationName='stop-count';
            display.style.color='rgba(10,100,200,1)';
            display.style.animationIterationCount='initial';
        }
        
    }
    
});

