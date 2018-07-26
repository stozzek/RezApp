const containerHeight = 720;
const containerWidth = 440; //440
const minutesinDay = 60 * 12;
let collisions = [];
let width = [];
let leftOffSet = [];
// append one event to calendar
// function myFunction() {
//   console.log("123")
// }

var createEvent = (height, top, left, units, event, ForId) => {
  console.log(CUA)
  let node = document.createElement("DIV");
  node.className = "event";
  var activeDate = $('#alll').text()

  // node.innerHTML = 
  // "<span class='title'> Wizyta Lekarska </span> \
  // <br><span class='location'> Typ: Alergologiczna </span>";
  
  // Customized CSS to position each event
  node.style.width = (containerWidth/units) + "px";
  node.style.height = height + "px";
  // Dodałem 33 by móc zacząc 
  node.style.top = 43 + top + "px"; 
  node.style.left = 100 + left + "px";
// console.log(node)

let ZapisSE = event;

//   console.log(ZapisSE)
  
// console.log(node)
//   console.log(rows)
  
node.classList.add("NodeHover");
// console.log("adding NodeHover")

 
    for(var i=0; rows.length > i ; i++){
   if(rows[i].start == ZapisSE.start && rows[i].end == ZapisSE.end && activeDate == rows[i].date){
     console.log(rows[i].date)
       node.classList.add("NodeNoHover");
      node.classList.remove("NodeHover");
      if(CUA){ 
        console.log(i)
node.innerHTML = "<a><span class='i glyphicon glyphicon-remove'></span><a>" ;


node.childNodes[0].addEventListener("click", function(e){
  
   $.ajax({
      url: "/reserveDelete",
      method: "POST",
      data: { 
        ThisNodeStart: event.start,
        ThisNodeEnd: event.end,
        ThisNodeDate:activeDate
      }
    });
  //stopuje Event Bubbling
    e.stopPropagation();
     let pocz = (540 + event.start) 
       let kon = (540 + event.end) 
       var hP = Math.floor(pocz / 60);          
      var mP = pocz % 60; 
       var hK =  Math.floor(kon / 60);
       var mK = kon % 60;
       var datPocz = hP + ':'+ mP; 
       var datEnd = hK + ':' + mK;
 document.getElementById('pk').innerHTML = "REZERWACJA USUNIETA: " + datPocz + '-' + datEnd + ' | ' + activeDate 
      document.getElementById('pk').classList.remove("hidden");
    //   document.getElementById('usershow').classList.add("hidden");
})
// for(var i=0; ajs.length){
  
// }
if(event.end - event.start == 15){
   node.childNodes[0].classList.add("ikspietanscie");
   
}
}
      // node.innerHTML = 
      console.log("adding Nohover")
      // "<span class=''> Taken  </span>" ;
   } else {
    // node.innerHTML = 
    //   "<span class='InnFree'> Rezerwuj </span> /" 
   }
    
 } 
 
 
node.addEventListener("click", function(){
    //Zapis do bazy danych
    console.log(node)
    $.ajax({
      url: "/reserve",
      method: "POST",
      data: { 
        zapisStart : ZapisSE.start,
        zapisEnd: ZapisSE.end,
        activeDate: activeDate
      }
    });
    // click
     if(node.classList.contains("NodeHover")){
       let TypWizyty = ' ';
       if($('input[name=radioName]:checked', '#myForm').val() == 1){
         TypWizyty += ' Odczulanie';
       } else if($('input[name=radioName]:checked', '#myForm').val() == 2){
         TypWizyty += 'Badania alergologiczne';
       } else if($('input[name=radioName]:checked', '#myForm').val() == 3){
         TypWizyty += 'Wizyta normalna';
       } else if($('input[name=radioName]:checked', '#myForm').val() == 4){
         TypWizyty += 'Pierwsza wizyta';
       }
      // console.log(TypWizyty)
       let pocz = (540 + ZapisSE.start) 
       let kon = (540 + ZapisSE.end) 
       var hP = Math.floor(pocz / 60);          
      var mP = pocz % 60; 
       var hK =  Math.floor(kon / 60);
       var mK = kon % 60;
       var datPocz = hP + ':'+ mP; 
       var datEnd = hK + ':' + mK;
       
      // console.log('poczatek: ', datPocz, 'koniec: ', datEnd)
      if(CUA){
        document.getElementById('pa').innerHTML = "TERMIN ZABLOKOWANY: " + datPocz + '-' + datEnd + ' | ' + activeDate +'  -' + TypWizyty
      document.getElementById('pa').classList.remove("hidden");
      } else {
      // console.log("REZERWACJA: " + ZapisSE.start + ' ' + ZapisSE.end + ' '+ activeDate)
      document.getElementById('ph').innerHTML = "REZERWACJA: " + datPocz + '-' + datEnd + ' | ' + activeDate +'  -' + TypWizyty
      document.getElementById('ph').classList.remove("hidden");
      }
        
      }
      
      
    node.classList.remove("NodeHover");
    node.classList.add("NodeNoHover");
   
     
    
    // alert(JSON.stringify(ZapisSE, null, 4))
    console.log("zapisuje początek: " + ZapisSE.start)
    console.log("wartosc zapisanego konca:" + ZapisSE.end)
    //alert(JSON.stringify(YOUR_OBJECT_HERE, null, 4));
    //alert(object.toSource())
  })
  

// console.log( document.getElementById("events"))
 document.getElementById("events").appendChild(node);
  $(node).hover(function(){
    // $(this).css("background-color", "yellow");
    let pocz = (540 + ZapisSE.start) 
       let kon = (540 + ZapisSE.end) 
       var hP = Math.floor(pocz / 60);          
      var mP = pocz % 60; 
       var hK =  Math.floor(kon / 60);
       var mK = kon % 60;
       var datPocz = hP + ':'+ mP; 
       var datEnd = hK + ':' + mK;
     document.getElementById('dateshow').innerHTML = "Godzina: " + datPocz + '-' + datEnd 
      document.getElementById('dateshow').classList.remove("hidden");
      
      // (rows[i].start == ZapisSE.start && rows[i].end == ZapisSE.end && activeDate == rows[i].date
      
      if(CUA){
      // document.getElementById('suershow').classList.remove("hidden");
      if(node.classList.contains("NodeNoHover")){
          for(var i = 0; rows.length > i ; i++ ){
              if(rows[i].start == ZapisSE.start && activeDate == rows[i].date ){
                 
                
                 if(typeof rows[i].pacjent !== 'undefined'){
                  var imieZapis = rows[i].pacjent.id.imie;
                 var nazwiskoZapis = rows[i].pacjent.id.nazwisko
                   document.getElementById('usershow').innerHTML = "Pacjent: " +  imieZapis + " " + nazwiskoZapis
                 } else {
                     document.getElementById('usershow').innerHTML =  "Rezerwacja Zablokowana"
                    
                 }
                   
                 }
      }
       
           
      }
      // console.log(node.classList.contains("NodeHover"))

    
      //   for(var i = 0; rows.length > i ; i++ ){
      //   console.log(rows[i])
      // }
      
      
      }
        
      });
    
}








