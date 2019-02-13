function loadXperience(xperience){
  let xperienceEnt = document.querySelector("#xperience-ent");
  xperienceEnt.innerHTML = "";
  let loopEnt
  let newBox
  // newBox.setAttribute("class", "active");
  // newBox.object3D.position.set(0, 10, -10);
  //color="#CCCCCC"
  //newBox.setAttribute('position', {x: 0, y: 10, z: -10});
  // newBox.setAttribute('color', "#CCCCCC");
  //newBox.setAttribute('position', {x: 1, y: 2, z: 3});
  //xperienceEnt.appendChild(newBox); 
  let xPos, yPos, zPos = 0
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

  let buffer;
  let buffers = new Tone.Buffers()
  xperience.loops.forEach((loop,index) => {
    buffer = new Tone.Buffer(loop.sample.url, function(){
      buffers.add(loop.sample.name,loobuffer);
    });

    notes.push({
      name: loop.sample.name,
      player: new Tone.Player(loop.sample.url).toMaster()});
  });
  var pianoSamples = new Tone.Buffers({
    "C4" : "path/to/C4.mp3",
    "C#4" : "path/to/C#4.mp3",
    "D4" : "path/to/D4.mp3",
    "D#4" : "path/to/D#4.mp3",
  }, function(){
    //play one of the samples when they all load
    player.buffer = pianoSamples.get("C4");
    player.start();
  });

  loadSounds(xperience)
 
  
}

function loadSounds(xperience){
  // var synth = new Tone.MembraneSynth().toMaster()
  //var sampler = new Tone.Sampler({A2:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/808-kick-vh.mp3"})
  var player = new Tone.Player("https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/808-kick-vh.mp3").toMaster();

  let notes = []

  xperience.loops.forEach((loop,index) => {
    notes.push({
      name: loop.sample.name,
      player: new Tone.Player(loop.sample.url).toMaster()});
  });

  const rows = document.querySelectorAll("a-box")
  const loops = document.querySelectorAll(".loop-ent")
  //notes = ['G5', 'C5', 'F4', 'A2'];
  let index = 0;

  Tone.Transport.scheduleRepeat(repeat, '16n');
  Tone.Transport.start();

  function repeat(time) {

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
        console.log(notes.find(note => note.name === box.getAttribute("sound")).player)
        //console.log(xperience.loops.find(loop => loop.sample.name === box.getAttribute("sound")).sample.url)
        //notes[box.className].start();[box.getAttribute("sound")]
        notes.find(note => note.name === box.getAttribute("sound")).player.start()
        box.setAttribute('color', '#222288');
      }else{
        box.setAttribute('color', '#667766');
      }

    })
      
    index++

   



     
    
  }
}