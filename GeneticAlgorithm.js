function reset(){
  //please change
  birdList.forEach(bird=>bird.reset());
  pipeList = [];
}
function select_best(amount) {
  if (amount == undefined) {
    amount = 1
  }
  let bestFitness = [];
  let best = [];
  for (let i = 0; i < amount; i++) {
    bestFitness.push(-899998989)
    best.push(undefined)
  }



  for (let ai of AIList) {
    let f = ai.get_fitness()
    for (let i = 0; i < bestFitness.length; i++) {
      if (f > bestFitness[i]) {
        if (i == 0) {
          bestFitness[i] = f
          best[i] = ai;
        } else {
          bestFitness[i - 1] = bestFitness[i]
          best[i - 1] = best[i];
          bestFitness[i] = f
          best[i] = ai;
        }
      }
    }
  }
  if (best.length == 1) {
    return best[0]
  } else {
    return best
  }

}

function crossover_array(ParentOne, ParentTwo) {
  var
    parents = [ParentOne.slice(), ParentTwo.slice()],
    output = [];
  for (let i = 0; i < ParentOne.length; i++) {
    output.push(undefined)
  }
  for (var i = 0; i < output.length; i++) {
    let r = Math.round(Math.random())
    let p = parents[r][i]
    output[i] = new Neuron(1)
    output[i].clone_from(JSON.parse(JSON.stringify(p)))
  }
  return output;
}
function set_genetic(GV) {
  GV.generation = 0;
  GV.selecting = 0;
  GV.bestArray = [];
  GV.drawData = false;
  GV.drawAna = false;
  GV.drawAll = false;
  GV.drawBestOnly = true
  GV.drawBestBrain = false
  GV.bestPercent = 0.1 //bigger = more AI survive
  GV.neurons = [];
  //startNeurons = 4;
  GV.copyBestChance = 0.1 //the % that the died AI will become best AI
  GV.crossoverBestChance = 0.2 //the percent that will cross with best
  GV.crossOverChance = 0.2
  GV.mutationChance = 0.1
  GV.mutationRate = 0.2
  GV.randomizeChance = 0.1
  GV.bestAI = undefined;
}

set_genetic(this);
console.log('testing');
console.log("crossOverChance: "+crossOverChance);
function regenerate() {
  generation++
  bestAI = select_best()
  bestArray = select_best(bestPercent * AIList.length)
  let bl = bestArray.length;
  bestAI.isBest = true;
  for (let i = 0; i < AIList.length; i++) {
    AIList[i].parent.reset();
    
    let r = irandom(bl - 1);
    let allow = true; //allow to crossover
    let aN = 0;
    if (bestArray.length > 1) {
      for (let s of bestArray) {
        if (s.get_neurons() == AIList[i].get_neurons()) {
          allow = false;
        }
      }
      if (bestArray[r] != undefined && allow) {
        if (AIList[i] != bestAI) {
          if (random(1) < copyBestChance) {
            AIList[i].brain.neurons = bestAI.clone_neurons()
          } else {
            AIList[i].brain.neurons = bestArray[r].clone_neurons()
          }
        }
      }
      if (bestAI.get_neurons() == AIList[i].get_neurons()) {
        AIList[i].isBest = true;
        bestColor = AIList[i].color

        //console.log("isbest")
      } else {

        AIList[i].isBest = false;
        //console.log("m")
        let nr = irandom(bl - 1)

        if (random(1) < crossOverChance) {

          //crossed++
          let br = random(1)
          if (br < crossoverBestChance) {
            AIList[i].brain.crossover(bestAI)

          } else {

            AIList[i].brain.crossover(bestArray[nr])
          }
        }
        if (random(1) < mutationChance) {
          AIList[i].brain.mutation() 

        }
        if (random(1) < randomizeChance) {
          if (AIList[i] != bestAI) {
            AIList[i].brain.randomize();
          }
        }
      }
    }
    reset();
    AIList[i].do_output()
  }

}