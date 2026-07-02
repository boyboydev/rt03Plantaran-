/* ===========================
   NAVBAR SCROLL
=========================== */

const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {

    if(window.scrollY > 80){
        nav.classList.add("scrolled");
    }else{
        nav.classList.remove("scrolled");
    }

});


/* ===========================
   SCROLL ANIMATION
=========================== */

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }

    });

},{
    threshold:.2
});

document.querySelectorAll(".card,.gallery img,.contact-card").forEach(el=>{
    observer.observe(el);
});


/* ===========================
   PARTICLE BACKGROUND
=========================== */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle{

    constructor(){

        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;

        this.size=Math.random()*3+1;

        this.speedX = (Math.random()-0.5)*0.4;
        this.speedY = (Math.random()-0.5)*0.4;

    }

    update(){

        this.x += this.speedX;
        this.y += this.speedY;

        if(this.x>canvas.width) this.x=0;
        if(this.x<0) this.x=canvas.width;

        if(this.y>canvas.height) this.y=0;
        if(this.y<0) this.y=canvas.height;

    }

    draw(){

        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);

        ctx.fillStyle="rgba(0,255,255,.7)";
        ctx.shadowBlur=35;
        ctx.shadowColor="#00ffff";
        ctx.fill();

    }

}

for(let i=0;i<130;i++){
    particles.push(new Particle());
}


function connect(){

    for(let a=0;a<particles.length;a++){

        for(let b=a;b<particles.length;b++){

            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;

            let distance = Math.sqrt(dx*dx + dy*dy);

            if(distance < 130){

                ctx.beginPath();

                ctx.strokeStyle = "rgba(255,255,255,.08)";
                ctx.lineWidth = 1;

                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);

                ctx.stroke();

            }

        }

    }

}


/* ===========================
   LIGHTBOX GALERI
=========================== */

const images = document.querySelectorAll(".gallery img");

images.forEach(img=>{

    img.addEventListener("click",()=>{

        const overlay=document.createElement("div");

        overlay.style.position="fixed";
        overlay.style.top="0";
        overlay.style.left="0";
        overlay.style.width="100%";
        overlay.style.height="100%";
        overlay.style.background="rgba(0,0,0,.9)";
        overlay.style.display="flex";
        overlay.style.alignItems="center";
        overlay.style.justifyContent="center";
        overlay.style.zIndex="9999";
        overlay.style.cursor="pointer";

        const photo=document.createElement("img");

        photo.src=img.src;
        photo.style.maxWidth="90%";
        photo.style.maxHeight="90%";
        photo.style.borderRadius="15px";
        photo.style.boxShadow="0 0 40px rgba(0,255,255,.5)";

        overlay.appendChild(photo);

        document.body.appendChild(overlay);

        overlay.onclick=()=>{

            overlay.remove();

        }

    });

});

/* =====================
KALENDER
===================== */

const monthYear=document.getElementById("month-year");
const daysContainer=document.getElementById("calendar-days");
const todayText=document.getElementById("today");

const months=[
"Januari","Februari","Maret","April","Mei","Juni",
"Juli","Agustus","September","Oktober","November","Desember"
];

const weekdays=[
"Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"
];

const pasaran = [
    "Legi",
    "Pahing",
    "Pon",
    "Wage",
    "Kliwon"
];

let date=new Date();

let currentMonth=date.getMonth();
let currentYear=date.getFullYear();

function renderCalendar(month,year){

daysContainer.innerHTML="";

monthYear.innerHTML=months[month]+" "+year;
updateIslamicDate(month, year);

const firstDay=new Date(year,month,1).getDay();

const totalDays=new Date(year,month+1,0).getDate();

for(let i=0;i<firstDay;i++){

const empty=document.createElement("div");

empty.classList.add("other-month");

daysContainer.appendChild(empty);

}

for(let d=1;d<=totalDays;d++){

const day = document.createElement("div");

const current = new Date(year, month, d);

day.classList.add("day");

day.innerHTML = `
    <div class="date-number">${d}</div>
    <div class="pasaran">${getPasaran(current)}</div>
`;

if(

d===new Date().getDate() &&

month===new Date().getMonth() &&

year===new Date().getFullYear()

){

day.classList.add("today");

}

daysContainer.appendChild(day);

}

}

renderCalendar(currentMonth,currentYear);

todayText.innerHTML=

"Hari ini : "+

weekdays[new Date().getDay()]+

", "+

new Date().getDate()+" "+

months[new Date().getMonth()]+" "+

new Date().getFullYear();


