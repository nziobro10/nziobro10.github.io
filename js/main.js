const mainParagraph = document.getElementById("mainParagraph");
const title = document.getElementById("title");
const addPlantButton = document.getElementById("addPlant");

const storageSize = localStorage.length;
console.log(storageSize);

if ( storageSize == 0 ){
    mainParagraph.innerText = "No plants still :(";
}else{
    for (let i = 0; i < storageSize; i++){
        console.log(localStorage.key(i));
        render(localStorage.key(i));
    }
}

function addPlant() {
    let plant = prompt("Please enter plant name", "juka_gloriosa");
    if (plant != null && localStorage.getItem(plant) === null) {
        let now = new Date();
        const data = {
            name: plant,
            lastWatering : now,
            daysFrom : "0"
        }
        localStorage.setItem(plant, JSON.stringify(data));
    }else{
        alert("PLANT_ALREADY_EXISTS");
    }
    alert("PLANT ADDED. REFRESH THE PAGE...");
}

function render(p){
    let values = JSON.parse(localStorage.getItem(p));
    const node = document.createTextNode("NAME : " + values["name"] + "\nLAST WATERING " + values["lastWatering"] + "\nDAYS FROM WATERING : " + values["daysFrom"] + "\n");
    mainParagraph.appendChild(node);
}

function clearData() {
    localStorage.clear();
}











