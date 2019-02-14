document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

let xperience = document.querySelector('#xperience-ent');
let box = xperience.querySelectorAll('a-box');
let saveBtn = document.querySelector('#save-btn');

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

saveBtn.addEventListener('click', function() {
  let loops = xperience.querySelectorAll('.loop-ent')
  axios.post('/xperience', {
    foo: 'bar'
  })
})

function randomColors() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
