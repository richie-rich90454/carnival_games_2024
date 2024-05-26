let fareVersion=document.getElementById("fareVersion");
let packetVersion=document.getElementById("packetVersion");
let jackpotVersion=document.getElementById("jackpotVersion");
let stopNumberGroup=document.getElementById("stopNumberGroup");
let replayGame=document.getElementById("replay");
let charNumber=document.getElementById("notslotJackpot-charNumber");
let genNotSlotBtn=document.getElementById("notslotJackpot-genNotSlot");
let startNotSlotGameBtn=document.getElementById("startNotSlotGame");
let stopNotSlotBtn=document.getElementById("stopNotSlot");
let notSlotCharArray=[];
let charNumberValue;
let fareVersionValue=0;
let packetVersionValue=0;
let stopNumJackpot=false;
let stopNotSlotJackpot=false;
let iterateNumberIndex=1;
let randomNumberArray=[];
let prizesArray=[];
let allowedJackpots;
let shiftingInterval;
$(document).ready(function(){
    setInterval(function(){
        $("#main-div").css("box-shadow",`6px 6px 6px 6px rgba(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, .45)`);
    },500);
});
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
    if (packetVersionValue==6){
        allowedJackpots=allowedJackpots*1;
    }
    else if (packetVersionValue==11){
        allowedJackpots=allowedJackpots*1;
    }
    else{
        allowedJackpots=allowedJackpots*2;
    }
    packetVersion.style.display="none";
    jackpotVersion.style.display="block";
});
jackpotVersion.addEventListener("change",function(){
    if (jackpotVersion.options[jackpotVersion.selectedIndex].value=="notslot"){
        document.getElementById("numberJackpot").style.display="none";
        document.getElementById("notslotJackpot").style.display="block";
    }
    else{
        numberJackpot();
    }
});
stopNumberGroup.addEventListener("click",function(){
    stopNumJackpot=true;
    stopNumberGroup.disabled=true;
    numberprizeOutcome();
});
replayGame.addEventListener("click",function(){
    // document.getElementById("gameOver").style.display="none";
    // document.getElementById("fareVersion").style.display="block";
    // fareVersion.selectedIndex=0;
    // packetVersion.selectedIndex=0;
    // jackpotVersion.selectedIndex=0;
    location.reload();
});
charNumber.addEventListener("keyup",function(event){
    if (event.key==="Enter"&&charNumber.value!=""){
        charNumberValue=charNumber.valueAsNumber;
        genNotSlotGroup();
        charNumber.style.display="none";
    }
});
genNotSlotBtn.addEventListener("click",function(){
    let ischarBlank=false;
    notSlotCharArray=[];
    let repeatingChars=0;
    for (let i=1;i<=charNumberValue;i++){
        let charEntryValue=document.getElementById(`charEntry${i}`).value
        if (charEntryValue==""){
            ischarBlank=true;
            break;
        }
        let isSameChar=false;
        notSlotCharArray.forEach(function(char){
            if (char==charEntryValue){
                isSameChar=true;
                repeatingChars++;
            }
        });
        if (isSameChar==false){
            notSlotCharArray[i-1]=charEntryValue;
        }
    }
    if (ischarBlank==false&&charNumberValue-repeatingChars>=3){
        charNumber.value="";
        createSlotCombinations();
    }
});
startNotSlotGameBtn.addEventListener("click",function(){
    genNotSlotGame();
});
stopNotSlotBtn.addEventListener("click",function(){
    stopNotSlotBtn.disabled=true;
    notSlotPrizeOutcomes();
})
function numberJackpot(){
    stopNumJackpot=false;
    stopNumberGroup.disabled=false;
    document.getElementById("numberJackpot").style.display="block";
    document.getElementById("notslotJackpot").style.display="none";
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
        setTimeout(iterateNumber,timeoutNumber);
    }
}
function numberprizeOutcome(){
    if (allowedJackpots>0){
        let userStoppedIndex=parseInt(`${document.getElementById("num-hundreds").innerHTML}${document.getElementById("num-tens").innerHTML}${document.getElementById("num-ones").innerHTML}`);
        let actualJackpotNumber=randomNumberArray[0]*100+randomNumberArray[1]*10+randomNumberArray[2];
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
            if (packetVersionValue==1){
                endGame();
            }            
        }
        else if (actualJackpotNumber>=200){
            if (userStoppedIndex>=Math.floor(actualJackpotNumber-(actualJackpotNumber*0.01))&&userStoppedIndex<=Math.floor(actualJackpotNumber+(actualJackpotNumber*0.01))){
                document.getElementById("numberJackpot-returnMessage").innerHTML="Congratulations! You won the 3<sup>rd</sup> prize, which is $2!";
                prizesArray.push("3");
                allowedJackpots--;
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
            }
            else{
                document.getElementById("numberJackpot-returnMessage").innerHTML="Unfortunately, you did not win any prizes.";
            }
            if (packetVersionValue==1){
                endGame();
            }
        }
        setTimeout(numberJackpot,1000);
        packetVersionValue--;
    }
    else{
        let userStoppedIndex=parseInt(`${document.getElementById("num-hundreds").innerHTML}${document.getElementById("num-tens").innerHTML}${document.getElementById("num-ones").innerHTML}`);
        let actualJackpotNumber=randomNumberArray[0]*100+randomNumberArray[1]*10+randomNumberArray[2];
        let timeoutNumber=Math.random*(Math.random()*91)+10;
        shiftingInterval=setInterval(function(){
            if (userStoppedIndex<Math.floor(actualJackpotNumber-(actualJackpotNumber*0.01))||userStoppedIndex>Math.floor(actualJackpotNumber+actualJackpotNumber*0.01)){
                clearInterval(shiftingInterval);
                document.getElementById("numberJackpot-returnMessage").innerHTML="Unfortunately, you did not win any prizes.";
                if (packetVersionValue>1){
                    setTimeout(numberJackpot,1000);
                }
                if (packetVersionValue==1){
                    setTimeout(endGame,500);
                    return;
                }
            }
            userStoppedIndex=parseInt(`${document.getElementById("num-hundreds").innerHTML}${document.getElementById("num-tens").innerHTML}${document.getElementById("num-ones").innerHTML}`);
            let numOnes=parseInt(document.getElementById("num-ones").innerHTML);
            let numTens=parseInt(document.getElementById("num-tens").innerHTML);
            let numHundreds=parseInt(document.getElementById("num-hundreds").innerHTML);
            numOnes++;
            if (numOnes>=10){
                numTens++;
                numOnes=numOnes-10;
                if (numTens>=10){
                    numHundreds++;
                    numTens=numTens-10;
                    if (numHundreds>=10){
                        document.getElementById("num-ones").innerHTML=0;
                        document.getElementById("num-tens").innerHTML=0;
                        document.getElementById("num-hundreds").innerHTML=randomNumberArray[0];
                    }
                }
            }
            document.getElementById("num-ones").innerHTML=numOnes;
            document.getElementById("num-tens").innerHTML=numTens;
            document.getElementById("num-hundreds").innerHTML=numHundreds;
        },timeoutNumber);
        packetVersionValue--;
    }
}
function genNotSlotGroup(){
    let charEntryContainer=document.getElementById("notslotcharGroup");
    charNumberValue=Math.floor(charNumberValue);
    if (charNumberValue<=4){
        charNumberValue=4;
    }
    else if (charNumberValue>=5){
        charNumberValue=5;
    }
    for (let i=charNumberValue;i>=1;i--){
        let charEntry=document.createElement("input");
        charEntry.id=`charEntry${i}`;
        charEntry.placeholder=`Enter character ${i} here`
        charEntry.classList.add("charEnteryClass");
        charEntry.maxLength=1;
        $(charEntry).hide().prependTo(charEntryContainer).fadeIn(1000);
        if (i==1){
            $(genNotSlotBtn).hide().fadeIn(1000);
        }
    }
}
function createSlotCombinations(){
    notSlotCharArray=notSlotCharArray.filter(function(char){
        return char!=undefined;
    });
    let SpecificWinningGroups=document.getElementById("notSlotPrizeNoticeGroup-list");
    let FirstPrizeGroup="1<sup>st</sup> prize combinations are: ";
    let ThirdPrizeGroup=`3<sup>rd</sup> prize combinations are the combinations mentioned above with 1 less same character. Such as ${notSlotCharArray[0]}|${notSlotCharArray[0]}|${notSlotCharArray[0]}|${notSlotCharArray[1]}`;
    for (let i=0;i<notSlotCharArray.length;i++){
        FirstPrizeGroup+=`${notSlotCharArray[i]}|${notSlotCharArray[i]}|${notSlotCharArray[i]}|${notSlotCharArray[i]} `;
    }
    $("<li>").html(FirstPrizeGroup).hide().appendTo(SpecificWinningGroups).fadeIn(1000);
    $("<li>").html(ThirdPrizeGroup).hide().appendTo(SpecificWinningGroups).fadeIn(1000);
    document.getElementById("notslotcharGroup").style.display="none";
    document.getElementById("notSlotPrizeNoticeGroup").style.display="block";
}
function genNotSlotGame(){
    stopNotSlotBtn.disabled=false;
    document.getElementById("notslotJackpot-returnMessage").innerHTML="";
    stopNotSlotJackpot=false;
    document.getElementById("slotGroup").style.display="block";
    document.getElementById("notSlotPrizeNoticeGroup").style.display="none";
    document.getElementById("counter1").innerHTML=notSlotCharArray[Math.floor(Math.random()*notSlotCharArray.length)];
    document.getElementById("counter2").innerHTML=notSlotCharArray[Math.floor(Math.random()*notSlotCharArray.length)];
    document.getElementById("counter3").innerHTML=notSlotCharArray[Math.floor(Math.random()*notSlotCharArray.length)];
    document.getElementById("counter4").innerHTML=notSlotCharArray[Math.floor(Math.random()*notSlotCharArray.length)];
    if (allowedJackpots>0){
        shuffleNormalNotSlot();
    }
    else{
        shuffleNoJackpotNotSlot();
    }
}
function shuffleNormalNotSlot(){
    if (stopNotSlotJackpot==false){
        document.getElementById("counter1").innerHTML=notSlotCharArray[Math.floor(Math.random()*notSlotCharArray.length)];
        document.getElementById("counter2").innerHTML=notSlotCharArray[Math.floor(Math.random()*notSlotCharArray.length)];
        document.getElementById("counter3").innerHTML=notSlotCharArray[Math.floor(Math.random()*notSlotCharArray.length)];
        document.getElementById("counter4").innerHTML=notSlotCharArray[Math.floor(Math.random()*notSlotCharArray.length)];
        setTimeout(shuffleNormalNotSlot,200);
    }
}
function shuffleNoJackpotNotSlot(){
    if (stopNotSlotJackpot==false){
        let appearedChars=[];
        let shuffledChar1=notSlotCharArray[Math.floor(Math.random()*notSlotCharArray.length)];
        appearedChars.push(shuffledChar1);
        let shuffledChar2=notSlotCharArray[Math.floor(Math.random()*notSlotCharArray.length)];
        while (appearedChars.includes(shuffledChar2)==true){
            shuffledChar2=notSlotCharArray[Math.floor(Math.random()*notSlotCharArray.length)];
        }
        appearedChars.push(shuffledChar2);
        let shuffledChar3=notSlotCharArray[Math.floor(Math.random()*notSlotCharArray.length)];
        while (appearedChars.includes(shuffledChar3)==true){
            shuffledChar3=notSlotCharArray[Math.floor(Math.random()*notSlotCharArray.length)];
        }
        appearedChars.push(shuffledChar3);
        let shuffledChar4=notSlotCharArray[Math.floor(Math.random()*notSlotCharArray.length)];
        while (appearedChars.includes(shuffledChar4)==true){
            shuffledChar4=notSlotCharArray[Math.floor(Math.random()*notSlotCharArray.length)];
        }
        appearedChars.push(shuffledChar4);
        document.getElementById("counter1").innerHTML=shuffledChar1;
        document.getElementById("counter2").innerHTML=shuffledChar2;
        document.getElementById("counter3").innerHTML=shuffledChar3;
        document.getElementById("counter4").innerHTML=shuffledChar4;
        setTimeout(shuffleNoJackpotNotSlot,200);
    }
}
function notSlotPrizeOutcomes(){
    stopNotSlotJackpot=true;
    if (packetVersionValue>1){
        packetVersionValue--;
        if (allowedJackpots>0){
            let userStoppedCounter=`${document.getElementById("counter1").innerHTML}${document.getElementById("counter2").innerHTML}${document.getElementById("counter3").innerHTML}${document.getElementById("counter4").innerHTML}`;
            let userStoppedCounterArray=userStoppedCounter.split("");
            let sameChars=0;
            for (let i=0;i<notSlotCharArray.length;i++){
                let char=notSlotCharArray[i];
                let charCount=0;
                for (let j=0;j<userStoppedCounterArray.length;j++){
                    if (char==userStoppedCounterArray[j]){
                        charCount++;
                    }
                }
                if (charCount>sameChars){
                    sameChars=charCount;
                }
            }
            console.log(sameChars);
            if (sameChars==4){
                document.getElementById("notslotJackpot-returnMessage").innerHTML="Congratulations! You won the 1<sup>st</sup> prize, which is $10!";
                prizesArray.push("1");
                allowedJackpots--;
            }
            else if (sameChars==3){
                document.getElementById("notslotJackpot-returnMessage").innerHTML="Congratulations! You won the 2<sup>nd</sup> prize, which is $5!";
                prizesArray.push("2");
                allowedJackpots--;
            }
            else if (sameChars==2){
                document.getElementById("notslotJackpot-returnMessage").innerHTML="Congratulations! You won the 3<sup>rd</sup> prize, which is $2!";
                prizesArray.push("3");
                allowedJackpots--;
            }
            else{
                document.getElementById("notslotJackpot-returnMessage").innerHTML="Unfortunately, you did not win any prizes.";
            }
        }
        else{
            let appearedChars=[];
            let shuffledChar1=notSlotCharArray[Math.floor(Math.random()*notSlotCharArray.length)];
            appearedChars.push(shuffledChar1);
            let shuffledChar2=notSlotCharArray[Math.floor(Math.random()*notSlotCharArray.length)];
            while (appearedChars.includes(shuffledChar2)==true){
                shuffledChar2=notSlotCharArray[Math.floor(Math.random()*notSlotCharArray.length)];
            }
            appearedChars.push(shuffledChar2);
            let shuffledChar3=notSlotCharArray[Math.floor(Math.random()*notSlotCharArray.length)];
            while (appearedChars.includes(shuffledChar3)==true){
                shuffledChar3=notSlotCharArray[Math.floor(Math.random()*notSlotCharArray.length)];
            }
            appearedChars.push(shuffledChar3);
            let shuffledChar4=notSlotCharArray[Math.floor(Math.random()*notSlotCharArray.length)];
            while (appearedChars.includes(shuffledChar4)==true){
                shuffledChar4=notSlotCharArray[Math.floor(Math.random()*notSlotCharArray.length)];
            }
            appearedChars.push(shuffledChar4);
            document.getElementById("counter1").innerHTML=shuffledChar1;
            document.getElementById("counter2").innerHTML=shuffledChar2;
            document.getElementById("counter3").innerHTML=shuffledChar3;
            document.getElementById("counter4").innerHTML=shuffledChar4;
            document.getElementById("notslotJackpot-returnMessage").innerHTML="Unfortunately, you did not win any prizes.";
        }
        setTimeout(genNotSlotGame,1000);
    }
    else{
        setTimeout(endGame,1000);
    }
}
function endGame(){
    clearInterval(shiftingInterval);
    document.getElementById("jackpotVersion").disabled=true;
    setTimeout(function(){
        document.getElementById("prizes").innerHTML="";
        document.getElementById("numberJackpot").style.display="none";
        document.getElementById("notslotJackpot").style.display="none";
        document.getElementById("packetVersion").style.display="none";
        document.getElementById("jackpotVersion").style.display="none";
        document.getElementById("gameOver").style.display="block";
        document.getElementById("jackpotVersion").disabled=false;
        let firstCounter=0;
        let secondCounter=0;
        let thirdCounter=0;
        let totalCounter=0;
        prizesArray.forEach(function(prize){
            switch(prize){
                case "3":
                    thirdCounter++;
                    totalCounter=totalCounter+2;
                    break;
                case "2":
                    secondCounter++;
                    totalCounter=totalCounter+5;
                    break;
                case "1":
                    firstCounter++;
                    totalCounter=totalCounter+10;
                    break;
                default:
                    break;
            }
        });
        prizesArray=[];
        if (firstCounter!=0||secondCounter!=0||thirdCounter!=0){
            document.getElementById("prizes").style.display="block";
            document.getElementById("you-won").style.display="block";
            document.getElementById("no-prize-return").style.display="none";
            if (firstCounter!=0){
                let firstPrizeItem=$("<li>").html(`${firstCounter}x1<sup>st</sup> (${firstCounter*10} tokens in total)`).hide().appendTo("#prizes").fadeIn(1000);
            }
            if (secondCounter!=0){
                let secondPrizeItem=$("<li>").html(`${secondCounter}x2<sup>nd</sup> (${secondCounter*5} tokens in total)`).hide().appendTo("#prizes").fadeIn(1000);
            }
            if (thirdCounter!=0){
                let thirdPrizeItem=$("<li>").html(`${thirdCounter}x3<sup>rd</sup> (${thirdCounter*2} tokens in total)`).hide().appendTo("#prizes").fadeIn(1000);
            }
            document.getElementById("totalPrizes").style.display="none";
            document.getElementById("play-end-audio").play();
            document.getElementById("totalPrizes").innerHTML=`The total amount of tokens you gained is ${totalCounter}`;
                setTimeout(function(){$("#totalPrizes").fadeIn(1000)
            },1000);
        }
        else{
            document.getElementById("you-won").style.display="none";
            document.getElementById("prizes").style.display="none";
            document.getElementById("totalPrizes").style.display="none";
            document.getElementById("no-prize-return").innerHTML="Unfortunately, you did not win any prizes.";
        }
    },1000);
}