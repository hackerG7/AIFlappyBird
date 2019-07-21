class Bird{
  constructor(x,y){
    this.spawnX = x;
    this.spawnY = y;
    this.rgb = [random(255),random(255),random(255)];
    this.reset();
    birdList.push(this);
    {//brain
      this.ai = new AIObject(this,new Brain(5 ,[5,5],1));//important
    //brain
    }
  }
  //important
  reset(){//this is a must 
    this.x = this.spawnX;
    this.y = this.spawnY;
    this.width = 30;
    this.height = 30;
    this.hspeed = 0;
    this.vspeed = 0;
    this.jumpRate = 5;
    this.gravity = 0.2;
    this.alpha = 1;
    this.died = false;
    this.distance = this.x;
    this.points = 0;
  }
  highlight(){
    noFill();
    stroke(0);
    ellipse(this.x+this.width/2,this.y+this.height/2,this.width*5);
  }
  update(){
    this.ai.update();//important
    //gravity
    if(!this.died){
      this.distance++;
    }
    this.vspeed += this.gravity;
    //moving
    this.x += this.hspeed;
    this.y += this.vspeed;
    textSize(20)
    fill(this.rgb[0],this.rgb[1],this.rgb[2],this.alpha*255);
    rect(this.x,this.y,this.width,this.height);
    text(this.ai.id+" points: "+this.points,this.x,this.y-50);
    if(this.died){
      this.vspeed += this.gravity*2;
      this.alpha -= 0.1
    }
    if(this.y <= 0 || this.y >= height){
      this.die();
    }
  }
  
  add_point(){
    if(!this.died){
      this.points++;
    }
  }
  jump(){
    if(!this.died){
      this.vspeed = -this.jumpRate;
    }
  }
  die(){
    if(!this.died){
      this.died = true;
    }
  }
  respawn(){
    this.y = height/2;
    this.vspeed = 0;
    this.alpha = 1;
    this.died = false;
    this.distance = 0;
  }
  getFitness(){
    return this.distance; 
  }
}