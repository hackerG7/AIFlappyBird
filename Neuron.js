class Neuron{
 	constructor(type,id){
        this.value = undefined;
        this.connection = [];//[[neuron,weight],[neuron,weight]...]
        this.type = type
        this.id = id;
        this.sumArray = []
        this.activateValue = this.value;
        this.bias = random(2)-1
		this.useRelu = false;
    }
    clone_from(obj) {
    	Object.assign(this, obj);
  	}
    set_value(val){
     	this.value = val;   
    }
	set_bias(val){
	    this.bias = val
	}
    add_sum(val){
        let sum = 0;
     	this.sumArray.push(val) 
        for(let i = 0 ; i < this.sumArray.length ; i++){
         	sum += this.sumArray[i];   
        }
        this.value = sum;
    }
    connect(neuron,weight){
        //let w = random(1)-0.5;
        let w = 1
        if(weight!=undefined){
            w = weight;
        }
        this.connection.push([[neuron.type,neuron.id],w])
    }
    randomize(){
        this.bias = mutationRate+random(mutationRate*2)
		for(let i = 0 ; i < this.connection.length ; i++){
			let n = this.connection[i][0];
			let w  = random(2)-1;
            this.bias = random(2)-1
this.connection[i][1] = (mutationRate-random(mutationRate*2))
				
		}
    }
	mutation(){
		this.bias *= (-mutationRate+random(mutationRate+mutationRate))
		for(let i = 0 ; i < this.connection.length ; i++){
			let n = this.connection[i][0];
			let w = this.connection[i][1];  
            let a =(-mutationRate+random(mutationRate+mutationRate));
			this.connection[i][1] += a
            if(random(1)<0.1){
            
            }
            if(this.connection[i][1]<-1){
             	this.connection[i][1] = -1  
            }
            if(this.connection[i][1]>1){
             	this.connection[i][1] = 1  
            }                      
				
		}
	}
    remove_sum(){
     	this.sumArray = [];   
    }
	get_bias(){
		return this.bias;
	}
    send_value(neurons){
            for(let i = 0 ; i < this.connection.length ; i++){
                let t = this.connection[i][0][0];
                let id = this.connection[i][0][1];
                let w = this.connection[i][1];
                let n = 0;

                for(let k = 0 ; k < neurons.length ; k++){
                    let ll = neurons[k].length
                    for(let j = 0 ; j < ll ;j++){
                        let cN = neurons[k][j];
                        if(cN.type==t && cN.id == id){
                            n = cN
                            k = neurons.length
                            j=ll
                        }
                    }
                }
                let b = n.get_bias();
				if(this.value!=undefined){
                	this.activateValue = this.activate(this.value,w,b);
                	n.add_sum(this.activateValue)
                }
            }
       
    }
    get_value(){
        return this.activate(this.value)
    }
    update(x,y){
     	
        if(this.value!=undefined){
        stroke(1)
        strokeWeight(1)
        textSize(20)
        text(round(this.value*10)/10,x+this.type*w,y+this.id*h)
        }else{
           
        }
    }
	get_output(){
		return this.relu(this.value)
	}
	output(){
		return this.relu(this.value)
	}
    activate(value,w,b){
		return Math.tanh(value*w+b)
    }
    tanh(value){
        return Math.tanh(value);
    }
	relu(value){
    	return (value>1?1:(value<0?0:value))
    }
    
}