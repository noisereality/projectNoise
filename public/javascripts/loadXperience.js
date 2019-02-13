let multi,xper;
let index = 0;
let rows;
let loops;

function loadXperience(xperience){
  let xperienceEnt = document.querySelector("#xperience-ent");
  xperienceEnt.innerHTML = "";
  let loopEnt
  let newBox
  xperience.loops.forEach((loop,index) => {

    loopEnt = document.createElement("a-entity")
    loopEnt.setAttribute("class", "loop-ent")

    for(var i=0; i<16; i++){
      newBox = document.createElement("a-box")
      //console.log(loop.start[i])
      if(loop.start.includes(i)){
        newBox.setAttribute("class", "active");
      }else{
        newBox.setAttribute("class", "inactive");
      }
      newBox.setAttribute("sound", loop.sample.name);
      newBox.object3D.position.set(-8+(i*1.1), 2+(index*1.1), -9);

      loopEnt.appendChild(newBox); 
    }
    xperienceEnt.appendChild(loopEnt); 
  });

  loadData(xperience)
  
}

function loadData(xperience){

  let players = new Object;
  xperience.loops.forEach((loop,index) => {
    players[loop.sample.name] = loop.sample.url;
  });

  var multiPlayer = new Tone.Players(players, function(){
    startSounds(multiPlayer,xperience).toMaster()
  });

}


function startSounds(multiPlayer,xperience){
  rows = document.querySelectorAll("a-box")
  loops = document.querySelectorAll(".loop-ent")
  multi = multiPlayer;
  xper = xperience;
  Tone.Transport.scheduleRepeat(repeatLoop, '16n');
  Tone.Transport.start();

}

function repeatLoop(time) {
  
    let step = index % 16;
    let box;

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
