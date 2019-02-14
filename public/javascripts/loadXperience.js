let multi,xper;
let index = 0;
let rows;
let loops;
let melodyStart = "";
let melodyOn = "ambient";

function loadXperience(xperience, samples, xperienceName, enableSave, melodies){
    let xperienceEnt = document.querySelector("#xperience-ent");
    let saveBtn = document.querySelector("#save-btn-ent");
    if(!enableSave){
      saveBtn.innerHTML = "";
    }
    xperienceEnt.innerHTML = "";
    xperienceEnt.setAttribute("name", xperienceName)
    let loopEnt
    let newBox
    let loop 
    samples.forEach((sample, index) =>{
      if(xperience){
        loop = xperience.loops.find(loop => loop.sample.name === sample.name )
      }
      loopEnt = document.createElement("a-entity")
      loopEnt.setAttribute("class", "loop-ent")
      if(loop){
        loopEnt.setAttribute("sampleId", loop.sample._id);
        for(var i=0; i<16; i++){
          newBox = document.createElement("a-box")
          if(loop.start.includes(i)){
            newBox.setAttribute("class", "active");
          }else{
            newBox.setAttribute("class", "inactive");
          }
          newBox.setAttribute("sound", loop.sample.name);
          newBox.object3D.position.set(-8+(i*1.1), 2+(index*1.1), -9);

          loopEnt.appendChild(newBox); 
        }
      }else{
        loopEnt.setAttribute("sampleId", sample._id);
        for(var i=0; i<16; i++){
          newBox = document.createElement("a-box")
          newBox.setAttribute("class", "inactive");
          newBox.setAttribute("sound", sample.name);
          newBox.object3D.position.set(-8+(i*1.1), 2+(index*1.1), -9);
          loopEnt.appendChild(newBox); 
        }
      }
      xperienceEnt.appendChild(loopEnt); 
    })

    loadData(samples, melodies)
}

function loadData(samples, melodies){

  let players = new Object;
  samples.forEach((sample,index) => {
    players[sample.name] = sample.url;
  });

  melodies.forEach((melody,index) => {
    players[melody.name] = melody.url;
  });

  var multiPlayer = new Tone.Players(players, function(){
    startSounds(multiPlayer).toMaster()
  });

}


function startSounds(multiPlayer){
  rows = document.querySelectorAll("#xperience-ent a-box")
  loops = document.querySelectorAll(".loop-ent")
  multi = multiPlayer;

  let ambient = document.querySelector("#ambientMelody")
  let electro = document.querySelector("#technoMelody")    
  let techno = document.querySelector("#electroMelody")

  if(ambient.className === 'active'){
    melodyStart = "ambient"
    multi.get("ambient").toMaster().start()
  }else if(electro.className === 'active'){
    melodyStart = "electro"
    multi.get("electro").toMaster().start()
  }else if(techno.className === 'active'){
    melodyStart = "techno"
    multi.get("techno").toMaster().start()
  }

  Tone.Transport.scheduleRepeat(repeatLoop, '16n');
  Tone.Transport.start();
  
}

function repeatLoop(time) {
  
    let step = index % 16;
    let box;
    if(step==0){
      if(melodyOn !== melodyStart){
        console.log(melodyOn +" --- "+ melodyStart)
        multi.get(melodyStart).toMaster().stop()
        multi.get(melodyOn).toMaster().start()
      }
      melodyStart = ""+melodyOn;
    }
    

    rows.forEach(function(row){
      if(row.className === 'active'){
        row.setAttribute('color', '#444488');
      }else{
        row.setAttribute('color', '#CCCCCC');
      }
    })



    loops.forEach(function(loop, index){
      row=rows[step]
      box = loop.querySelector(`a-box:nth-child(${step + 1})`);
      if(box.className === 'active'){
        multi.get(box.getAttribute("sound")).toMaster().start()
        box.setAttribute('color', '#222288');
      }else{
        box.setAttribute('color', '#667766');
      }
    })
    index++

}

function randomColors() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
