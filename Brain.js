
class Brain{
 	constructor(inputCounts,hiddenCounts,outputCounts){
    this.neurons = [];
    let maxN = 2+hiddenCounts.length;
    for(let i = 0 ; i < maxN ; i++){
     	this.neurons.push([]) 
    }
    this.maxInput = inputCounts;
    for(let i = 0 ; i < this.maxInput ; i++){
        let n = new Neuron(0,i);
        this.neurons[0].push(n)
    }
   	this.maxHidden = hiddenCounts;
    for(let i = 1 ; i <= hiddenCounts.length; i++){
    	for(let l = 0 ; l < hiddenCounts[i-1] ; l++){
         	this.neurons[i].push(new Neuron(i,l))
            
        }
    }
	this.maxOutput = outputCounts;

    
   
    for(let i = 0 ; i < this.maxOutput ; i++){
        let t = hiddenCounts.length+1;
		let n = new Neuron(t,i)
		n.useRelu = true;
     	this.neurons[t].push(n)
    }
    this.get_allNeuron()
    this.initialize()
  }
  set_input(arrayID,val){
    if(this.neurons[0][arrayID]!=undefined){
    	this.neurons[0][arrayID].set_value(val)
    }
    return this.neurons[0][arrayID].value
  }
  input_connect(Neuron,targetNeuron,weight){
   	 Neuron.connect(targetNeuron,weight)
  }
  get_neuron(raw,col){
   	return this.neurons[raw][col];   
  }
  get_hiddenN(raw,col){
   	return this.neurons[raw+1][col];   
  }
  get_inputN(i){
   	return this.neurons[0][i];   
  }
  get_outputN(i){
   	return this.neurons[this.neurons.length-1][i];   
  }
  get_output(){
		let a = [];
		for(let i =0 ; i < this.maxOutput ; i++){
			let n = this.get_outputN(i);
            (this.neurons.length-1)
			a.push(n.output())
		}
		return a;
  }
  update(x,y){

   for(let j = 0 ; j < this.neurons.length ; j++){
       for(let k = 0 ; k < this.neurons[j].length ; k++){
		let oN = this.neurons[j][k]//originalNeuron
        if (oN!=undefined){
        	oN.remove_sum();
        }
    }
	
	}
      for(let j = 0 ; j < this.neurons.length ; j++){
       for(let k = 0 ; k < this.neurons[j].length ; k++){
            let oN = this.neurons[j][k]//originalNeuron
            if(oN!=undefined){
                oN.send_value(this.neurons)
                if(x!=undefined&&y!=undefined){
                	oN.update(x,y)
                }
            }
    	}
	 }
  }
  crossover(otherPlayer){
  	let b = otherPlayer.brain;
    let otherNeurons = otherPlayer.brain.neurons
    let selfNeurons = this.neurons
    if(otherNeurons.length==selfNeurons.length){
        var newNeurons = [];
        var n = 0
        for(let i = 0 ; i < selfNeurons.length ; i++){
            newNeurons[i] = [];
            newNeurons[i].length = selfNeurons[i].length   
        }
        for(let i = 0 ; i < selfNeurons.length ; i++){
          newNeurons[i] = crossover_array(otherNeurons[i],selfNeurons[i])
          this.neurons[i] = newNeurons[i];
        }
    }
    
  }
  mutation(){
    	this.get_allNeuron();
		for(let i = 0 ; i < this.allNeuron.length ; i++){
			if(this.allNeuron[i]!=undefined){
            	this.allNeuron[i].mutation()
            }else{
                console.log("cannot mutation, neuron is undefined")
            }
		}
      
	}
 initialize(){
    let scannedN = []
  	for(let i = 0 ; i < this.neurons.length ; i++){
     	for(let j = 0 ; j < this.neurons[i].length ; j++){
         	if(i!=this.neurons.length){
                let cN = this.get_neuron(i,j)
                for(let n of scannedN){
                    if(n.type<cN.type){
                        n.connect(cN)   
                    }
                }
                scannedN.push(cN)
            }
        }
    }
 }
 randomize(){
     this.brain = this;
     for(let i = 0 ; i < this.neurons.length ;i++){
         for(let j = 0 ; j < this.neurons[i].length ; j++){
      		let c = this.neurons[i][j].connection;
            for(let l = 0 ; l < c.length ; l++){
                this.neurons[i][j].connection[l][1] = (random(2)-1)     
            }
         }
     }
     


 }
  get_allNeuron(){ 
    this.allNeuron = []
    let current = 0
    for(let i = 0 ; i < this.neurons.length ; i++){
       	for(let j = 0 ; j < this.neurons[i].length ; j++){
         	this.allNeuron.push(this.neurons[i][j])   
        }
    }
   	return this.allNeuron;   
  }
  draw_brain(x,y,w=50,h=50,tSize=10){
    this.get_allNeuron()
    for(let j = 0 ; j < this.allNeuron.length ; j++){
        let oN = this.allNeuron[j]//originalNeuron
        if(oN!=undefined){
            let cArray = this.allNeuron[j].connection;
            stroke(0)
            fill(0)
            text(round(oN.value*100)/100,x+(oN.type)*w+30,y+(oN.id)*h)
            if(oN.type!=0&&oN!=undefined){
                var positive = oN.value>0 && oN.value !=0
                var color = positive?[0,255,0]:[255,0,0];
                fill([color[0],color[1],color[2],abs(oN.value)*255]);
                ellipse(x+(oN.type)*w+20,y+(oN.id)*h,20);
            }
            for(let i = 0 ; i < cArray.length ; i++){
                let nPos = cArray[i][0] //neuron position e.g. [1,0]
                let nWeight = cArray[i][1] //neuron position e.g. [1,0]
                let n = this.get_neuron(nPos[0],nPos[1]);//neuron
                if(cArray[i][1]!=0&&cArray[i][1]!=undefined){
                    textSize(tSize)
                    stroke(0,0,0,nWeight*255)
                    line(x+(oN.type)*w,y+(oN.id)*h,x+(n.type)*w,y+n.id*h)
                }
            }
        }
    }
  }
}