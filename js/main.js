const mainParagraph = document.getElementById("mainParagraph");
const title = document.getElementById("title");
const addPlantButton = document.getElementById("addPlant");

const maxDaysWithNo = 4;
const storageSize = localStorage.length;
//console.log(storageSize);

if ( storageSize == 0 ){
    mainParagraph.innerText = "You have no plants in you garden. Click 'ADD PLANT' to add...";
}else{
    for (let i = 0; i < storageSize; i++){
        render(localStorage.key(i));
    }
}

function addPlant() {
    let plant = prompt("Please enter plant name:", "E.X juka_gloriosa");
    if (plant != null && localStorage.getItem(plant) === null) {
        populatePlantData(plant);
        location.reload();
        //alert("PLANT ADDED. REFRESH THE PAGE...");
    }else{
        alert("PLANT_ALREADY_EXISTS");
        location.reload();
    }
}

function render(p){
    let values = JSON.parse(localStorage.getItem(p));
    let actualTime = new Date().getTime();
    let lWater = new Date(values["lastWatering"]).getTime();
    //console.log("lastW: " + lWater);
    //console.log("actual : " + actualTime);
    let daysFrom = getDuration(actualTime, lWater);
    //console.log("daysFROM : " + daysFrom)
    const node = document.createTextNode(values["name"] + " | LAST WATERING : " + values["lastWatering"] + " | DAYS FROM : " + daysFrom + " --> ");


    const newPlant = document.createElement('p').appendChild(node);
    //riseWarningIfNeeded(values["name"],daysFrom, newPlant);
    mainParagraph.appendChild(newPlant);
    addWateringButton(values["name"]);
    //addDeleteButton(values["name"]);
    let br = document.createElement("br");
    mainParagraph.appendChild(br);
}

function clearData() {
    if (confirm('Are you sure you want to clear the data ? All data will be LOST...')) {
        localStorage.clear();
        location.reload();
    }
}
function getDuration(actual,lastWatering){
    let diff = actual - lastWatering;
    var daysDifference = Math.floor(diff/1000/60/60/24);
    //var daysDifference = Math.floor(diff/1000/60);
    return daysDifference;
}

function addWateringButton(plantName){
    var button = document.createElement('button');
    button.innerHTML = 'WATERED!';
    button.onclick = function(){
        populatePlantData(plantName);
    };
    // where do we want to have the button to appear?
    // you can append it to another element just by doing something like
    mainParagraph.appendChild(button);
    //let br = document.createElement("br");
    //mainParagraph.appendChild(br);
}
function addDeleteButton(plantName){
    var button = document.createElement('button');
    button.innerHTML = 'DELETE PLANT';
    button.onclick = function(){
        deletePlant(plantName);
    };
    // where do we want to have the button to appear?
    // you can append it to another element just by doing something like
    mainParagraph.appendChild(button);
    //let br = document.createElement("br");
    //mainParagraph.appendChild(br);
}
function populatePlantData(p){
    let now = new Date();
    const data = {
        name: p,
        lastWatering : now,
        daysFrom : 0
    }
    localStorage.setItem(p, JSON.stringify(data));
    location.reload();
}

// function riseWarningIfNeeded(plantName,daysFromWatering,paragraph){
//     if (daysFromWatering > maxDaysWithNo){
//         console.log(paragraph["data"])
//         //const collection = document.getElementById("mainParagraph").children;
//         //console.log(collection)
//         //document.getElementById(JSON.parse(paragraph)).style.color = "red";
//         //alert("WARNING: " + plantName + " has not been watered since" + maxDaysWithNo.toString() + " days." );
//     }
// }







