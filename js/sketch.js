//get date
let d = new Date();
let currentY = d.getFullYear();
let currentM = d.getMonth()+1;
currentM.toString();

if(currentM.toString().length==1){
    console.log(currentM.toString)
    currentM='0'+currentM;
}

let currentD = d.getDate();
if(currentD.toString().length==1){
    currentD='0'+currentD;
}
console.log(currentY,currentM+1,currentD);

let year = document.getElementById("YYYY");
console.log(year);
let month = document.getElementById("MO");
let date = document.getElementById("DA");
    
year.innerHTML=currentY;
month.innerHTML=currentM;
date.innerHTML=currentD;

const ask = "https://api.nasa.gov/neo/rest/v1/feed?";
let sampleDate = currentY+"-"+currentM+"-"+currentD;
let apiKey = "p3KaIaY4YbAjnNz44dOvP4NEvurcRUvTJW9K9Ylz";
let url;

let array={};
let size={};
let distance={}; 
let time={};
let delaytime={};
let speed={};
let length;
let volume={};
let playlist={};
let track={};
let blue, hump, fin, minke, orca;

preload();
water.loop=true;
    water.volume=1;
function preload(){
  blue = new Audio("sounds/Blue_Whale.mp3");
  fin = new Audio("sounds/FinWhale.mp3");
  hump = new Audio("sounds/humph.mp3");
  minke = new Audio("sounds/minke.mp3");
  orca = new Audio("sounds/Orca sounds underwater.mp3");
  water = new Audio("sounds/water.mp3");

    // blue = loadSound("sounds/Blue_Whale.mp3");
    // fin = loadSound("sounds/FinWhale.mp3");
    // hump = loadSound("sounds/humph.mp3");
    // minke = loadSound("sounds/minke.mp3");
    // orca = loadSound("sounds/Orca sounds underwater.mp3");
    // water = loadSound("sounds/water.mp3");
}
function setup(){
  preload();
    water.loop=true;
    water.volume=1;
}
let names,velocities;
getData();

function getData() {  

    let submission = sampleDate;
  
    let start = "start_date="+submission;
    let end ="end_date="+submission;
    
    //putting together main variables
    url = ask + start +"&"+end +"&"+"api_key="+apiKey;
    console.log(url);
     
    fetch(url)      
    .then(function(response) {        
      return response.json();      
    })      
    .then(function(resp) {        
      array=resp.near_earth_objects[submission];
      length=resp.element_count;
      console.log("list object", array);
      console.log("list length", length);
      console.log("list of magnitude",array[1].absolute_magnitude_h);
      console.log("approach data", array[1].close_approach_data[0].miss_distance.astronomical);
      
      // getting size for whale type
      for(let i=0; i<length; i++){
        size[i]=array[i].absolute_magnitude_h;
        console.log(size[i]);
      }
      // getting distance for volume
      for(let i=0; i<length; i++){
        distance[i]= array[i].close_approach_data[0].miss_distance.astronomical;
        console.log(distance[i]);
      }
      // getting time for cue
      for(let i=0; i<length; i++){
        time[i]= array[i].close_approach_data[0].close_approach_date_full.split(' ')[1].split(':')[0];
        
        delaytime[i]=1000+((24-time[i])*1000);
        console.log("delaytime is: ", delaytime[i]);
      }
      
      document.addEventListener('click', function(){
        for(let i=0;i<length; i++){
          setTimeout(selectwhale(size[i],distance[i]),delaytime[i]);
        }
      });
      // for(let i=0;i<length; i++){
      //   setTimeout(selectwhale(size[i],distance[i]),delaytime[i]);
      // }

    })      
    .catch(function(resp) {      
      console.log("There was an error: "+resp);      
    });   
  }




function samplePlay(){
  let startT=millis();
  console.log("original time",  millis() , startT, delaytime[0]);
  if(millis()>=startT){
    // selectwhale(size[0]);
    console.log("size",size[0]);
    console.log("playing at ", millis());
  }
    // orca.play();
    // orca.setVolume(0.3);
    // orca.delayTime(1);
//     blue.play();
//     fin.play();
//     hump.play();
//     minke.play();
}
function listplay(){
  for(let i=0;i<3;i++){
    playlist[i] = {
      type: minke,
      distance: array[i].close_approach_data[i].miss_distance.astronomical
    };
    console.log("this", playlist[i]);
  }
}


// function selectwhale(s,v){
//   if( s <21 ){
//     orca.play();
//     orca.setVolume(v*2);
//     console.log("size test", s);
//     console.log("playing orca at volume:", v*2);
//   }
//   else if( s >=22 && s<23){
//     minke.play();
//     minke.setVolume(v*2);
//     console.log("playing minke at volume:", v*2);
//   }
//   else if( s>= 23 && s<24){
//     hump.play();
//     hump.setVolume(v*2);
//     console.log("playing hump at volume:", v*2);
//   }
//   else if( s>= 24 && s<25){
//     fin.play();
//     fin.setVolume(v*2);
//     console.log("playing fin at volume:", v*2);
//   }
//   else {
//     blue.play();
//     blue.setVolume(v*2);
//     console.log("playing blue at volume:", v*2);
//   }
// }
function selectwhale(s,v){
  if( s <21 ){
    orca.volume=v;
    orca.play();

    console.log("playing orca at volume:", v);
  }
  else if( s >=22 && s<23){
    minke.volume=v;
    minke.play();
    
    console.log("playing minke at volume:", v);
  }
  else if( s>= 23 && s<24){
    hump.volume=v;
    hump.play();
   
    console.log("playing hump at volume:", v);
  }
  else if( s>= 24 && s<25){
    fin.volume=v;
    fin.play();
    
    console.log("playing fin at volume:", v);
  }
  else {
    blue.volume=v;
    blue.play();
    
    console.log("playing blue at volume:", v);
  }
}