/* 
collisions is an array that tells you which events are in each 30 min slot
- each first level of array corresponds to a 30 minute slot on the calendar 
  - [[0 - 30mins], [ 30 - 60mins], ...]
- next level of array tells you which event is present and the horizontal order
  - [0,0,1,2] 
  ==> event 1 is not present, event 2 is not present, event 3 is at order 1, event 4 is at order 2
*/

function getCollisions (events) {

  //resets storage
  collisions = [];

  for (var i = 0; i < 24; i ++) {
    var time = [];
    for (var j = 0; j < events.length; j++) {
      time.push(0);
    }
    collisions.push(time);
  }

  events.forEach((event, id) => {
    let end = event.end;
    let start = event.start;
    let order = 1;

    while (start < end) {
      timeIndex = Math.floor(start/30);

      while (order < events.length) {
        if (collisions[timeIndex].indexOf(order) === -1) {
          break;
        }
        order ++;
      }

      collisions[timeIndex][id] = order;
      start = start + 30;
    }

    collisions[Math.floor((end-1)/30)][id] = order;
  });
};

/*
find width and horizontal position

width - number of units to divide container width by
horizontal position - pixel offset from left
*/
function getAttributes (events) {

  //resets storage
  width = [];
  leftOffSet = [];

  for (var i = 0; i < events.length; i++) {
    width.push(0);
    leftOffSet.push(0);
  }

  collisions.forEach((period) => {

    // number of events in that period
    let count = period.reduce((a,b) => {
      return b ? a + 1 : a;
    })

    if (count > 1) {
      period.forEach((event, id) => {
        // max number of events it is sharing a time period with determines width
        if (period[id]) {
          if (count > width[id]) {
            width[id] = count;
          }
        }

        if (period[id] && !leftOffSet[id]) {
          leftOffSet[id] = period[id];
        }
      })
    }
  });
};

var layOutDay = (events) => {

// clear any existing nodes
var myNode = document.getElementById("events");
myNode.innerHTML = '';
console.log(myNode)
// getCollisions(events);
  getAttributes(events);

  events.forEach((event, id) => {
    let ForId = id
    let height = (event.end - event.start) / minutesinDay * containerHeight;
    let top = event.start / minutesinDay * containerHeight; 
    let end = event.end;
    let start = event.start;
    let units = width[id];
    if (!units) {units = 1};
    let left = (containerWidth / width[id]) * (leftOffSet[id] - 1) + 10;
    if (!left || left < 0) {left = 10};
    createEvent(height, top, left, units, event, ForId);
  });
}