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

};