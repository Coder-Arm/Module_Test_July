const search = document.getElementById("search");

const ipData = JSON.parse(localStorage.getItem("ip-info"));
 document.querySelector(".ip-address").innerText = ipData.query;
 document.getElementById("lat").innerText = ipData.lat;
 document.getElementById("long").innerText = ipData.lon;
 document.getElementById("city").innerText = ipData.city;
 document.getElementById("region").innerText = ipData.region;
 document.getElementById("org").innerText = ipData.org;
 document.getElementById("host").innerText = ipData.isp;
document.getElementById("timezone").innerText = ipData.timezone;
 document.querySelector("iframe").src = `https://maps.google.com/maps?q=${ipData.lat}, ${ipData.lon}&z=15&output=embed`;

 let dateTimeStr = new Date().toLocaleString("en-US", { timeZone: ipData.timeZone });
// console.log(dateTimeStr);

let date = new Date(dateTimeStr);
let year = date.getFullYear();
let month = ("0" + (date.getMonth() + 1)).slice(-2);
let currDate =  ("0" + date.getDate()).slice(-2);
let myDate = year+"-"+month+"-"+currDate;
document.getElementById('myDate').innerText = myDate+" , ";
document.getElementById('myTime').innerText = dateTimeStr.split(",")[1];
document.getElementById("pincode").innerText = ipData.zip;


function renderOffices(data){
    document.querySelector(".offices").innerHTML = "";
      data.forEach(item => {
      const card = document.createElement("div");
      card.className = "office-card";
     card.innerHTML = `<div>Name : <span>${item.Name}</span></div>
     <div>Branch Type : <span>${item.BranchType}</span></div>
     <div>Delivery Status : <span>${item.DeliveryStatus}</span></div>
     <div>District : <span>${item.District}</span></div>
     <div>Division : <span>${item.Division}</span></div>
     `
     document.querySelector(".offices").appendChild(card);
});
}

async function fetchPins(){
    const response = await fetch(`https://api.postalpincode.in/pincode/${ipData.zip}`);
    const result = await response.json();
    document.getElementById("pincodes-found").innerText = result[0].Message;
    renderOffices(result[0].PostOffice);
    filterData(result[0].PostOffice);
}
fetchPins();


function filterData(data){
    search.addEventListener("input", ()=> {;
    let filteredData = data.filter(item => item.Name.toLowerCase().includes(search.value.toLowerCase().trim()));
    renderOffices(filteredData);
})
}
