class Pipe{
  constructor(x, vPos, height, hspeed){
    this.x = x;
    this.y = 0;
    this.vPos = vPos;
    this.width = 50;
    this.height = height;
    this.hspeed = hspeed;
    pipeList.push(this);
  }
  update(){
    this.x += this.hspeed;
    fill(50,255,0);
    if(this.vPos == 1){
      this.y = 0;
       rect(this.x,this.y,this.width,this.height); 
    }else{
      this.y = height-this.height
       rect(this.x,this.y,this.width,this.height); 
    }
  }
  checkOutOfRoom(){
    if(this.x < -this.width+50){
      //out of room , then destroy itself
      birdList.forEach(bird=>bird.add_point());
      pipeList.splice(this,1);
    } 
  }
  checkCollision(rect){
    return rectangle_collision(this.x,this.y,this.width,this.height,
                               rect.x,rect.y,rect.width,rect.height);
  }
  
}
function generatePipe(vPos,height = canvas.height/2-50,defaultWidth = 0,defaultSpeed = -3){
  var p = new Pipe(width+defaultWidth,vPos,height, defaultSpeed); 
  console.log("generated pipe")
}
function stopAllPipe(){
  pipeList.foreach(pipe=>pipe.hspeed = 0);
}


let setPipeTime = 300;
let pipeTime = setPipeTime;
function randomGeneratePipes(){
  var rh = random(height-250)+100//random height
  var minGapSize = 300-Math.min(200,hardLevel);
  var gapSize = random(minGapSize,minGapSize+100);//the gap/the hole between two pipes
  generatePipe(0,height-rh-gapSize/2);
  generatePipe(1,rh-gapSize/2);
}
function generatePipeLoop(){
  if(pipeList[0]==undefined){
    randomGeneratePipes();
    pipeTime = 0;
  }
  if(pipeTime >= setPipeTime){
    pipeTime = 0;
    randomGeneratePipes();
  }else{
    pipeTime++;
  }
}