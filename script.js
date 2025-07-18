let inputDir={x:0, y:0};
const foodSound=new Audio('music/food.mp3');
const gameOverSound=new Audio("music/gameover.mp3");
const move=new Audio("music/move.mp3");
const music=new Audio('music/music.mp3');
let speed=9;
let score=0;
let lastPaintTime=0;
let snakeArr=[
    {x:13,y:15}
]
let food={x:6,y:7};

function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime-lastPaintTime)/1000< 1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(sarr){
    for(let i=1;i<sarr.length;i++){
        if(sarr[i].x===sarr[0].x && sarr[i].y===sarr[0].y){
            return true;
        }
    }
    if(sarr[0].x>=18 || sarr[0].x<=0 || sarr[0].y>=18 || sarr[0].y<=0){
            return true;
    }
    return false;
}

function gameEngine(){
    if(isCollide(snakeArr)){
        gameOverSound.play();
        music.pause();
        inputDir={x:0,y:0};
        alert("Game Over. press any key to play again");
        snakeArr=[{x:13,y:15}];
        music.play();
        score=0;

    }
    if(snakeArr[0].y==food.y && snakeArr[0].x==food.x){
        foodSound.play();
        score+=1;
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML="High Score: "+hiscoreval;
        }
        scoreBox.innerHTML="Score: "+score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()), y:Math.round(a+(b-a)*Math.random())}
    }

    for(let i = snakeArr.length - 1; i > 0; i--){
        snakeArr[i] = { ...snakeArr[i-1] };
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;



    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

}

let hiscore=localStorage.getItem("hiscore");
if(hiscore===null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval=JSON.parse(hiscore);
    hiscoreBox.innerHTML="High Score:"+hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1};
    move.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;
    
        default:
            break;
    }
});