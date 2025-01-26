const settingsBtn = document.querySelector(".gear-icon");
const settingsBox = document.querySelector(".settings-box");
const colorList = document.querySelectorAll(".color-list li");
const overlay = document.querySelector(".overlay");
const backOpts = document.querySelectorAll(".choose-ran input");
const nav = document.querySelectorAll(".list li a");
const skills = document.querySelector(".skills");
const landing = document.querySelector(".landing-page");

let arr = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"];
function ran(min, max) {
    return Math.floor(Math.random() * max) + min;
}
let backgroundInterval;
let randomBackground = JSON.parse(localStorage.getItem("random"));
function change() {
    if (randomBackground) {
        backgroundInterval = setInterval(() => {
            landing.style.backgroundImage = `url(../imgs/${
                arr[ran(0, 10)]
            }.jpg)`;
        }, 4000);
        backOpts[0].checked = true;
    } else {
        clearInterval(backgroundInterval);
        backOpts[1].checked = true;
    }
}
change();

backOpts[0].addEventListener("click", () => {
    localStorage.setItem("random", true);
    randomBackground = true;
    change();
});
backOpts[1].addEventListener("click", () => {
    localStorage.setItem("random", false);
    randomBackground = false;
    change();
});

//########################################################
if (localStorage.getItem("color")) {
    document.documentElement.style.setProperty(
        "--main-color",
        localStorage.getItem("color")
    );
}
function openSetting() {
    settingsBox.classList.toggle("active");
    settingsBtn.classList.toggle("active");
    overlay.classList.toggle("active");
    document.querySelector(".fa-gear").classList.toggle("fa-spin");
}
overlay.addEventListener("click", openSetting);
settingsBtn.addEventListener("click", openSetting);

colorList.forEach((e) => {
    e.style.background = e.dataset.color;
    if (e.dataset.color === localStorage.getItem("color")) {
        colorList.forEach((e) => {
            e.classList.remove("active");
        });
        e.classList.add("active");
    }
    e.addEventListener("click", (e) => {
        colorList.forEach((e) => {
            e.classList.remove("active");
        });
        e.target.classList.add("active");
        localStorage.setItem("color", e.target.dataset.color);
        document.documentElement.style.setProperty(
            "--main-color",
            localStorage.getItem("color")
        );
    });
});

nav.forEach((e) => {
    e.addEventListener("click", (e) => {
        nav.forEach((e) => {
            e.classList.remove("active");
        });
        e.target.classList.add("active");
    });
});

let homeIcon = document.querySelector(".home-icon");
function update() {
    let skillsOffsetTop = skills.offsetTop;
    let skillsHeight = skills.offsetHeight;
    let windowScroll = window.scrollY;
    let windowHeight = window.innerHeight;
    if (windowScroll > skillsOffsetTop + skillsHeight - windowHeight - 100) {
        let allSkills = document.querySelectorAll(".skills .skill-percent");
        allSkills.forEach((e) => {
            let progress = e.children;
            progress[0].style.width = e.dataset.percent;
        });
    }

    let landingHeight = landing.offsetHeight;

    if (windowScroll >= landingHeight - 100) {
        homeIcon.style.right = "-42px";
    } else {
        homeIcon.style.right = "250px";
    }

    if (windowScroll < 40) {
        nav.forEach((e) => {
            e.classList.remove("active");
        });
        nav[0].classList.add("active");
    }
}
window.onscroll = update;
window.onload = update;
homeIcon.addEventListener("click", () => {
    scrollTo(0, 0);
    nav.forEach((e) => {
        e.classList.remove("active");
    });
    nav[0].classList.add("active");
    if (settingsBtn.classList.contains("active")) {
        openSetting();
    }
});

const gallary = document.querySelectorAll(".gallary img");
gallary.forEach((img) => {
    img.addEventListener("click", (e) => {
        let overlay = document.createElement("div");
        document.body.append(overlay);
        overlay.classList.add("gallary-overlay");

        let popup = document.createElement("div");
        document.body.append(popup);
        popup.classList.add("popup-box");

        let image = document.createElement("img");
        image.src = img.src;
        popup.append(image);

        let exit = document.createElement("button");
        popup.append(exit);
        exit.innerHTML = "X";
        exit.classList.add("exit-button");
        exit.addEventListener("click", () => {
            popup.remove();
            overlay.remove();
        });
    });
});
