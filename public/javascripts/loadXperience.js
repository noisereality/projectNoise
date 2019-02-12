function loadXperience(xperience){
  let xperienceEnt = document.querySelector("#xperience-ent");
  xperienceEnt.innerHTML = "";
  let newBox
  let xPos, yPos, zPos = 0
  xperience.loops.forEach((loop,index) => {
    for(var i=0; i<16; i++){
      newBox = document.createElement("a-box")
      if(loop.start[i] === i){
        newBox.setAttribute("class", "active");
      }else{
        newBox.setAttribute("class", "inactive");
      }
      newBox.setAttribute("position", "0 0 6");

      xperienceEnt.appendChild(newBox); 
    }
  });
 
  
 
  
}