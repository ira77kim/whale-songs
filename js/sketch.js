//get date
let d = new Date();
let currentY = d.getFullYear();
let currentM = d.getMonth()+1;
currentM.toString();

if(currentM.toString().length==1){
    
    console.log(currentM.toString)
    currentM='0'+currentM;
    console.log(currentM);
    // currentD.toString.padStart(2,"0");
}
// currentM.toLocaleString(undefined,{minimumIntegerDigits:2});
let currentD = d.getDate();
if(currentD.toString.length==1){
    console.log("1 digit")
    currentD='0'+currentD;
    console.log(currentD);
    // currentD.toString.padStart(2,"0");
}
console.log(currentY,currentM+1,currentD);
// currentD.toLocaleString(undefined,{minimumIntegerDigits:2});

let year = document.getElementById("YYYY");
console.log(year);
let month = document.getElementById("MO");
let date = document.getElementById("DA");

//** doesnt work because the page does move even when scrolled */
// year.addEventListener("scroll",function(){
//     currentY--;
//     console.log(currentY);
    
// });
year.innerHTML=currentY;
month.innerHTML=currentM;
date.innerHTML=currentD;
// let mm=document.getElementById("MMM").value;
// document.getElementById("MMM").onchange=function(){
    
//     console.log(mm);
// }

const ask = "https://api.nasa.gov/neo/rest/v1/feed?";
let sampleDate = currentY+"-"+currentM+"-"+currentD;

let apiKey = "p3KaIaY4YbAjnNz44dOvP4NEvurcRUvTJW9K9Ylz";
let url;

let array={};
let distance={}; 
let size={};
let speed={};
let length;

let blue, hump,fin,minke, orca;

function preload(){
    blue = loadSound("sounds/Blue_Whale.mp3");
    fin = loadSound("sounds/FinWhale.mp3");
    hump = loadSound("sounds/humph.mp3");
    minke = loadSound("sounds/minke.mp3");
    orca = loadSound("sounds/Orca sounds underwater.mp3");
    water = loadSound("sounds/water.mp3");
}
function setup(){
    // water.play();
    water.loop();
    water.setVolume(1.5);

    samplePlay();
}
let names,velocities;
getData();
// document.addEventListener("click",getData);
// getData();
function getData() {  

    // let submission = document.getElementById("space").elements.item(0).value;
    // console.log(submission);
    let submission = sampleDate;
  
    let start = "start_date="+submission;
    let end ="end_date="+submission;
    
    //putting together main variables
    url = ask + start +"&"+end +"&"+"api_key="+apiKey;
    console.log(url);
    // e.preventDefault();
     
    fetch(url)      
    .then(function(response) {        
      return response.json();      
    })      
    .then(function(resp) {        
      array=resp.near_earth_objects[submission];
      length=resp.element_count;
      console.log("list object", array);
      console.log("list length", length);
      console.log("list of objects",array[1].absolute_magnitude_h);
      
      for(let i=0; i<length; i++){
        size[i]=array[i].absolute_magnitude_h;
        console.log(size[i]);
      }
      //   console.log("this",array[i].absolute_magnitude_h);
        
      //   names.push(array[i].name);
      //   velocities.push(array[i].close_approach_data[0].relative_velocity.kilometers_per_second/10);
      //   console.log(velocities[i]);
        
        
      // }
    })      
    .catch(function(resp) {      
      console.log("There was an error: "+resp);      
    });   
  }

// today.addEventListener("")

document.addEventListener("click", function(){
samplePlay();
});
function samplePlay(){
    orca.play();
    orca.setVolume(0.3);
    blue.play();
    fin.play();
    hump.play();
    minke.play();
}
