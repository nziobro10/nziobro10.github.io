const mainParagraph = document.getElementById("mainParagraph");
const title = document.getElementById("title");
const addPlantButton = document.getElementById("addPlant");

const maxDaysWithNoWatering = 12;
const storageSize = localStorage.length;
//console.log(storageSize);

if ( storageSize == 0 ){
    mainParagraph.innerText = "You have no plants in your garden. Click 'ADD PLANT' to add...";
}else{
    var sortedDaysFromArray = getSortedDaysFrom();
    //console.log(sortedDaysFromArray);
    for ( let i = 0; i < sortedDaysFromArray.length; i++ ){
        //console.log("LOCAL STORAGE: " + i + " " + localStorage.key(i));
        //console.log("NAME Z SORTED : " + i + " " + sortedDaysFromArray[i]["name"]);
        //console.log("LW Z SORTED: " + sortedDaysFromArray[i]["lWatering"]);
        render(sortedDaysFromArray[i]["name"],
            sortedDaysFromArray[i]["lWatering"],
            sortedDaysFromArray[i]["duration"])
    }
}

function addPlant() {
    let plant = prompt("Please enter plant name:", "E.X yucca_rostrata");
    if (plant != null && localStorage.getItem(plant) === null) {
        populatePlantData(plant);
        location.reload();
        //alert("PLANT ADDED. REFRESH THE PAGE...");
    }else if ( localStorage.getItem(plant) != null ){
        alert("PLANT_ALREADY_EXISTS");
        location.reload();
    }else{
        alert("PLANT_HAS_NOT_BEEN_ADDED");
    }
}

function render(name, lW, dFrom){
    //let values = JSON.parse(localStorage.getItem(p));
    //console.log("lastW: " + lWater);
    //console.log("actual : " + actualTime);
    //console.log("daysFROM : " + dFrom);
    const node = document.createTextNode(name + " | LAST WATERING : " + new Date(lW).toLocaleString('en-GB') + " | DAYS FROM : " + dFrom);
    const newPlant = document.createElement('p');
    if (dFrom >= maxDaysWithNoWatering){
        newPlant.style.background = "red";
        newPlant.style.color = "yellow";
    }
    newPlant.appendChild(node);
    mainParagraph.appendChild(newPlant);
    addWateringButton(name);
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
function getDuration(actual,lW){
    let diff = actual - lW;
    var daysDifference = Number.parseFloat(diff/1000/60/60/24).toFixed(1);
    return daysDifference;
}

function addWateringButton(plantName){
    var button = document.createElement('button');
    button.innerHTML = plantName + ' WATERED!';
    button.onclick = function(){
        if (confirm('YOU are a good man:) confirm ??')) {
            populatePlantData(plantName);
        }
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
        lWatering: now,
        daysFrom: 0
    }
    localStorage.setItem(p, JSON.stringify(data));
    location.reload();
}

function getSortedDaysFrom(){
    var actualTime = new Date().getTime();
    var daysFromArray = [];
    var daysFromArraySorted = [];
    for (let i = 0; i < storageSize; i++){
        let values = JSON.parse(localStorage.getItem(localStorage.key(i)));
        let lWater = new Date(values["lWatering"]).getTime();
        let daysFrom = getDuration(actualTime, lWater);
        var plantItem = {
            id: i,
            name: values["name"],
            lWatering: values["lWatering"],
            duration: daysFrom
        };
        daysFromArray.push(plantItem);
    }
    daysFromArraySorted = sortingAlgorithm(daysFromArray);
    return daysFromArraySorted;
}

function sortingAlgorithm(array){
    let result = [];
    for ( let i = 0; i < array.length; i++){
        for ( let j = i + 1; j < array.length; j++){
            let tmp = [];
            //let tmp_d = 0;
            //let tmp_id = 0;
            //let tmp_lw = 0;
            if ( parseFloat(array[i]["duration"]) < parseFloat(array[j]["duration"])){
                tmp = array[i];
                array[i] = array[j];
                array[j] = tmp;
                //tmp_d = array[i]["duration"];
                //array[i]["duration"] = array[j]["duration"];
                //array[j]["duration"] = tmp_d;
                //tmp_id = array[i]["id"];
                //array[i]["id"] = array[j]["id"];
                //array[j]["id"] = tmp_id;
                //tmp_lw = array[i]["lWatering"];
                //array[i]["lWatering"] = array[j]["lWatering"];
                //array[j]["lWatering"] = tmp_id;
            }
        }
    result.push(array[i]);
    }
    return result;
}