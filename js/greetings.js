const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const initDiv = document.querySelector("#init");
const mainDoc = document.querySelector("#main-doc");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";
const localUser = localStorage.getItem(USERNAME_KEY);

function onLoginSubmit(event) {
    event.preventDefault();
    const username = loginInput.value;
    initDiv.classList.add(HIDDEN_CLASSNAME);
    localStorage.setItem(USERNAME_KEY, username);
    paintGreetings(username)
}

function paintGreetings(passthrough) {
    greeting.innerText = `Welcome, ${passthrough}.`;
    initDiv.classList.add(HIDDEN_CLASSNAME);
    mainDoc.classList.remove(HIDDEN_CLASSNAME);
}

loginForm.addEventListener("submit", onLoginSubmit);


if (localUser === null) {
    initDiv.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
} else {
    paintGreetings(localUser);
}