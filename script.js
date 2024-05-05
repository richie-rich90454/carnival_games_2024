let fareVersion=document.getElementById("fareVersion");
let packetVersion=document.getElementById("packetVersion");
let jackpotVersion=document.getElementById("jackpotVersion");
let stopNumberGroup=document.getElementById("stopNumberGroup");
let fareVersionValue=0;
let packetVersionValue=0;
let stopNumJackpot=false;
let iterateNumberIndex=1;
let randomNumberArray=[];
let allowedJackpots;
fareVersion.addEventListener("change",function(){
    fareVersionValue=fareVersion.options[fareVersion.selectedIndex].value;
    if (fareVersionValue==1){
        allowedJackpots=1;
    }
    else{
        allowedJackpots=2;
    }
    packetVersion.style.display="block";
    fareVersion.style.display="none";
});
packetVersion.addEventListener("change",function(){
    packetVersionValue=packetVersion.options[packetVersion.selectedIndex].value;
    if (packetVersionValue==5){
        allowedJackpots=allowedJackpots*1;
    }
    else if (packetVersionValue==10){
        allowedJackpots=allowedJackpots*2;
    }
    else{
        allowedJackpots=allowedJackpots*3;
    }
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
    if (allowedJackpots>0){
        stopNumJackpot=true;
        let userStoppedIndex=parseInt(`${document.getElementById("num-hundreds").innerHTML}${document.getElementById("num-tens").innerHTML}${document.getElementById("num-ones").innerHTML}`);
        console.log(userStoppedIndex);
        let actualJackpotNumber=randomNumberArray[0]*100+randomNumberArray[1]*10+randomNumberArray[2];
        console.log(actualJackpotNumber)
        if (userStoppedIndex>=Math.floor(actualJackpotNumber-(actualJackpotNumber*0.05))&&userStoppedIndex<=Math.floor(actualJackpotNumber+(actualJackpotNumber*0.05))){
            document.getElementById("numberJackpot-returnMessage").innerHTML="Congratulations! You won the 3<sup>rd</sup> prize, which is $2!";
            if (userStoppedIndex==actualJackpotNumber-1||userStoppedIndex==actualJackpotNumber+1){
                document.getElementById("numberJackpot-returnMessage").innerHTML="Congratulations! You won the 2<sup>nd</sup> prize, which is $5!";
            }
            if (userStoppedIndex==actualJackpotNumber){
                document.getElementById("numberJackpot-returnMessage").innerHTML="Congratulations! You won the 1<sup>st</sup> prize, which is $10!";
            }
            allowedJackpots--;
        }
        else{
            document.getElementById("numberJackpot-returnMessage").innerHTML="Unfortunately, you did not win any prizes.";
        }
    }
    else{
        if (userStoppedIndex>=Math.floor(actualJackpotNumber-(actualJackpotNumber*0.05))&&userStoppedIndex<=Math.floor(actualJackpotNumber+(actualJackpotNumber*0.05))){
            let secondarytimeoutRandomNumber=Math.random()*91;
            let timeoutNumber=(Math.random()*secondarytimeoutRandomNumber)+10;
            for (let i=1;i<=5;i++){
                setTimeout(function(){
                    document.getElementById("num-ones").innerHTML=parseInt(document.getElementById("num-ones").innerHTML)+1;
                },timeoutNumber);
                if (parseInt(document.getElementById("num-ones").innerHTML)==10){
                    document.getElementById("num-tens").innerHTML=parseInt(document.getElementById("num-tens").innerHTML)+1;
                    document.getElementById("num-ones").innerHTML=parseInt(document.getElementById("num-ones").innerHTML)-10;4
                    if 
                }
            }
        }
        document.getElementById("numberJackpot-returnMessage").innerHTML="Unfortunately, you did not win any prizes.";
    }
    console.log("allowed jackpots: "+allowedJackpots)
    setTimeout(numberJackpot,1000);
});
stopNumberGroup.addEventListener("mouseover",function(){
    stopNumberGroup.style.fontSize="1.2rem";
});
stopNumberGroup.addEventListener("mouseout",function(){
    stopNumberGroup.style.fontSize="1rem";
});
function ballJackpot(){

};
function numberJackpot(){
    stopNumJackpot=false;
    document.getElementById("numberJackpot").style.display="block";
    document.getElementById("ballJackpot").style.display="none";
    document.getElementById("numberJackpot-returnMessage").innerHTML="";
    for (let i=0;i<3;i++){
        let randomNumber=Math.floor(Math.random()*10);
        randomNumberArray[i]=randomNumber;
    }
    document.getElementById("numberJackpot-randomNum").textContent=`${randomNumberArray[0]}${randomNumberArray[1]}${randomNumberArray[2]}`;
    iterateNumberIndex=randomNumberArray[0]*100;
    iterateNumber();
};
function iterateNumber(){
    if (stopNumJackpot==false){
        let actualJackpotNumber=document.getElementById("numberJackpot-randomNum").innerHTML;
        if (iterateNumberIndex==(parseInt(actualJackpotNumber[0])*100)+99){
            iterateNumberIndex=parseInt(actualJackpotNumber[0])*100;
        }
        let iterateStringIndex=iterateNumberIndex.toString().padStart(3,"0");
        document.getElementById("num-hundreds").textContent=iterateStringIndex[0];
        document.getElementById("num-tens").textContent=iterateStringIndex[1];
        document.getElementById("num-ones").textContent=iterateStringIndex[2];
        iterateNumberIndex++;
        let secondarytimeoutRandomNumber=Math.random()*91;
        let timeoutNumber=(Math.random()*secondarytimeoutRandomNumber)+10;
        console.log(timeoutNumber);
        setTimeout(iterateNumber,timeoutNumber);
    }
};