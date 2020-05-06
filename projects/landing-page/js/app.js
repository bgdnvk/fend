/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
//start time for performance
const startTime = performance.now();

//get header and navbar
const pageHeader = document.querySelector(".page__header");
const navBarMenu = document.querySelector(".navbar__menu");

const navBarList = document.getElementById("navbar__list");
//get sections of the page
const sections = document.querySelectorAll("section");

const pageFooter = document.querySelector(".page__footer");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav(){
    //making a fragment for better performance as per lesson 5
    const fragment = document.createDocumentFragment();

    for(let i = 0; i < sections.length; i++){
        const newLi = document.createElement("li");
        //TODO: maybe change text for a button
        newLi.innerHTML =`<a href="#${sections[i].id}">${
            //selecting the inner text (inner html) of the header
            sections[i].querySelector("h2").innerText}
            </a>`;
        //adding some style
        newLi.style.margin = "1%";
        newLi.style.padding = "1%";
        newLi.style.border = "1px solid AntiqueWhite";
        newLi.style.background = "LightGray";
        //making it flex so it displays properly
        newLi.style.display = "flex";
        newLi.style.justifyContent = "center";
        //making the Li extend
        newLi.style.flexGrow = "1";
        
        //adding the new element to the fragment
        fragment.appendChild(newLi);

        //adding a click listener
        clicked(newLi, sections[i]);
    }
    //checking if it works properly
    //document.body.appendChild(fragment);
    navBarList.appendChild(fragment);
    //adding some style to the navbar itself
    navBarList.style.display = "flex";
}



// Scroll to section on link click
function clicked(e, section){
     e.addEventListener("click",
    function(){
        //removing all background before clicking on the new section
        removeBackground();
        // Set sections as active
        section.classList.add("your-active-class")
    }
    );    
}
//remove your-active-class css background
function removeBackground(){
    for(let i = 0; i < sections.length; i++){
        sections[i].classList.remove("your-active-class");
    }
}

//original function from: https://vanillajstoolkit.com/helpers/isinviewport/
// Add class 'active' to section when near top of viewport
function isInViewport(e){
    let rect = e.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Scroll to anchor ID using scrollTO event
function scrolling(){
    window.addEventListener("scroll", function(){
        for (let section of sections){
            if(isInViewport(section)){
                section.classList.add("your-active-class");
            } else {
                section.classList.remove("your-active-class");
            }
        }
    })
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
function page(){
    //build nav bar
    buildNav();
    //run scroll func
    scrolling();
}
page();


const endTime = performance.now();
console.log(`JS loaded in ${endTime-startTime} ms`)