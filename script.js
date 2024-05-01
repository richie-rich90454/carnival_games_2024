let fareVersion=document.getElementById("fareVersion");
let packetVersion=document.getElementById("packetVersion");
let jackpotVersion=document.getElementById("jackpotVersion");
let fareVersionValue=0;
let packetVersionValue=0;
fareVersion.addEventListener("change",function(){
    fareVersionValue=fareVersion.options[fareVersion.selectedIndex].value;
    packetVersion.style.display="block";
    fareVersion.style.display="none";
});
packetVersion.addEventListener("change",function(){
    packetVersionValue=packetVersion.options[packetVersion.selectedIndex].value;
    packetVersion.style.display="none";
    jackpotVersion.style.display="block";
});
jackpotVersion.addEventListener("change",function(){
    if (jackpotVersion.options[jackpotVersion.selectedIndex].value=="ball"){
        ballJackpot();
    }
    else{
        numberJackpot();
    }
});
function ballJackpot(){

};
function numberJackpot(){
    let randomNumberArray=[];
    document.getElementById("numberJackpot").style.display="block";
    document.getElementById("ballJackpot").style.display="none";
    for (let i=0;i<3;i++){
        let randomNumber=Math.floor(Math.random()*10);
        randomNumberArray[i]=randomNumber;
    }
    document.getElementById("num-hundreds").textContent=randomNumberArray[0];
    document.getElementById("num-tens").textContent=randomNumberArray[1];
    document.getElementById("num-ones").textContent=randomNumberArray[2];
};