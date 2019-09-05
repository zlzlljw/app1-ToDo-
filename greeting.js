const form = document.querySelector(".js-form"),
      input = form.querySelector("input"),
      greeting = document.querySelector(".js-greetings"),
      toDoFormShowing= document.querySelector(".js-toDoForm");
const USER_LS = "currentUser";
const SHOWING_CN = "showing"


function saveName(text) {
    localStorage.setItem(USER_LS,text);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerHTML = `Smile~ ${text} :D`;
    toDoFormShowing.classList.add(SHOWING_CN);
}

function loadname() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        askForName();
    }else {
        paintGreeting(currentUser);
    }
}
function init() {
    loadname();
}

init();