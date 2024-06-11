let fareVersion=document.getElementById("fareVersion");
let packetVersion=document.getElementById("packetVersion");
let jackpotVersion=document.getElementById("jackpotVersion");
let stopNumberGroup=document.getElementById("stopNumberGroup");
let replayGame=document.getElementById("replay");
let charNumber=document.getElementById("notslotJackpot-charNumber");
let genNotSlotBtn=document.getElementById("notslotJackpot-genNotSlot");
let startNotSlotGameBtn=document.getElementById("startNotSlotGame");
let stopNotSlotBtn=document.getElementById("stopNotSlot");
let selectNotSlotMode=document.getElementById("selectNotSlotMode");
let resetNotSlot=document.getElementById("resetNotSlot");
let speechSynth=window.speechSynthesis;
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
        $("#main-div").css("box-shadow",`6px 6px 6px 6px rgba(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, .4)`);
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
    document.getElementById("play-stop-audio").play();
    stopNumJackpot=true;
    stopNumberGroup.disabled=true;
    numberprizeOutcome();
});
replayGame.addEventListener("click",function(){
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
    document.getElementById("notSlotCharGroup-errorMsg").style.display="none";
    let ischarBlank=false;
    notSlotCharArray=[];
    let repeatingChars=0;
    for (let i=1;i<=charNumberValue;i++){
        let charEntryValue=document.getElementById(`charEntry${i}`).value.trim();
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
    if (ischarBlank==false&&charNumberValue-repeatingChars>=4){
        charNumber.value="";
        createSlotCombinations();
    }
    else{
        document.getElementById("notSlotCharGroup-errorMsg").style.display="block";
    }
});
startNotSlotGameBtn.addEventListener("click",function(){
    document.getElementById("notslotJackpot-simpleMode").style.display="none";
    genNotSlotGame();
});
stopNotSlotBtn.addEventListener("click",function(){
    stopNotSlotBtn.disabled=true;
    resetNotSlot.disabled=true;
    document.getElementById("play-stop-audio").play();
    notSlotPrizeOutcomes();
});
selectNotSlotMode.addEventListener("change",function(){
    selectNotSlotMode.style.display="none";
    if (selectNotSlotMode.options[selectNotSlotMode.selectedIndex].value=="custom"){
        document.getElementById("notslotJackpot-charNumber").style.display="block";
        document.getElementById("notslotJackpot-customMode").style.display="block";
        document.getElementById("notslotJackpot-simpleMode").style.display="none";
    }
    else{
        notSlotCharArray=["🍕","🍔","🍟","🌭"];
        document.getElementById("notslotJackpot-customMode").style.display="none";
        document.getElementById("notslotJackpot-simpleMode").style.display="block";
        startNotSlotGameBtn.style.display="block";
    }
});
resetNotSlot.addEventListener("click",resetNotSlotGame);
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
    let userStoppedIndex=parseInt(`${document.getElementById("num-hundreds").innerHTML}${document.getElementById("num-tens").innerHTML}${document.getElementById("num-ones").innerHTML}`);
    if (allowedJackpots>0){
        let actualJackpotNumber=randomNumberArray[0]*100+randomNumberArray[1]*10+randomNumberArray[2];
        if (actualJackpotNumber<200){
            if (userStoppedIndex==actualJackpotNumber-1||userStoppedIndex==actualJackpotNumber+1){
                document.getElementById("numberJackpot-returnMessage").innerHTML=`Congratulations! You won the 2<sup>nd</sup> prize, which is $5! As ${userStoppedIndex} is ±1 of ${actualJackpotNumber}.`;
                prizesArray.pop();
                prizesArray.push("2");
                allowedJackpots--;
            }
            else if (userStoppedIndex==actualJackpotNumber){
                document.getElementById("numberJackpot-returnMessage").innerHTML=`Congratulations! You won the 1<sup>st</sup> prize, which is $10! As you stopped successfully on ${actualJackpotNumber}!`;
                prizesArray.pop();
                prizesArray.push("1");
                allowedJackpots--;
            }
            else{
                document.getElementById("numberJackpot-returnMessage").innerHTML="Nothing!";
            }
            if (packetVersionValue==1){
                endGame();
            }            
        }
        else if (actualJackpotNumber>=200){
            if (userStoppedIndex>=Math.floor(actualJackpotNumber-(actualJackpotNumber*0.01))&&userStoppedIndex<=Math.floor(actualJackpotNumber+(actualJackpotNumber*0.01))){
                document.getElementById("numberJackpot-returnMessage").innerHTML=`Congratulations! You won the 3<sup>rd</sup> prize, which is $2! As ${userStoppedIndex} is in the 1% threshold range of ${actualJackpotNumber} (${actualJackpotNumber}±${Math.floor(actualJackpotNumber*0.01)}).`;
                prizesArray.push("3");
                allowedJackpots--;
                if (userStoppedIndex==actualJackpotNumber-1||userStoppedIndex==actualJackpotNumber+1){
                    document.getElementById("numberJackpot-returnMessage").innerHTML=`Congratulations! You won the 2<sup>nd</sup> prize, which is $5! As ${userStoppedIndex} is ±1 of ${actualJackpotNumber}.`;
                    prizesArray.pop();
                    prizesArray.push("2");
                }
                else if (userStoppedIndex==actualJackpotNumber){
                    document.getElementById("numberJackpot-returnMessage").innerHTML=`Congratulations! You won the 1<sup>st</sup> prize, which is $10! As you stopped successfully on ${actualJackpotNumber}!`;
                    prizesArray.pop();
                    prizesArray.push("1");
                }
            }
            else{
                document.getElementById("numberJackpot-returnMessage").innerHTML="Nothing!";
            }
            if (packetVersionValue==1){
                endGame();
            }
        }
        setTimeout(numberJackpot,2000);
        packetVersionValue--;
    }
    else{
        let actualJackpotNumber=randomNumberArray[0]*100+randomNumberArray[1]*10+randomNumberArray[2];
        let timeoutNumber=Math.random*(Math.random()*111)+50;
        let numOnes=parseInt(document.getElementById("num-ones").innerHTML);
        let numTens=parseInt(document.getElementById("num-tens").innerHTML);
        let numHundreds=parseInt(document.getElementById("num-hundreds").innerHTML);
        shiftingInterval=setInterval(function(){
            if (userStoppedIndex<Math.floor(actualJackpotNumber-(actualJackpotNumber*0.01))||userStoppedIndex>Math.floor(actualJackpotNumber+actualJackpotNumber*0.01)){
                clearInterval(shiftingInterval);
                document.getElementById("numberJackpot-returnMessage").innerHTML="Nothing!";
                if (packetVersionValue>1){
                    setTimeout(numberJackpot,2000);
                }
                if (packetVersionValue==1){
                    setTimeout(endGame,500);
                    return;
                }
            }
            userStoppedIndex=parseInt(`${document.getElementById("num-hundreds").innerHTML}${document.getElementById("num-tens").innerHTML}${document.getElementById("num-ones").innerHTML}`);
            numOnes=parseInt(document.getElementById("num-ones").innerHTML);
            numTens=parseInt(document.getElementById("num-tens").innerHTML);
            numHundreds=parseInt(document.getElementById("num-hundreds").innerHTML);
            numOnes++;
            if (numOnes>=10){
                numTens++;
                numOnes=numOnes-10;
                if (numTens>=10){
                    numHundreds=randomNumberArray[0];
                    numTens=numTens-10;
                }
            }
            document.getElementById("num-ones").innerHTML=numOnes;
            document.getElementById("num-tens").innerHTML=numTens;
            document.getElementById("num-hundreds").innerHTML=numHundreds;
        },timeoutNumber);
        packetVersionValue--;
    }
    setTimeout(function(){
        let speech=new SpeechSynthesisUtterance(`${document.getElementById("num-hundreds").innerHTML}${document.getElementById("num-tens").innerHTML}${document.getElementById("num-ones").innerHTML}`);
        speech.rate=4;
        speech.lang="en";
        speechSynth.speak(speech);
    },500);
}
function genNotSlotGroup(){
    document.getElementById("notSlotCharGroup").style.display="block";
    let charEntryContainer=document.getElementById("notSlotChars");
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
    SpecificWinningGroups.innerHTML="";
    let FirstPrizeGroup="1<sup>st</sup> prize: ";
    let secondPrizeGroup=`2<sup>nd</sup> prize: three repititions, such as ${notSlotCharArray[0]}|${notSlotCharArray[2]}|${notSlotCharArray[0]}|${notSlotCharArray[0]}`;
    let ThirdPrizeGroup=`3<sup>rd</sup> prize: two repititions, such as ${notSlotCharArray[1]}|${notSlotCharArray[0]}|${notSlotCharArray[1]}|${notSlotCharArray[3]}`;
    for (let i=0;i<notSlotCharArray.length;i++){
        FirstPrizeGroup+=`${notSlotCharArray[i]}|${notSlotCharArray[i]}|${notSlotCharArray[i]}|${notSlotCharArray[i]} `;
    }
    $("<li>").html(FirstPrizeGroup).hide().appendTo(SpecificWinningGroups).fadeIn(1000);
    $("<li>").html(secondPrizeGroup).hide().appendTo(SpecificWinningGroups).fadeIn(1000);
    $("<li>").html(ThirdPrizeGroup).hide().appendTo(SpecificWinningGroups).fadeIn(1000);
    document.getElementById("notSlotCharGroup").style.display="none";
    document.getElementById("notSlotPrizeNoticeGroup").style.display="block";
    startNotSlotGameBtn.style.display="block";
}
function genNotSlotGame(){
    startNotSlotGameBtn.style.display="none";
    stopNotSlotBtn.disabled=false;
    resetNotSlot.disabled=false;
    document.getElementById("notslotJackpot-returnMessage").innerHTML="";
    stopNotSlotJackpot=false;
    resetNotSlot.style.display="block";
    document.getElementById("slotGroup").style.display="block";
    document.getElementById("notSlotPrizeNoticeGroup").style.display="none";
    document.getElementById("counter1").innerHTML=notSlotCharArray[Math.floor(Math.random()*notSlotCharArray.length)];
    document.getElementById("counter2").innerHTML=notSlotCharArray[Math.floor(Math.random()*notSlotCharArray.length)];
    document.getElementById("counter3").innerHTML=notSlotCharArray[Math.floor(Math.random()*notSlotCharArray.length)];
    document.getElementById("counter4").innerHTML=notSlotCharArray[Math.floor(Math.random()*notSlotCharArray.length)];
    shuffleNotSlot();
}
function shuffleNotSlot(){
    if (stopNotSlotJackpot==false){
        document.getElementById("counter1").innerHTML=notSlotCharArray[Math.floor(Math.random()*notSlotCharArray.length)];
        document.getElementById("counter2").innerHTML=notSlotCharArray[Math.floor(Math.random()*notSlotCharArray.length)];
        document.getElementById("counter3").innerHTML=notSlotCharArray[Math.floor(Math.random()*notSlotCharArray.length)];
        document.getElementById("counter4").innerHTML=notSlotCharArray[Math.floor(Math.random()*notSlotCharArray.length)];
        setTimeout(shuffleNotSlot,400);
    }
}
function notSlotPrizeOutcomes(){
    stopNotSlotJackpot=true;
    if (allowedJackpots>0){
        packetVersionValue--;
        let userStoppedCounterArray=[]
        for (let i=0;i<4;i++){
            userStoppedCounterArray[i]=document.getElementById(`counter${i+1}`).innerHTML;
        }
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
            document.getElementById("notslotJackpot-returnMessage").innerHTML="Nothing";
        }
        if (packetVersionValue==1){
            setTimeout(endGame,1000);
            return;
        }   
    }
    else{
        packetVersionValue--;
        setTimeout(function(){
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
            document.getElementById("notslotJackpot-returnMessage").innerHTML="Nothing!";
        },50);
        if (packetVersionValue==1){
            setTimeout(function(){
                let speech=new SpeechSynthesisUtterance(`${document.getElementById("counter1").innerHTML}${document.getElementById("counter2").innerHTML}${document.getElementById("counter3").innerHTML}${document.getElementById("counter4").innerHTML}`);
                speech.rate=4;
                speech.lang="en";
                speechSynth.speak(speech);
            },500);
            setTimeout(endGame,1000);
            return;
        }   
    }
    setTimeout(genNotSlotGame,1000);
    setTimeout(function(){
        let speech=new SpeechSynthesisUtterance(`${document.getElementById("counter1").innerHTML}${document.getElementById("counter2").innerHTML}${document.getElementById("counter3").innerHTML}${document.getElementById("counter4").innerHTML}`);
        speech.rate=4;
        speech.lang="en";
        speechSynth.speak(speech);
    },500);
}
function resetNotSlotGame(){
    notSlotCharArray=[];
    stopNotSlotJackpot=true;
    document.getElementById("slotGroup").style.display="none";
    document.getElementById("resetNotSlot").style.display="none";
    document.getElementById("notSlotChars").innerHTML="";
    selectNotSlotMode.style.display="block";
    selectNotSlotMode.selectedIndex=0;
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
            let candy=Math.floor(totalCounter/5);
            if (candy==1){
                candy="You get 1 candy!";
            }
            else if (candy==0){
                candy="Unfortunatly, you did not get any candy (5 tokens=1 candy)."
            }
            else if (candy>1){
                candy=`You get ${Math.floor(totalCounter/5)} candies!`;
            }
            document.getElementById("totalPrizes").innerHTML=`The total amount of tokens you gained is ${totalCounter}. ${candy}`;
            setTimeout(function(){
                $("#totalPrizes").fadeIn(1000);
                let speech=new SpeechSynthesisUtterance(`The total amount of tokens you gained is ${totalCounter}`);
                speech.rate=1;
                speech.lang="en";
                speechSynth.speak(speech);
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