document.getElementById("prev").onclick=()=>{

currentMonth--;

if(currentMonth<0){

currentMonth=11;

currentYear--;

}

renderCalendar(currentMonth,currentYear);

}

document.getElementById("next").onclick=()=>{

currentMonth++;

if(currentMonth>11){

currentMonth=0;

currentYear++;

}



renderCalendar(currentMonth,currentYear);

}

function updateIslamicDate(month, year){

    const islamic = document.getElementById("islamic-date");

    const selectedDate = new Date(year, month, 1);

    const formatter = new Intl.DateTimeFormat(
        "id-TN-u-ca-islamic",
        {
            month:"long",
            year:"numeric"
        }
    );

    let result = formatter.format(selectedDate);

    result = result
        .replace("Muharam","Sura")
        .replace("Safar","Sapar")
        .replace("Rabiulawal","Mulud")
        .replace("Rabiul Akhir","Bakda Mulud")
        .replace("Rabiulakhir","Bakda Mulud")
        .replace("Jumadilawal","Jumadil Awal")
        .replace("Jumadilakhir","Jumadil Akhir")
        .replace("Rajab","Rejeb")
        .replace("Syakban","Ruwah")
        .replace("Ramadan","Pasa")
        .replace("Syawal","Sawal")
        .replace("Zulkaidah","Zulkaidah")
        .replace("Zulhijah","Zulhijah");

    islamic.innerHTML = result;

}

function getPasaran(date){

    const pasaran = [
        "Legi",
        "Pahing",
        "Pon",
        "Wage",
        "Kliwon"
    ];

    // Acuan: 2 Juli 2026 = Kliwon
    const reference = new Date(2026, 6, 2); // Bulan Juli = 6
    const referencePasaran = 4; // Kliwon

    const diff = Math.floor((date - reference) / 86400000);

    let index = (referencePasaran + diff) % 5;

    if(index < 0){
        index += 5;
    }

    return pasaran[index];

}

    

/*====================
JAM DIGITAL
====================*/

function updateClock(){

const now=new Date();

document.getElementById("clock").innerHTML=

now.toLocaleTimeString("id-ID");

}

setInterval(updateClock,1000);

updateClock();

/*====================
CUACA DESA BAYU
====================*/

fetch("https://api.open-meteo.com/v1/forecast?latitude=-8.16&longitude=114.20&current=temperature_2m,weather_code")

.then(res=>res.json())

.then(data=>{

document.getElementById("temperature").innerHTML=data.current.temperature_2m+"°C";

let code=data.current.weather_code;

let desc="";

let icon="☁️";

if(code==0){

desc="Cerah";

icon="☀️";

}else if(code<=3){

desc="Berawan";

icon="⛅";

}else if(code<=67){

desc="Hujan";

icon="🌧";

}else{

desc="Cuaca Berubah";

icon="🌥";

}

document.getElementById("weather-icon").innerHTML=icon;

document.getElementById("weather-desc").innerHTML=desc;

});

/*====================
JADWAL SHOLAT
====================*/

const today=new Date();

const tanggal=today.getDate();

const bulan=today.getMonth()+1;

const tahun=today.getFullYear();

fetch(`https://api.aladhan.com/v1/timingsByCity/${tanggal}-${bulan}-${tahun}?city=Banyuwangi&country=Indonesia&method=11`)

.then(res=>res.json())

.then(data=>{

const t=data.data.timings;

document.getElementById("subuh").innerHTML=t.Fajr;

document.getElementById("dzuhur").innerHTML=t.Dhuhr;

document.getElementById("ashar").innerHTML=t.Asr;

document.getElementById("maghrib").innerHTML=t.Maghrib;

document.getElementById("isya").innerHTML=t.Isha;

});

VANTA.NET({
    el: ".background-3d",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200,
    minWidth: 200,
    color: 0x00e5ff,
    backgroundColor: 0x020817,
    points: 12,
    maxDistance: 20,
    spacing: 18
});

/*====================
SCROLL TOP
====================*/

const scrollBtn=document.getElementById("scrollTop");

window.addEventListener("scroll",()=>{

    if(window.scrollY>400){

        scrollBtn.classList.add("show");

    }else{

        scrollBtn.classList.remove("show");

    }

});

scrollBtn.onclick=()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

};

/* ==========================
HAMBURGER MENU
========================== */

const menuToggle=document.getElementById("menuToggle");

const navMenu=document.getElementById("navMenu");

menuToggle.onclick=()=>{

    navMenu.classList.toggle("active");

}

document.querySelectorAll("#navMenu a").forEach(link=>{

    link.onclick=()=>{

        navMenu.classList.remove("active");

    }

});