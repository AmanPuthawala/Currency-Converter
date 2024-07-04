import { countryList } from './codes.js';

const BaseURL = "https://latest.currency-api.pages.dev/v1/currencies/eur.json";

const dropdowns = document.querySelectorAll(".dropdown #to");
const btn = document.querySelector("form button");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
 
const myBaseCountry = document.querySelector(".dropdown #from");



for(let select of dropdowns){
    for(let currCode in countryList){
        // console.log(codes,countryList[codes]);
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        // if(select.name === "from" && currCode === "EUR"){
        //     newOption.selected = "selected"
        // }
        if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected"
        }
        select.append(newOption);

        select.addEventListener("change", (evt) => {
            updateFlag(evt.target);
        })
    }

}

 let newOption = document.createElement("option");
    newOption.innerText = "EUR";
    newOption.value = "EUR";
    if(myBaseCountry.name === "from" && newOption.value === "EUR"){
        newOption.selected = "selected"
    }
    myBaseCountry.append(newOption);

    myBaseCountry.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })


const updateFlag = (element) => {
    // console.log(element);
    let currCode = element.value;
    // console.log(currCode);
    let countryCode = countryList[currCode];
    // console.log(countryCode);
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}


btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    if(amount.value === "" || amount.value < 1){
        amount.value = "1";
    }
    let amtValue = amount.value;
    console.log(amtValue);

    let response = await fetch(BaseURL);
    let data = await response.json();
    const mySelectCountry = toCurr.value.toLowerCase(); 
    const rate = data.eur[mySelectCountry];
    // console.log(rate);

    let finalAmount = amtValue * rate;
    msg.innerText = `${amtValue} EUR = ${finalAmount} ${toCurr.value}`
});


