let birdList = [];
let pipeList = [];
let canvas;
function setup() {
  canvas = createCanvas(innerWidth,innerHeight);
  var bird = new Bird(50,height/2);
  document.body.addEventListener("click",function(){
    bird.jump();
  })
  for(var i = 0 ; i < 100 ; i++){
    new Bird(50+i/2,height/2);
  }
  regenerate();
}
function searchAliveBird(amount = 1){
  for(var i = 0 ; i < birdList.length ; i++){
    if(!birdList[i].died){
      return birdList[i];
    }
  }
}
let viewingAI = 36;
function draw() {
  background(220);
  generatePipeLoop();
  fill(0)
  textSize(50)
  text(generation,100,100)
  textSize(20)
  var diedCount = 0;
  if(AIList.length>0){
    AIList[viewingAI].brain.draw_brain(200,200,200,30,30);
    AIList[viewingAI].parent.highlight();
    if(AIList[viewingAI].parent.died){
      var searchedBird = searchAliveBird();
      if(searchedBird!=undefined){
        viewingAI = searchedBird.ai.id;
      }
    }
  }
  pipeList.forEach(function(pipe){
    pipe.update();
    //collision with bird
     birdList.forEach(function(bird){
       if(pipe.checkCollision(bird)){
         bird.die(); 
       }
     }); 
  }); 
  fill(255,0,0);
  //show nearest pipe
  if(pipeList.length >= 2){
    var p = pipeList[0]
    rect(p.x,p.y,p.width,p.height)
    var p = pipeList[1]
    rect(p.x,p.y,p.width,p.height)
  }
  birdList.forEach(bird=>diedCount+=bird.died)
  pipeList.forEach(pipe=>pipe.checkOutOfRoom());
  drawAllBird();
  
  if(diedCount >= birdList.length){
    regenerate();
    console.log("regenerated")
  }
  diedCount = 0;
  hardLevel+=0.01;
}
function drawAllBird(){
  birdList.forEach(bird => bird.update()); 
}
let hardLevel = 0;
function restart(){
  console.log("restarted");
  pipeList = [];
  pipeTime = setPipeTime;
  randomGeneratePipes();
  birdList.forEach(bird => bird.respawn());
  hardLevel = 0;
}