let allSurahs = [];

fetch("https://api.alquran.cloud/v1/surah")
.then(res => res.json())
.then(data => {
    allSurahs = data.data;
    displaySurahs(allSurahs);
});

function displaySurahs(list) {

    let container = document.getElementById("surahList");
    container.innerHTML = "";

    list.forEach(surah => {

        let li = document.createElement("li");
        li.innerText = surah.number + ". " + surah.englishName;

        li.onclick = function () {
            loadSurah(surah.number);
        };

        container.appendChild(li);
    });
}


// SEARCH
document.getElementById("search").addEventListener("keyup", function () {

    let value = this.value.toLowerCase();

    let filtered = allSurahs.filter(s =>
        s.englishName.toLowerCase().includes(value)
    );

    displaySurahs(filtered);
});


// LOAD SURAH
function loadSurah(number) {

    document.getElementById("home").style.display = "none";

    fetch(`https://api.alquran.cloud/v1/surah/${number}`)
    .then(res => res.json())
    .then(data => {

        let ayahs = data.data.ayahs;
        let output = "";

        ayahs.forEach(a => {
            output += `<p>${a.numberInSurah}. ${a.text}</p>`;
        });

        document.getElementById("surahPage").style.display = "block";

        document.getElementById("surahPage").innerHTML = `
            <h2>${data.data.englishName}</h2>
            ${output}
            <br>
            <button onclick="showHome()">⬅ Back</button>
        `;
    });
}


// NAV FUNCTIONS
function showHome() {
    document.getElementById("home").style.display = "block";
    document.getElementById("aboutPage").style.display = "none";
    document.getElementById("surahPage").style.display = "none";
}

function showAbout() {
    document.getElementById("home").style.display = "none";
    document.getElementById("aboutPage").style.display = "block";
    document.getElementById("surahPage").style.display = "none";
}