const btnStart = document.querySelector(".start");
const btnPause = document.querySelector(".pause");
const btnStop = document.querySelector(".stop");

const time = document.querySelector("#time");

const workTime = document.querySelector("#workTime");
const pauseTime = document.querySelector("#pauseTime");

const originalWorkTime = workTime.value * 60;
const originalPauseTime = pauseTime.value * 60;

const h4 = document.querySelector("h4");

//controlos de work/pause
/*
os controlos servirão:

No início, fica tudo a false, portanto não funciona. 
Quando o utilizador introduz os tempos, e depois carrega no botão start, o controlWork passa a true e o tempo começa a contar.
    Neste caso, a função startTimer faz uma verificação: se os dois controlos estão a false, então o controlWork passa a true, o control pause continua a false. (esta verificação deve de ser feita logo no início)
    Caso o tempo do work esteja a zero e o control work está a true e o control pause a false, então o control work passa a false e o control pause passa a true e começa a contar o tempo da pause
        Para além disso, o tempo do work passa ao tempo original, portanto é preciso criar uma variável que indique o tempo original em segundos tanto do work como do pause.
    Caso o tempo do pause esteja a zero e o control work está a false e o control pause esteja a true, então o control work passa a true e o control pause passa a false e começa a contar o tempo da pause
        Para além disso, o tempo do pause passa ao tempo original, portanto é preciso criar uma váriável que indique o tempo original em segundos tanto do work como do pause.
*/
let controlWork = false;
let controlPause = false;

//controlo de tempo geral

let whatToReduce = 0;


//time.textContent = "baguingui";

let totalTimeInSecondsWork = Number(workTime.value) * 60; //segundos totais do tempo de trabalho
let totalTimeInSecondsPause = Number(pauseTime.value) * 60;//segundos totais do tempo de descanso

/*let funTimer = function(){
    setInterval(startTimer, 1000);
};*/

let funTimer;

//btnStart.addEventListener("click", funTimer);
btnStart.addEventListener("click", () =>{
    console.log("batarrararar")
    funTimer = setInterval(startTimer, 1000);
});

btnStop.addEventListener("click", stopTimer);

btnPause.addEventListener("click", pauseTimer);

function pauseTimer(){
    clearInterval(funTimer);
    console.log("paused");
}


function stopTimer(){
    clearInterval(funTimer);
    console.log("qualquer coisa")
    funTimer = false;
    console.log("HAHAHAHHAH");
    controlWork = false;
    controlPause = false;
    whatToReduce = 0;
    time.textContent = "00:00";
}

let alarmWorkDone = document.querySelector("#alarmWorkDone");
let alarmPauseDone = document.querySelector("#alarmPauseDone");
let alarmItBegins = document.querySelector("#alarmItBegins");

function startTimer(){
    //fazer verificações

    //logo no inicio
    if(controlWork == false && controlPause == false){
        console.log("primeira condição");
        controlWork = true;
        whatToReduce = totalTimeInSecondsWork;
        alarmItBegins.play();
        h4.textContent = "Working";
    //quando o work chega ao fim, activar o pause, desactivar o work e deduzir do tempo do pause
    }else if(whatToReduce == 0 && controlWork == true){
        console.log("segunda condição");
        controlWork = false;
        controlPause = true;
        whatToReduce = totalTimeInSecondsPause;
        alarmWorkDone.play();
        h4.textContent = "Pausing";
    //quando o pause chega ao fim, desactivar o pause, activar o work e deduzir do tempo do work
    }else if(whatToReduce == 0 && controlPause == true){
        console.log("terceira condição");
        controlWork = true;
        controlPause = false;
        whatToReduce = totalTimeInSecondsWork;
        alarmPauseDone.play();
        h4.textContent = "Working";
    }

    whatToReduce--;
    console.log(whatToReduce);

    let timeInMinutes = Math.floor(whatToReduce / 60);
    let timeInSeconds = whatToReduce - (timeInMinutes * 60);

    if(String(timeInMinutes).length < 2 && String(timeInSeconds).length < 2){
        time.textContent = `0${timeInMinutes}:0${timeInSeconds}`;
    }else if (String(timeInMinutes).length < 2){
        time.textContent = `0${timeInMinutes}:${timeInSeconds}`;
    }else if(String(timeInSeconds).length < 2){
        time.textContent = `${timeInMinutes}:0${timeInSeconds}`;
    }else{
        time.textContent = `${timeInMinutes}:${timeInSeconds}`;
    }

    
    //time.textContent = `${timeInMinutes}:${timeInSeconds}`;

    /*console.log("baguingui");
    console.log("valor do controlWork = " + controlWork);
    console.log("valor do controlPause = " + controlPause);
    console.log("valor do whatToReduce = " + whatToReduce);
    console.log("valor do controlPause = " + controlWork);*/

    /*if(totalTimeInSecondsWork == 0){
        clearInterval(funTimer);
    }else{
        whatToReduce--;
        console.log(whatToReduce);
    
        let timeInMinutes = Math.floor(whatToReduce / 60);
        let timeInSeconds = whatToReduce - (timeInMinutes * 60);
    
        time.textContent = `${timeInMinutes}:${timeInSeconds}`;
    }*/
    



    //time.textContent = Number(time.value)

    //minutos completos Math.floor(Number(time.textContent))
    //resultado = resultado * 60
    //resultado = resultado - 1

    //segundos completos tempo - minutos completos * 60
}

