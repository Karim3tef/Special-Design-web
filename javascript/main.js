//Check if there's local storage Color Option

let mainColors = localStorage.getItem("color_option");


if (mainColors !== null) {

    // console.log("Local Storage Is Not Empty , Now You Can Set It On Root");
    // console.log(localStorage.getItem("color_option"));

    document.documentElement.style.setProperty('--main-color', mainColors);

    //Remove active class From All colors List Item

    document.querySelectorAll(".colors-list li").forEach(element => {

        element.classList.remove("active");

        //Add Active Class On Element With Data-color === Local Storage Item

        if (element.dataset.color === mainColors){

            // Add Active Class

            element.classList.add("active");

        }   
    });


}


//Random BackGround Option 

let backgroundOption = false;

//Variable To Control The Background Interval

let backgroundInterval; 

// Check if There is localStorage Random background Item

let backgroundLocalItem = localStorage.getItem("background_option");

//Check If Random Background Local Storage Is Not Empty

if (backgroundLocalItem !== null){

    if (backgroundLocalItem === 'true') {

        backgroundOption = true;


    } else {

        backgroundOption = false;

    }

    // REmove Active Class From All Spans 

    document.querySelectorAll(".random-backgrounds span").forEach (element => {

        element.classList.remove("active");

    });

    if (backgroundLocalItem === 'true') {

        document.querySelector(".random-backgrounds .yes").classList.add("active");

    } else {

        document.querySelector(".random-backgrounds .no").classList.add("active");

    }

}

console.log()

// Toggle Spin Class on Icon
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
    
    //Toggle class fa-spin For Rotation on Self 

    this.classList.toggle("fa-spin");

    //Toggle Class Open On Main Settings Box    

    document.querySelector(".settings-box").classList.toggle("open");

};

// Switch Color

const colorLi = document.querySelectorAll(".colors-list li");

//Loop On All List Items

colorLi.forEach(li =>{

    //Loop On List Items

    li.addEventListener("click", (e) => {

        //click On Every List Items
        
        //Set Color On Root

        document.documentElement.style.setProperty('--main-color', e.target.dataset.color)

        //Set Color On local Storage

        localStorage.setItem("color_option", e.target.dataset.color);

        handleActive(e);
        
    });


    
});




// Switch Random Background Option

const RandomBackEl = document.querySelectorAll(".random-backgrounds span");

//Loop On All Spans

RandomBackEl.forEach(span =>{

    //click On Every Span

    span.addEventListener("click", (e) => {

        handleActive(e);

        if (e.target.dataset.background === 'yes') {

            backgroundOption = true;

            randomizeImgs();

            localStorage.setItem("background_option", true);

        } else{

            backgroundOption = false;

            clearInterval(backgroundInterval);

            localStorage.setItem("background_option", false);

        }

        
    });


    
});


// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

//Get Array Of Images

let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"]


//Function To Randomize Images

function randomizeImgs() {

    if (backgroundOption === true){

        backgroundInterval = setInterval(() =>{

            //Get Random Number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
        
            // Change Background Image Url
            landingPage.style.backgroundImage = 'url("images/'+ imgsArray[randomNumber] +'")' ;
        
        
        } ,5000)
        
    }

}

randomizeImgs();


//Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

    //Skills Offset Top
    let skillsOffsetTop = ourSkills.offsetTop;

    //skills Outer Height
    let skillsOuterheight = ourSkills.offsetHeight;

    //Window Height
    let windowHeight = this.innerHeight;

    //Window Scroll Top
    let windowScrollTop = this.pageYOffset;


    if (windowScrollTop > (skillsOffsetTop + skillsOuterheight - windowHeight)) {

        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

        allSkills.forEach( skill  => {

            skill.style.width = skill.dataset.progress;

        });

    }


};


//Create popup With Image
let OurGallery = document.querySelectorAll(".gallery img");

