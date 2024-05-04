let fareVersion=document.getElementById("fareVersion");
let packetVersion=document.getElementById("packetVersion");
let jackpotVersion=document.getElementById("jackpotVersion");
let stopNumberGroup=document.getElementById("stopNumberGroup");
let fareVersionValue=0;
let packetVersionValue=0;
let stopNumJackpot=false;
let iterateNumberIndex=1;
let randomNumberArray=[];
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
    let userStoppedIndex=parseInt(`${document.getElementById("num-hundreds").innerHTML}${document.getElementById("num-tens").innerHTML}${document.getElementById("num-ones").innerHTML}`);
    console.log(userStoppedIndex);
    let actualJackpotNumber=randomNumberArray[0]*100+randomNumberArray[1]*10+randomNumberArray[2];
    if (userStoppedIndex>=Math.floor(actualJackpotNumber-(actualJackpotNumber*0.05))&&userStoppedIndex<=Math.floor(actualJackpotNumber+(actualJackpotNumber*0.05))){
        document.getElementById("numberJackpot-returnMessage").innerHTML="Congratulations! You won the 3<sup>rd</sup> prize, which is $2!";
    }
    else if (userStoppedIndex==actualJackpotNumber-1||userStoppedIndex==actualJackpotNumber+1){
        document.getElementById("numberJackpot-returnMessage").innerHTML="Congratulations! You won the 2<sup>nd</sup> prize, which is $5!";
    }
    else if (userStoppedIndex==actualJackpotNumber){
        document.getElementById("numberJackpot-returnMessage").innerHTML="Congratulations! You won the 1<sup>st</sup> prize, which is $10!";
    }
    else{
        document.getElementById("numberJackpot-returnMessage").innerHTML="Unfortunately, you did not win any prizes.";
    }
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
        if (iterateNumberIndex==(parseInt(document.getElementById("numberJackpot-randomNum").innerHTML[0])*100)+99){
            iterateNumberIndex=parseInt(document.getElementById("numberJackpot-randomNum").innerHTML[0])*100;
        }
        let iterateStringIndex=iterateNumberIndex.toString().padStart(3,"0");
        document.getElementById("num-hundreds").textContent=iterateStringIndex[0];
        document.getElementById("num-tens").textContent=iterateStringIndex[1];
        document.getElementById("num-ones").textContent=iterateStringIndex[2];
        iterateNumberIndex++;
        let timeoutNumber=Math.floor(Math.random()*91)+10;
        console.log(timeoutNumber)
        setTimeout(iterateNumber,timeoutNumber);
    }
};