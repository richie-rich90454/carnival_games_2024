let fareVersion=document.getElementById("fareVersion");
let packetVersion=document.getElementById("packetVersion");
let jackpotVersion=document.getElementById("jackpotVersion");
let stopNumberGroup=document.getElementById("stopNumberGroup");
let fareVersionValue=0;
let packetVersionValue=0;
let stopNumJackpot=false;
let iterateNumberIndex=1;
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
stopNumberGroup.addEventListener("click",function(){
    stopNumJackpot=true;
});
function ballJackpot(){

};
function numberJackpot(){
    stopNumJackpot=false;
    let randomNumberArray=[];
    document.getElementById("numberJackpot").style.display="block";
    document.getElementById("ballJackpot").style.display="none";
    for (let i=0;i<3;i++){
        let randomNumber=Math.floor(Math.random()*10);
        randomNumberArray[i]=randomNumber;
    }
    document.getElementById("numberJackpot-randomNum").textContent=`${randomNumberArray[0]}${randomNumberArray[1]}${randomNumberArray[2]}`;
    iterateNumber();
};
function iterateNumber(){
    if (stopNumJackpot==false){
        if (iterateNumberIndex==999){
            iterateNumberIndex=0;
        }
        let iterateStringIndex=iterateNumberIndex.toString().padStart(3,"0");
        document.getElementById("num-hundreds").textContent=iterateStringIndex[0];
        document.getElementById("num-tens").textContent=iterateStringIndex[1];
        document.getElementById("num-ones").textContent=iterateStringIndex[2];
        iterateNumberIndex++
        let timeoutNumber=Math.floor(Math.random()*91)+10;
        console.log(timeoutNumber);
        setTimeout(iterateNumber,timeoutNumber);
    }
};