const eventName =
document.getElementById("eventName");

const eventDate =
document.getElementById("eventDate");

const eventLocation =
document.getElementById("eventLocation");

const eventCategory =
document.getElementById("eventCategory");

const addBtn =
document.getElementById("addBtn");

const eventList =
document.getElementById("eventList");

const searchInput =
document.getElementById("searchInput");

const totalEvents =
document.getElementById("totalEvents");

const upcomingEvents =
document.getElementById("upcomingEvents");

let events =
JSON.parse(localStorage.getItem("events"))
|| [];

function saveData(){

localStorage.setItem(
"events",
JSON.stringify(events)
);

}

function updateStats(){

totalEvents.textContent =
events.length;

const today =
new Date().toISOString().split("T")[0];

const upcoming =
events.filter(
e => e.date >= today
).length;

upcomingEvents.textContent =
upcoming;

}

function displayEvents(data = events){

eventList.innerHTML = "";

data.forEach((event,index)=>{

const card =
document.createElement("div");

card.classList.add("event-card");

card.innerHTML = `
<div class="event-info">
<h3>${event.name}</h3>
<p>${event.date}</p>
<p>${event.location}</p>
<p>${event.category}</p>
</div>

<button
class="delete-btn"
onclick="deleteEvent(${index})">
Delete
</button>
`;

eventList.appendChild(card);

});

updateStats();

}

addBtn.addEventListener("click",()=>{

if(
eventName.value.trim()==="" ||
eventDate.value==="" ||
eventLocation.value.trim()===""
){
alert("Please fill all fields");
return;
}

events.push({

name:eventName.value,
date:eventDate.value,
location:eventLocation.value,
category:eventCategory.value

});

saveData();

displayEvents();

eventName.value="";
eventDate.value="";
eventLocation.value="";

});

function deleteEvent(index){

events.splice(index,1);

saveData();

displayEvents();

}

searchInput.addEventListener("input",()=>{

const keyword =
searchInput.value.toLowerCase();

const filtered =
events.filter(event=>

event.name
.toLowerCase()
.includes(keyword)

);

displayEvents(filtered);

});

displayEvents();
