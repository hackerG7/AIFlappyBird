let AIList = [];
class AIObject{
  constructor(parent,brain){
    this.parent = parent;
    this.master = parent;
    this.brain = brain;
    this.brain.randomize();
    this.id = AIList.length;
    AIList.push(this);
  }
  setup(){
    this.isBest = false;
    this.color = [random(255),random(255),random(255)]
  }
  
  get_fitness(){//please change this
    var f = this.parent.points;
    return f;
  }
  update_input(){//please change this
    //change this according to your input amount.
    //e.g. this.brain.set_input(inputID,inputvalue); 
    this.brain.set_input(0,this.parent.y/height); 
    this.brain.set_input(1,this.parent.x/width); 
    if(pipeList[0]==undefined){
      randomGeneratePipes();
      pipeTime = 0;
    }
    this.brain.set_input(2,pipeList[0].height/height); 
    this.brain.set_input(3,pipeList[1].height/height); 
    this.brain.set_input(4,pipeList[0].x/width); 
      /*this.brain.set_input(5,pipeList[1].x); 
      this.brain.set_input(6,pipeList[0].hspeed); 
      this.brain.set_input(7,pipeList[0].width); 
      this.brain.set_input(8,this.parent.width); 
      this.brain.set_input(9,this.parent.height); */
      //this.brain.set_input(2,-1); 
      /*this.brain.set_input(3,-1); 
      this.brain.set_input(4,-1); 
      this.brain.set_input(5,-1); 
      this.brain.set_input(6,-1); 
      this.brain.set_input(7,-1); 
      this.brain.set_input(8,-1); 
      this.brain.set_input(9,-1); */
    //}
  }
  do_output(){//please change this
    let o = this.brain.get_output();
    //start do some thing with the output from the brain
    if(round(o[0])==1){
      this.parent.jump();
    }
    //end 
  }
  update(){
    //↓fixed↓
    this.brain.update();
    this.update_input();
    this.do_output();
    //↑fixed↑
    //↓changable↓
    if(this.isBest){
      this.parent.alpha = 0.5;
      fill(0)
      textSize(30)
      text("best",this.parent.x+this.parent.width*2,this.parent.y+this.parent.height/2)
      textSize(10)
    }
    //↑changable↑
  }
  
  
  
  ///////////////////////////////////////////////
  //////////FIXED  Function. Do not touch////////
  ///////////////////////////////////////////////
  clone_neurons(){//fixed function
	let cloneNeurons = []//this.brain.neurons.slice();
    let b = this.brain
    for(let i = 0 ; i < b.neurons.length ; i++){
        cloneNeurons.push([])
        for(let j = 0 ; j < b.neurons[i].length ; j++){
            let selfN = b.neurons[i][j];
            let cloneN = new Neuron(i,j);
            cloneN.clone_from(JSON.parse(JSON.stringify(selfN)))
            cloneNeurons[i].push(cloneN)
        }
    }
    return cloneNeurons
  }
  get_neurons(){//fixed function
    return this.brain.neurons
  }
  crossover(otherAIObject){//fixed function
   	this.brain.crossover(otherAIObject)
  }
}

	