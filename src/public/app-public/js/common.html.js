document.addEventListener("DOMContentLoaded", ()=> {
    const username = document.cookie.slice(5);
    document.querySelector("#user_h3").innerHTML += username; 
});