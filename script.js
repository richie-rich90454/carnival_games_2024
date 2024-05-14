let fareVersion=document.getElementById("fareVersion");
let packetVersion=document.getElementById("packetVersion");
let jackpotVersion=document.getElementById("jackpotVersion");
let stopNumberGroup=document.getElementById("stopNumberGroup");
let fareVersionValue=0;
let packetVersionValue=0;
let stopNumJackpot=false;
let iterateNumberIndex=1;
let randomNumberArray=[];
let prizesArray=[];
let allowedJackpots;
let shiftingInterval;
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
    packetVersionValue++;
    if (packetVersionValue==5){
        allowedJackpots=allowedJackpots*1;
    }
    else if (packetVersionValue==10){
        allowedJackpots=allowedJackpots*1;
    }
    else{
        allowedJackpots=allowedJackpots*2;
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
    packetVersionValue--;
    if (packetVersionValue>0){
        console.log("PVV",packetVersionValue);
        stopNumJackpot=true;
        if (allowedJackpots>0){
            let userStoppedIndex=parseInt(`${document.getElementById("num-hundreds").innerHTML}${document.getElementById("num-tens").innerHTML}${document.getElementById("num-ones").innerHTML}`);
            console.log(userStoppedIndex);
            let actualJackpotNumber=randomNumberArray[0]*100+randomNumberArray[1]*10+randomNumberArray[2];
            console.log(actualJackpotNumber);
            if (actualJackpotNumber<200){
                if (userStoppedIndex==actualJackpotNumber-1||userStoppedIndex==actualJackpotNumber+1){
                    document.getElementById("numberJackpot-returnMessage").innerHTML="Congratulations! You won the 2<sup>nd</sup> prize, which is $5!";
                    prizesArray.pop();
                    prizesArray.push("2");
                    allowedJackpots--;
                }
                else if (userStoppedIndex==actualJackpotNumber){
                    document.getElementById("numberJackpot-returnMessage").innerHTML="Congratulations! You won the 1<sup>st</sup> prize, which is $10!";
                    prizesArray.pop();
                    prizesArray.push("1");
                    allowedJackpots--;
                }
                else{
                    document.getElementById("numberJackpot-returnMessage").innerHTML="Unfortunately, you did not win any prizes.";
                }            
            }
            else if (actualJackpotNumber>=200){
                if (userStoppedIndex>=Math.floor(actualJackpotNumber-(actualJackpotNumber*0.01))&&userStoppedIndex<=Math.floor(actualJackpotNumber+(actualJackpotNumber*0.01))){
                    document.getElementById("numberJackpot-returnMessage").innerHTML="Congratulations! You won the 3<sup>rd</sup> prize, which is $2!";
                    prizesArray.push("3");
                    if (userStoppedIndex==actualJackpotNumber-1||userStoppedIndex==actualJackpotNumber+1){
                        document.getElementById("numberJackpot-returnMessage").innerHTML="Congratulations! You won the 2<sup>nd</sup> prize, which is $5!";
                        prizesArray.pop();
                        prizesArray.push("2");
                    }
                    else if (userStoppedIndex==actualJackpotNumber){
                        document.getElementById("numberJackpot-returnMessage").innerHTML="Congratulations! You won the 1<sup>st</sup> prize, which is $10!";
                        prizesArray.pop();
                        prizesArray.push("1");
                    }
                    allowedJackpots--;
                }
                else{
                    document.getElementById("numberJackpot-returnMessage").innerHTML="Unfortunately, you did not win any prizes.";
                }
            }
            setTimeout(numberJackpot,1000);
        }
        else{
            clearInterval(shiftingInterval);
            let userStoppedIndex=parseInt(`${document.getElementById("num-hundreds").innerHTML}${document.getElementById("num-tens").innerHTML}${document.getElementById("num-ones").innerHTML}`);
            let actualJackpotNumber=randomNumberArray[0]*100+randomNumberArray[1]*10+randomNumberArray[2];
            let secondarytimeoutRandomNumber=Math.random()*91;
            let timeoutNumber=(Math.random()*secondarytimeoutRandomNumber)+10;
            if (packetVersionValue==1){
                document.getElementById("num-tens").innerHTML=parseInt(document.getElementById("num-tens").innerHTML)+1;
                if (parseInt(document.getElementById("num-tens").innerHTML)>=10){
                    document.getElementById("num-hundreds").innerHTML=parseInt(document.getElementById("num-hundreds").innerHTML)+1;
                    document.getElementById("num-tens").innerHTML=parseInt(document.getElementById("num-tens").innerHTML)-10;
                    if (parseInt(document.getElementById("num-hundreds").innerHTML)+1){
                        document.getElementById("num-hundreds").innerHTML=0;
                        document.getElementById("num-tens").innerHTML=0;
                    }
                }
                document.getElementById("numberJackpot-returnMessage").innerHTML="Unfortunately, you did not win any prizes.";
                setTimeout(numberJackpot,1000);
            }
            else{
                shiftingInterval=setInterval(function(){
                    if (userStoppedIndex<Math.floor(actualJackpotNumber-(actualJackpotNumber*0.01))||userStoppedIndex>Math.floor(actualJackpotNumber+(actualJackpotNumber*0.01))){
                        clearInterval(shiftingInterval);
                        document.getElementById("numberJackpot-returnMessage").innerHTML="Unfortunately, you did not win any prizes.";
                        setTimeout(numberJackpot,1000);
                    }
                    userStoppedIndex=parseInt(`${document.getElementById("num-hundreds").innerHTML}${document.getElementById("num-tens").innerHTML}${document.getElementById("num-ones").innerHTML}`);
                    document.getElementById("num-ones").innerHTML=parseInt(document.getElementById("num-ones").innerHTML)+1;
                    if (parseInt(document.getElementById("num-ones").innerHTML)>=10){
                        document.getElementById("num-tens").innerHTML=parseInt(document.getElementById("num-tens").innerHTML)+1;
                        document.getElementById("num-ones").innerHTML=parseInt(document.getElementById("num-ones").innerHTML)-10;
                        if (parseInt(document.getElementById("num-tens").innerHTML)>=10){
                            document.getElementById("num-hundreds").innerHTML=parseInt(document.getElementById("num-hundreds").innerHTML)+1;
                            document.getElementById("num-tens").innerHTML=parseInt(document.getElementById("num-tens").innerHTML)-10;
                            if (parseInt(document.getElementById("num-hundreds").innerHTML)>=10){
                                document.getElementById("num-ones").innerHTML=randomNumberArray[0];
                                document.getElementById("num-tens").innerHTML=0;
                                document.getElementById("num-hundreds").innerHTML=0;
                            }
                        }
                        userStoppedIndex=parseInt(`${document.getElementById("num-hundreds").innerHTML}${document.getElementById("num-tens").innerHTML}${document.getElementById("num-ones").innerHTML}`);
                    }
                },timeoutNumber);
            }
        }
    }
    else if (packetVersionValue==0){
        clearInterval(shiftingInterval);
        setTimeout(function(){
            document.getElementById("prizes").innerHTML="";
            document.getElementById("numberJackpot").style.display="none";
            document.getElementById("packetVersion").style.display="none";
            document.getElementById("jackpotVersion").style.display="none";
            document.getElementById("gameOver").style.display="block";
            let firstCounter=0;
            let secondCounter=0;
            let thirdCounter=0;
            prizesArray.forEach(function(prize){
                switch(prize){
                    case "3":
                        thirdCounter++;
                        break;
                    case "2":
                        secondCounter++;
                        break;
                    case "1":
                        firstCounter++;
                        break;
                    default:
                        break;
                }
            });
            prizesArray=[];
            if (firstCounter!=0||secondCounter!=0||thirdCounter!=0){
                document.getElementById("prizes").style.display="block";
                document.getElementById("you-won").style.display="block";
                if (firstCounter!=0){
                    let firstPrizeItem=$("<li>").html(`${firstCounter}x1<sup>st</sup> (${firstCounter*10} tokens in total)`).hide().appendTo("#prizes").fadeIn(1000);
                }
                if (secondCounter!=0){
                    let secondPrizeItem=$("<li>").html(`${secondCounter}x2<sup>nd</sup> (${secondCounter*5} tokens in total)`).hide().appendTo("#prizes").fadeIn(1000);

                }
                if (thirdCounter!=0){
                    let thirdPrizeItem=$("<li>").html(`${thirdCounter}x3<sup>rd</sup> (${thirdCounter*2} tokens in total)`).hide().appendTo("#prizes").fadeIn(1000);

                }
            }
            else{
                document.getElementById("you-won").style.display="none";
                document.getElementById("prizes").style.display="none";
                document.getElementById("no-prize-return").innerHTML="Unfortunately, you did not win any prizes.";
            }
        },3000);
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
        // console.log(timeoutNumber);
        setTimeout(iterateNumber,timeoutNumber);
    }
};