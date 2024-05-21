let fareVersion=document.getElementById("fareVersion");
let packetVersion=document.getElementById("packetVersion");
let jackpotVersion=document.getElementById("jackpotVersion");
let stopNumberGroup=document.getElementById("stopNumberGroup");
let stopWheel=document.getElementById("stopWheel");
let replayGame=document.getElementById("replay");
let spinWheel=document.getElementById("wheel");
let spinPointerContext=document.getElementById("pointer").getContext("2d");
let fareVersionValue=0;
let packetVersionValue=0;
let stopNumJackpot=false;
let iterateNumberIndex=1;
let randomNumberArray=[];
let prizesArray=[];
let allowedJackpots;
let shiftingInterval;
let stopWheelJackpot=false;
let spinChart;
let spinExecutionLog=0;
let spinInterval;
let wheelChart;
spinPointerContext.beginPath();
spinPointerContext.moveTo(0,25);
spinPointerContext.lineTo(25,50);
spinPointerContext.lineTo(25,0);
spinPointerContext.lineTo(0,25);
spinPointerContext.fillStyle="#000";
spinPointerContext.fill();
spinPointerContext.stroke();
const rotationValues=[
    {minDeg: 0, maxDeg: 60, value: "$10"},
    {minDeg: 61, maxDeg: 120, value: "Nothing"},
    {minDeg: 121, maxDeg: 180, value: "$5"},
    {minDeg: 181, maxDeg: 240, value: "Nothing"},
    {minDeg: 241, maxDeg: 300, value: "$2"},
    {minDeg: 301, maxDeg: 360, value: "Nothing"},
]
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
    if (jackpotVersion.options[jackpotVersion.selectedIndex].value=="wheel"){
        wheelJackpot();
    }
    else{
        numberJackpot();
    }
});
stopNumberGroup.addEventListener("click",stopNum);
function stopNum(){
    stopNumJackpot=true;
    stopNumberGroup.disabled=true;
    prizeOutcome();
}
replayGame.addEventListener("click",function(){
    document.getElementById("gameOver").style.display="none";
    document.getElementById("fareVersion").style.display="block";
    fareVersion.selectedIndex=0;
    packetVersion.selectedIndex=0;
    jackpotVersion.selectedIndex=0;
});
function prizeOutcome(){
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
                return;
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
                return;
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
function endGame(){
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
    },3000);
}
// stopNumberGroup.addEventListener("mouseover",function(){
//     stopNumberGroup.style.fontSize="1.2rem";
// });
// stopNumberGroup.addEventListener("mouseout",function(){
//     stopNumberGroup.style.fontSize="1rem";
// });
function wheelJackpot(){
    clearInterval(spinInterval);
    spinExecutionLog++;
    stopWheelJackpot=false;
    document.getElementById("numberJackpot").style.display="none";
    document.getElementById("wheelJackpot").style.display="block";
    document.getElementById("wheelJackpot-returnMessage").innerHTML="";
    const data=[1,1,1,1,1,1];
    let pieColors=[];
    const wheelLabels=["$10", "Nothing", "$5", "Nothing", "$2", "Nothing"];
    for (let i=0;i<6;i++){
        let randomColor=`#${Math.floor(Math.random()*16777215).toString(16)}`;
        pieColors.push(randomColor);
    }
    if (spinExecutionLog>1){
        wheelChart.destroy();
    }
    wheelChart=new Chart(spinWheel,{
        plugins: [ChartDataLabels],
        type: 'pie',
        data: {
            labels: wheelLabels,
            datasets:[
                {
                    backgroundColor: pieColors,
                    data: data,
                }
            ]
        },
        options:{
            responsive: true,
            animation: {duration: 0},
            plugins:{
                tooltip: false,
                legend: {display: false},
                datalabels:{
                    formatter: function(_,context){
                        return context.chart.data.labels[context.dataIndex];
                    },
                    font: {
                        size: 15,
                        family: "tahoma",
                    },
                    color: "#000",
                    backgroundColor: "#FFF",
                }
            },
            width: 300,
            height: 300,
        },
    });
    let resultValue=2;
    spinInterval=setInterval(function(){
        wheelChart.options.rotation=wheelChart.options.rotation+resultValue;
        wheelChart.update();
        if (stopWheelJackpot==true){
            clearInterval(spinInterval);
            console.log("Stopped at "+getSegmentValue(wheelChart.options.rotation));
            setTimeout(function(){
                wheelJackpot();
            },1000);
        }
    },Math.random()*5+1);
};
function getSegmentValue(rotationA){
    let trueA=rotationA%360;
    if (trueA<0){
        trueA=trueA+360;
    }
    for (let i=0;i<rotationValues.length;i++){
        if (trueA>=rotationValues[i].minDeg&&trueA<=rotationValues[i].maxDeg){
            if (i==0||i==2||i==4){
                return "nothing";
            }
            else if (i==1){
                return "10";
            }
            else if (i==3){
                return "2";
            }
            else if (i==5){
                return "5";
            }
        }
    }
}
stopWheel.addEventListener("click",function(){
    stopWheelJackpot=true;
});
function numberJackpot(){
    stopNumJackpot=false;
    stopNumberGroup.disabled=false;
    document.getElementById("numberJackpot").style.display="block";
    document.getElementById("wheelJackpot").style.display="none";
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
};
$(document).ready(function(){
    setInterval(function(){
        $("#main-div").css("box-shadow",`6px 6px 6px 6px rgba(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, .45)`);
    },500);
});
    // function valueGenerator(angleValue){
    //     for (let i=0;i<rotationValues.length;i++){
    //         if (angleValue>=rotationValues[i].minDeg&&angleValue<=rotationValues[i].maxDeg){
    //             stopWheel.disabled=false;
    //             break;
    //         }
    //     }
    // }
    // let count=0;
    // let resultValue=101;
    // stopWheel.addEventListener("click",function(){

    // });
    // let wheelCanvas=document.getElementById("wheel");
    // let wheelContext=wheelCanvas.getContext('2d');
    // wheelContext.beginPath();
    // wheelContext.arc(250, 250, 200, 0, 2*Math.PI);
    // wheelContext.fillStyle="#F00";
    // wheelContext.fill();
    // wheelContext.stroke();
    // wheelContext.beginPath();
    // wheelContext.moveTo(450,250);
    // wheelContext.lineTo(50,250);
    // wheelContext.stroke();
    // wheelContext.beginPath();
    // wheelContext.moveTo(250,50);
    // wheelContext.lineTo(250,450);
    // wheelContext.stroke();