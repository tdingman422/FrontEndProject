"use strict"

const dog_url = "https://dog.ceo/api/breeds/image/random";
getDog();

const root = document.documentElement;
const min_max_btns = document.querySelectorAll(".min-max");

min_max_btns.forEach(button => {
    button.addEventListener("click", grow_shrink)
});

const submit_btn = document.querySelector("input[type=submit]");
const modal_close = document.querySelector(".modal-close")

submit_btn.addEventListener("click", modalAppear);
modal_close.addEventListener("click", modalClose);

function grow_shrink(e){
    const info = e.currentTarget.nextElementSibling;

    info.classList.toggle("closed");
    info.classList.toggle("open");

    root.style.setProperty('--content-height', info.scrollHeight + 'px');

    const chevron = e.currentTarget.children;
    chevron[0].classList.toggle("fa-chevron-up");
    chevron[0].classList.toggle("fa-chevron-down");

    min_max_btns.forEach(otherBtn => {
        if (otherBtn !== e.currentTarget && otherBtn.nextElementSibling.classList.contains("open")){
            otherBtn.nextElementSibling.classList.remove("open");
            otherBtn.nextElementSibling.classList.add("closed");
        }
    });
}

function modalAppear(e) {
    e.preventDefault();
    const modal = document.querySelector(".modal");
    modal.style.display = "block";
}

function modalClose(e) {
    const modal = document.querySelector(".modal");
    modal.style.display = "none";
}

async function getDog(e) {
    try{
        const response = await fetch (dog_url);
        if(!response.ok){
            throw Error(`Error: ${response.url} ${response.statusText}`);
        }
        const data = await response.json();
        showDog(data);
    }
    catch(error) {
        showError(error.message);
    }
}

function showDog(data) {
    try {
        const container = document.querySelector(".dog-container");
        const img = document.createElement("img");
        container.append(img);
        img.src = data.message;
        img.alt = "dog";
    }
    catch(error) {
        showError(error.message);
    }
}

function showError(message) {
    const container = document.querySelector(".error-container");
    container.textContent = message;
    container.classList.remove("hidden");
}