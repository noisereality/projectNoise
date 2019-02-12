document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

// document.querySelectorAll(".color-box").addEventListener('click', function (evt) {
//   console.log(evt)
//   //evt.target.setAttribute('color', randomColors());
// });

//console.log(document.querySelectorAll('a-box'));
let box = document.querySelectorAll('a-box');

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

function randomColors() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}







// UPDATE: there is a problem in chrome with starting audio context
//  before a user gesture. This fixes it.
// document.documentElement.addEventListener('mousedown', () => {
//   if (Tone.context.state !== 'running') Tone.context.resume();
// });

// var MonoSynth = require("Tone").MonoSynth;
// var synth = new MonoSynth();



var synth = new Tone.MembraneSynth().toMaster()

const rows = document.querySelectorAll("a-box"),
notes = ['G5', 'C5', 'F4', 'A2'];
let index = 0;

Tone.Transport.scheduleRepeat(repeat, '16n');
Tone.Transport.start();

function repeat(time) {
    let step = index % 16;
    rows.forEach(function(row){
      if(row.className === 'active'){
        row.setAttribute('color', '#444488');
      }else{
        row.setAttribute('color', '#CCCCCC');
      }
    })
    row=rows[step]
    if(row.className === 'active'){
      synth.triggerAttackRelease(notes[3], '8n', time);
      row.setAttribute('color', '#222288');
    }else{
      row.setAttribute('color', '#667766');
    }
    
    index++
  
}

// //create a loop
// var loop = new Tone.Loop(function(time){
// 	synth.triggerAttackRelease("C1", "8n", time)
// }, "4n")

// //play the loop between 0-2m on the transport
// loop.start(0).stop('2m')

// //start/stop the transport
// document.querySelector('#cen').addEventListener('click', e => Tone.Transport.toggle())




// var autoFilter = new Tone.AutoFilter("4n").toMaster().start();

// autoFilter.baseFrequency.value = 200;

// var freeverb = new Tone.Freeverb().toMaster();
// freeverb.dampening.value = 200;
// freeverb.roomSize.value = 500;
// freeverb.wet.value = 1;

// var pingPong1 = new Tone.PingPongDelay("8n", 0.3).toMaster();
// var pingPong2 = new Tone.PingPongDelay("4n", 0.3).toMaster();
// var pingPong3 = new Tone.PingPongDelay("2n", 0.4).toMaster();
// var pingPong4 = new Tone.PingPongDelay("6n", 0.4).toMaster();



// const synths = [
//   new Tone.Synth().connect(pingPong2).connect(freeverb).connect(autoFilter),
//   new Tone.Synth().connect(pingPong2).connect(freeverb).connect(autoFilter),
//   new Tone.Synth().connect(pingPong3).connect(freeverb).connect(autoFilter),
//   new Tone.Synth().connect(autoFilter)
// ];

// synths[0].oscillator.type = 'sine';
// synths[1].oscillator.type = 'sine2';
// synths[2].oscillator.type = 'sine2';
// synths[3].oscillator.type = 'sine';

// const gain = new Tone.Gain(0.6);
// gain.toMaster();

// synths.forEach(synth => synth.connect(gain));

// let divs = document.querySelectorAll("div")

// const rows = document.querySelectorAll(".synth"),
// notes = ['G5', 'C5', 'F4', 'A2'];
// let index = 0;

// Tone.Transport.scheduleRepeat(repeat, '16n');
// Tone.Transport.start();

// function repeat(time) {
//   let step = index % 16;
//   for (let i = 0; i < rows.length; i++) {
//     let synth = synths[i],
//     note = notes[i],
//     row = rows[i],
//     input = row.querySelector(`input:nth-child(${step + 1})`);
//     if (input.checked) synth.triggerAttackRelease(note, '8n', time);
//   }
//   index++;
// }