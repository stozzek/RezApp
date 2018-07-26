//default events given
// start: 0   end: 720 (60*12)
// 4x if jeżeli value = 1,2,3,4 i button = clicked wyświetla to i tamto

// wykonywane po kliknięciu
function B(r){
  var PickedDay = r;

// console.log(PickedDay.innerHTML)
  
//   console.log(PickedDay.innerHTML.indexOf("Tuesday June") !== -1)

 // wykonywany po wyborze rodzju wizyty
document.getElementById("choosen").onclick = function() {
console.log(PickedDay)
  
// document.getElementById('choosen').onclick = function() {
//   alert("button was clicked");
// };
// if(document.querySelectorAll('[vcal-date--selected]') == true){
// console.log(document.querySelectorAll('data-calendar-date'))

let RezTerminy = [];
    for(var i=0; rows.length > i ; i++){
        var words = rows[i].date.split(' ');
  var word0 = words[0]
  
  // sprawdzam czy wybrany dzien jest taki sam jak ten w bazie
   if(PickedDay.innerHTML.indexOf(words[0]) !== -1 && PickedDay.innerHTML.indexOf(words[1]) !== -1 && PickedDay.innerHTML.indexOf(words[2]) !== -1 ) {
              console.log(rows[i])
          let RezTerminys = (({ start, end }) => ({ start, end }))(rows[i]);
  console.log(RezTerminys)
  RezTerminy.push(RezTerminys)
     
   }
    
}
//{start:30, end:70}, {start:280, end:340}, {start:550, end:600},{start:600, end:645}
// let events = [];

// for(var i=0; rows.length > i ; i++){
   
//   let RezTerminys = (({ start, end }) => ({ start, end }))(rows[i]);
//   console.log(RezTerminys)
//   RezTerminy.push(RezTerminys)
// }
 
 
console.log(RezTerminy)
let events = [];
 
// let RezTerminy =[{start:30, end:70}, {start:280, end:340}, {start:550, end:600},{start:600, end:645}]
for(var j = 0; j < RezTerminy.length; j++){
  events.push(RezTerminy[j])
}



 
let przerwa = [];
let wolnyTermin = [];

// function buttonFn() {
$('#myForm input').on('change', function() {
  console.log($('input[name=radioName]:checked', '#myForm').val());
})


if($('input[name=radioName]:checked', '#myForm').val() == 1){
  console.log("woeifhwoifhoiwefhoiwehfoiho")



// function buttonFn() {
 //if($('input[name=radioName]:checked', '#myForm').val() == 1){
      // // ----------------- A: [0:15] --------------------------
for(var i=1; i*15<=720; i++){
  let poczatek = i*15-15;
  let koniec = i*15;
  let kolizja = false;
  
  for (var j = 0; j < events.length; j++){
    if(poczatek < events[j].start){
      if(events[j].start-poczatek<15){
        kolizja=true;
      }
      
    }
      
    else{
      if(poczatek<events[j].end){
        kolizja=true;
      }
    }
    
    
  }
  if(kolizja==false){
      wolnyTermin.push({start: poczatek, end:koniec})
  }
}

//events.push(wolnyTermin);

for(var j = 0; j < wolnyTermin.length; j++){
  events.push(wolnyTermin[j])
}

}
// // ----------------- B: [0:30] --------------------------
if($('input[name=radioName]:checked', '#myForm').val() == 2){
for(var i=1; i*30<=720; i++){
  let poczatek = i*30-30;
  let koniec = i*30;
  let kolizja = false;
  
  for (var j = 0; j < events.length; j++){
    if(poczatek < events[j].start){
      if(events[j].start-poczatek<30){
        kolizja=true;
      }
      
    }
      
    else{
      if(poczatek<events[j].end){
        kolizja=true;
      }
    }
    
    
  }
  if(kolizja==false){
      wolnyTermin.push({start: poczatek, end:koniec})
  }
}

//events.push(wolnyTermin);

for(var j = 0; j < wolnyTermin.length; j++){
  events.push(wolnyTermin[j])
}
}
// // ----------------- C: [0:45] --------------------------
if($('input[name=radioName]:checked', '#myForm').val() == 3){
for(var i=1; i*45<=720; i++){
  let poczatek = i*45-45;
  let koniec = i*45;
  let kolizja = false;
  
  for (var j = 0; j < events.length; j++){
    if(poczatek < events[j].start){
      if(events[j].start-poczatek<45){
        kolizja=true;
      }
      
    }
      
    else{
      if(poczatek<events[j].end){
        kolizja=true;
      }
    }
    
    
  }
  if(kolizja==false){
      wolnyTermin.push({start: poczatek, end:koniec})
  }
}

//events.push(wolnyTermin);

for(var j = 0; j < wolnyTermin.length; j++){
  events.push(wolnyTermin[j])
}
}
// // ----------------- D: [0:60] --------------------------
if($('input[name=radioName]:checked', '#myForm').val() == 4){
for(var i=1; i*60<=720; i++){
  let poczatek = i*60-60;
  let koniec = i*60;
  let kolizja = false;
  
  for (var j = 0; j < events.length; j++){
    if(poczatek < events[j].start){
      if(events[j].start-poczatek<60){
        kolizja=true;
      }
      
    }
      
    else{
      if(poczatek<events[j].end){
        kolizja=true;
      }
    }
    
    
  }
  if(kolizja==false){
      wolnyTermin.push({start: poczatek, end:koniec})
  }
}

//events.push(wolnyTermin);

for(var j = 0; j < wolnyTermin.length; j++){
  events.push(wolnyTermin[j])
}
}


console.log(events);
layOutDay(events);

}

}  
