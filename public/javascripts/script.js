document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

let xperience = document.querySelector('#xperience-ent');
let box = document.querySelectorAll('#xperience-ent a-box');
let saveBtn = document.querySelector('#save-btn');
let exitBtn = document.querySelector('#exit-btn');

let ambient = document.querySelector("#ambientMelody")
let electro = document.querySelector("#technoMelody")    
let techno = document.querySelector("#electroMelody")



ambient.addEventListener('click', function() {
  if(this.className ==='inactive'){
    electro.className = 'inactive';
    techno.className = 'inactive';
    this.className = 'active';  }
    melodyOn = "ambient";


})
electro.addEventListener('click', function() {
  if(this.className ==='inactive'){
    ambient.className = 'inactive';
    techno.className = 'inactive';
    this.className = 'active';  }
    melodyOn = "electro";
})
techno.addEventListener('click', function() {
  if(this.className ==='inactive'){
    electro.className = 'inactive';
    ambient.className = 'inactive';
    this.className = 'active';  }
    melodyOn = "techno";
})


box.forEach(function(elem){
  elem.addEventListener('click', function() {
    if(this.className === 'active'){
      this.className = 'inactive';
      this.setAttribute('color', '#CCCCCC');
    } else {
      this.className = 'active';
      this.setAttribute('color', '#444488');
    }
    // this.setAttribute('color', randomColors());
  });
})

if(saveBtn){
  saveBtn.addEventListener('click', function() {
    let loops = xperience.querySelectorAll('.loop-ent')
    let newLoops = []
    let newStart = []
    let newSample = ""
    
    loops.forEach(function(loop){
      newStart=[]
      newSample = loop.getAttribute("sampleId")
      let boxes = loop.getElementsByTagName('a-box') 
      for(i = 0;i < boxes.length; i++){
        if(boxes[i].getAttribute("class")=="active"){
          newStart.push(i)
        }
      }
      newLoops.push({start: newStart, sample: newSample})
    })
    let newXperience = {
      name: xperience.getAttribute("name"),
      loops: newLoops
    }
    axios.post('/xperience', {
      xperience: newXperience
    })
  })
}


if(exitBtn){
  exitBtn.addEventListener('click', function() {
    document.location.href="/";
  })
}

function randomColors() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
