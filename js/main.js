
// start Setting box===========================================
// =======================================================

let icon = document.querySelector(".spin-icon");
let settingBox = document.querySelector(".setting-box ")

icon.addEventListener("click",function() {
    document.querySelector(".setting-box .spin-icon .fa-gear").classList.toggle("fa-spin");
    settingBox.classList.toggle("open");
})

// ---------------------------------switch colors 

let mainColor = localStorage.getItem("local-color")

if (mainColor !== null) {
    document.documentElement.style.setProperty("--main-color", mainColor);
    
    document.querySelectorAll(".colors-list li").forEach(element =>{
        
        element.classList.remove("active");
        
        if (element.dataset.color === mainColor) {
            
            element.classList.add("active");
            
        }
        
    })
}

let colorLis = document.querySelectorAll(".setting-box .content ul li "); 

colorLis.forEach(li => {
    
    li.addEventListener("click", (e) => {
        
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        
        localStorage.setItem("local-color", e.target.dataset.color);
        
        e.target.parentElement.querySelectorAll(".active").forEach(element =>{
            
            element.classList.remove("active");
            
        })
        
        e.target.classList.add("active");
        
        
    })
})

// ---------------------------------random pg 
// select the landing- page 
let landingPage = document.querySelector(".landing-page");

// array of imgs 
let imgsArray = [
    "https://raw.githubusercontent.com/mahmoudniazy/Mahmoud-Templete-6/main/img/01.jpg",
    "https://raw.githubusercontent.com/mahmoudniazy/Mahmoud-Templete-6/main/img/02.jpg",
    "https://raw.githubusercontent.com/mahmoudniazy/Mahmoud-Templete-6/main/img/03.jpg",
    "https://raw.githubusercontent.com/mahmoudniazy/Mahmoud-Templete-6/main/img/04.jpg",
    "https://raw.githubusercontent.com/mahmoudniazy/Mahmoud-Templete-6/main/img/05.jpg",
    "https://raw.githubusercontent.com/mahmoudniazy/Mahmoud-Templete-6/main/img/06.jpg",
    "https://raw.githubusercontent.com/mahmoudniazy/Mahmoud-Templete-6/main/img/07.jpg",
    "https://raw.githubusercontent.com/mahmoudniazy/Mahmoud-Templete-6/main/img/08.jpg",
    "https://raw.githubusercontent.com/mahmoudniazy/Mahmoud-Templete-6/main/img/09.jpg",
    "https://raw.githubusercontent.com/mahmoudniazy/Mahmoud-Templete-6/main/img/10.jpg"
];


let toggle = document.querySelector(".random-pg span");
let cyr = document.querySelector(".random-pg span .cyr");

let switchInterval;

const setBackgroundImage = () => {
    let randomNumber = Math.floor(Math.random() * imgsArray.length);
    landingPage.style.backgroundImage = `url("${imgsArray[randomNumber]}")`;
    localStorage.setItem("backgroundImage", landingPage.style.backgroundImage);
};

const checkLocalStorage = () => {
    if (localStorage.getItem("cyrClass")) {
        cyr.classList.add(localStorage.getItem("cyrClass"));
        toggle.classList.toggle("red");
    }
    if (localStorage.getItem("backgroundImage")) {
        landingPage.style.backgroundImage = localStorage.getItem("backgroundImage");
    }
    if (cyr.classList.contains("no")) {
        clearInterval(switchInterval);
    } else {
        switchInterval = setInterval(setBackgroundImage, 10000);
    }
};
checkLocalStorage();

toggle.addEventListener("click", () => {
    cyr.classList.toggle("no");
    toggle.classList.toggle("red");
    localStorage.setItem("cyrClass", cyr.classList.contains("no") ? "no" : "");
    let check = cyr.classList.contains("no");
    if (check) {
        clearInterval(switchInterval);
    } else {
        switchInterval = setInterval(setBackgroundImage, 10000);
    }
});

//  start show bullet 

let bulletToggle = document.querySelector(".show-bullets span");
let bulletCyr = document.querySelector(".show-bullets  span .cyr");
let navBullets = document.querySelector(".nav-bullets");

let savedValue = localStorage.getItem("cyrClassBullet");
if (savedValue === "no") {
    bulletCyr.classList.add("no");
    bulletToggle.classList.add("red");
    navBullets.style.display = "none";
}

bulletToggle.addEventListener("click", () => {
    bulletCyr.classList.toggle("no");
    bulletToggle.classList.toggle("red");
    navBullets.style.display = bulletCyr.classList.contains("no") ? "none" : "block";
    localStorage.setItem("cyrClassBullet", bulletCyr.classList.contains("no") ? "no" : "");
});

//  end show bullet 

// end Setting box===========================================
// =======================================================
// start bullet===========================================
// =======================================================

let Allbullet= document.querySelectorAll(".nav-bullets .bullet")
let Alllinks = document.querySelectorAll(".landing-page .links li a ");

function scroll (elements) {
    elements.forEach(ele => {
        ele.addEventListener("click", (e) => {
            e.preventDefault();

                document.querySelector(e.target.dataset.section).scrollIntoView({
                    behavior: "smooth"
                });

            });
    });

}
scroll(Allbullet);
scroll(Alllinks);

// end bullet===========================================
// =======================================================

// start skills section 
// ==================================================

let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
    
    let skillsOffSetTop = ourSkills.offsetTop;
    
    let skillsOuterHeight = ourSkills.offsetHeight;    
    
    let windowHeight = this.innerHeight;
    
    let windowScrollTop = this.pageYOffset;
    
    let res = windowScrollTop >= (skillsOffSetTop + skillsOuterHeight - windowHeight)
    let allSkillls = document.querySelectorAll(".skills-box .skill-prog span")
    if (res) {
        
        allSkillls.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
        
    }else if (!res) {
        allSkillls.forEach(skill => {
            skill.style.width = 0;
        })
    };
    
};

// end skills section 
// ==================================================
// start Gallery
// ==================================================

let gallery = document.querySelectorAll(".gallery img");

gallery.forEach(img => {

    img.addEventListener("click" , () => {

        let overlay = document.createElement("div");
        overlay.className= "overlay";
        document.body.appendChild(overlay);

        let popupBox = document.createElement("div");
        popupBox.className= "popupBox";

        let textEl = document.createElement("h3");
        let titleText = document.createTextNode(img.alt);
        textEl.appendChild(titleText);
        popupBox.appendChild(textEl);

        let popupImage = document.createElement("img");
        popupImage.src = img.src;
        popupBox.appendChild(popupImage);
        document.body.appendChild(popupBox);

        let xSpan = document.createElement("span");
        xSpan.className= "xspan";
        let spantext = document.createTextNode("X");
        xSpan.appendChild(spantext);
        popupBox.appendChild(xSpan);

    });

});

document.addEventListener("click", (e)=> {

    if (e.target.className === "xspan") {

        e.target.parentNode.remove();
        document.querySelector(".overlay").remove();

    }

})
// end Gallery
// ==================================================
// start toggle menu ===============================

let bar= document.querySelector(".landing-page .header-links .bar")
let menu= document.querySelector(".landing-page .header-links ul")

document.addEventListener("click", (e)=> {
    if (e.target === bar || bar.contains(e.target)) {
        bar.classList.toggle("appear");
        menu.classList.toggle("open");
    } else if (e.target !== menu && e.target !== bar) {
        bar.classList.remove("appear");
        menu.classList.remove("open");
    }
});
// end toggle menu ==================================