OurGallery.forEach(img => {

    img.addEventListener('click', (e) => {

        //Create OverLay Element
        let overlay = document.createElement("div");

        //Add Class To Overlay
        overlay.className = 'popup-overlay';

        //Append Overlay To The Body
        document.body.appendChild(overlay);

        //Create The Popup
        let popupBox = document.createElement("div");

        //Add Class To The Popup Box
        popupBox.className = 'popup-box';
        
        if (img.alt !== null) {
            //Create Heading
            let imgHeading = document.createElement("h3");

            //Create Text For Heading
            let imgText = document.createTextNode(img.alt);

            //Append The Text To the Heading
            imgHeading.appendChild(imgText);

            //Append The Text To the Popup Box
            popupBox.appendChild(imgHeading);
        }

        //Create The Img
        let popupImage = document.createElement("img");

        //Set Image Src
        popupImage.src = img.src;

        //Add Image To Popup Box
        popupBox.appendChild(popupImage);

        //Append The Popup To Body
        document.body.appendChild(popupBox);

        //Create the Close Span
        let closeButton = document.createElement("span");

        //Create The Close Button Text 
        let closeButtonText = document.createTextNode("X");

        closeButton.appendChild(closeButtonText);

        //Add class To Close Button
        closeButton.className = "close-button";

        //Add Close To the Popup Box
        popupBox.appendChild(closeButton);



    });

});


//Close Popup
document.addEventListener('click', (e) => {

    if (e.target.className === 'close-button') {

        //Remove The Crruent Popup
        e.target.parentNode.remove();

        document.querySelector(".popup-overlay").remove();

    }

});


//Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
 
//Select All Links
const allLinks = document.querySelectorAll(".links a");


function scrollToSomeWhere (elements) {
        
    elements.forEach(ele => {
    
        ele.addEventListener("click", (e) => {

            e.preventDefault();

            document.querySelector(e.target.dataset.section).scrollIntoView({
                
                behavior: 'smooth'

            });

        });

    });

}

scrollToSomeWhere(allBullets);
scrollToSomeWhere(allLinks);


//Handle Active on self
function handleActive (ev) {

    
    // Remove Active Class From All Spans

    ev.target.parentElement.querySelectorAll(".active").forEach(element => {

        element.classList.remove("active");

    });
    //Add Active Class On Self 

    ev  .target.classList.add("active");

}




let bulletSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocal = localStorage.getItem("bullets-option");

if (bulletLocal !== null) {

    bulletSpan.forEach(span => {

        span.classList.remove("active");



    });

    if (bulletLocal === 'block') {

        bulletsContainer.style.display = 'block';
    
        document.querySelector(".bullets-option .yes").classList.add("active");
    
    } else {
    
        bulletsContainer.style.display = 'none';
    
        document.querySelector(".bullets-option .no").classList.add("active");
    
    }

}

bulletSpan.forEach(span =>{

    span.addEventListener("click", (e) =>{

        if (span.dataset.display === "show") {
            
            bulletsContainer.style.display = 'block';

            localStorage.setItem("bullets-option", 'block');

        } else {
            
            bulletsContainer.style.display = 'none';
            
            localStorage.setItem("bullets-option", 'none');

        }

        handleActive(e);

    });

});

//Reset Button
document.querySelector(".reset-option").onclick = function(){

    localStorage.clear();

    // localStorage.removeItem("color_option");
    // localStorage.removeItem("bullets-option");
    // localStorage.removeItem("background_option");

    //Reload Window
    window.location.reload();

};

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");

let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
    
    e.stopPropagation();

    //Toggle Class "Menu-active" on Button 
    this.classList.toggle("menu-active");

    //Toggle Class "open" on Links
    tLinks.classList.toggle("open");

};

//click Any where OutSide Menu And Toggle Button

document.addEventListener("click" , (e) => {

    if (e.target !== toggleBtn && e.target !== tLinks) {

        // Check if Menu Is Open
        if (tLinks.classList.contains("open")) {
            
            toggleBtn.classList.toggle("menu-active");
            
            tLinks.classList.toggle("open");

        }

    }
    

});

tLinks.onclick = function (e) {
    e.stopPropagation();
}
