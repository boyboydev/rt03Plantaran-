// ==========================================
// JAM DIGITAL REAL-TIME
// ==========================================

function updateClock() {

    const now = new Date();

    const optionsTime = {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    };

    const optionsDate = {
        timeZone: "Asia/Jakarta",
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    const time = new Intl.DateTimeFormat(
        "id-ID",
        optionsTime
    ).format(now);

    const date = new Intl.DateTimeFormat(
        "id-ID",
        optionsDate
    ).format(now);

    document.getElementById("digital-clock").textContent =
        time;

    document.getElementById("digital-date").textContent =
        date;
}

updateClock();

setInterval(updateClock, 1000);


// ==========================================
// CUACA SONGGON
// Open-Meteo API
// ==========================================

async function fetchWeather() {

    const temperature =
        document.getElementById("weather-temp");

    const description =
        document.getElementById("weather-desc");

    const humidity =
        document.getElementById("weather-humidity");

    const wind =
        document.getElementById("weather-wind");

    const icon =
        document.getElementById("weather-icon");

    const refreshIcon =
        document.getElementById("weather-refresh-icon");


    refreshIcon.classList.add("fa-spin");

    description.textContent =
        "Mengambil data cuaca...";


    try {

        const url =
            "https://api.open-meteo.com/v1/forecast" +
            "?latitude=-8.2217" +
            "&longitude=114.2185" +
            "&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code" +
            "&timezone=Asia%2FJakarta";


        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Gagal mengambil data");
        }

        const data = await response.json();

        const current = data.current;


        // Suhu
        temperature.textContent =
            Math.round(current.temperature_2m);


        // Kelembapan
        humidity.textContent =
            current.relative_humidity_2m + "%";


        // Angin
        wind.textContent =
            Math.round(current.wind_speed_10m) + " km/h";


        // Deskripsi cuaca
        const weatherInfo =
            getWeatherDescription(current.weather_code);

        description.textContent =
            weatherInfo.description;


        // Icon
        icon.innerHTML =
            `<i class="${weatherInfo.icon}"></i>`;

    }

    catch (error) {

        console.error(error);

        temperature.textContent = "--";

        humidity.textContent = "--%";

        wind.textContent = "-- km/h";

        description.textContent =
            "Gagal mengambil data cuaca";

        icon.innerHTML =
            '<i class="fa-solid fa-cloud-exclamation"></i>';

    }

    finally {

        refreshIcon.classList.remove("fa-spin");

    }
}


// ==========================================
// KODE CUACA OPEN-METEO
// ==========================================

function getWeatherDescription(code) {

    if (code === 0) {

        return {
            description: "Cerah",
            icon: "fa-solid fa-sun"
        };

    }

    if (code === 1 || code === 2) {

        return {
            description: "Cerah Berawan",
            icon: "fa-solid fa-cloud-sun"
        };

    }

    if (code === 3) {

        return {
            description: "Berawan",
            icon: "fa-solid fa-cloud"
        };

    }

    if (
        code === 45 ||
        code === 48
    ) {

        return {
            description: "Berkabut",
            icon: "fa-solid fa-smog"
        };

    }

    if (
        code >= 51 &&
        code <= 57
    ) {

        return {
            description: "Gerimis",
            icon: "fa-solid fa-cloud-rain"
        };

    }

    if (
        code >= 61 &&
        code <= 67
    ) {

        return {
            description: "Hujan",
            icon: "fa-solid fa-cloud-showers-heavy"
        };

    }

    if (
        code >= 71 &&
        code <= 77
    ) {

        return {
            description: "Salju",
            icon: "fa-solid fa-snowflake"
        };

    }

    if (
        code >= 80 &&
        code <= 82
    ) {

        return {
            description: "Hujan Deras",
            icon: "fa-solid fa-cloud-showers-heavy"
        };

    }

    if (
        code >= 95 &&
        code <= 99
    ) {

        return {
            description: "Badai Petir",
            icon: "fa-solid fa-cloud-bolt"
        };

    }


    return {
        description: "Tidak diketahui",
        icon: "fa-solid fa-cloud"
    };
}


// Jalankan cuaca saat halaman dibuka
fetchWeather();


// ==========================================
// SMOOTH SCROLL
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const target =
            document.querySelector(this.getAttribute("href"));

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});
