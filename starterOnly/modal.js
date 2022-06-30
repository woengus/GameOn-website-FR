function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close"); //bouton croix sur la modal
const form = document.querySelectorAll("#form");//classe du form
const first = document.querySelector("#first");//prénom
const last = document.querySelector("#last");//nom
const email = document.querySelector("#email");//email
const birthdate = document.querySelector("#birthdate");//date de naissance
const quantity = document.querySelector("#quantity");//nombre de tournois
//check-box de type radio
const location1 = document.querySelector("#location1");//new york
const location2 = document.querySelector("#location2");//san francisco
const location3 = document.querySelector("#location3");//seattle
const location4 = document.querySelector("#location4");//chicago
const location5 = document.querySelector("#location5");//boston
const location6 = document.querySelector("#location6");//portland
//check box de type check box
const checkbox1 = document.querySelector("#checkbox1");
const checkbox2 = document.querySelector("#checkbox2");
//Retourne vrai si l'élément est vide, pour vérifier si prénom et nom sont vides 
const isRequired = value => value === '' ? false : true;

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}


//Au click sur la croix on appelle la function closeModal
closeBtn.addEventListener("click", closeModal);
//fermeture de la modal
function closeModal() {
  modalbg.style.display = "none";
  console.log("le click sur la croix fonctionne");
}
//validation formulaire
function validate() {
  //location1.checked = true; force la radio 1 cochée par défaut
  const letters = /[A-zÀ-ú]/; //forcer l'utilisation de lettres uniquement, avec accent, pour nom et prénom
  const  mailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ //regex pour la validation de l'adresse mail
  const maxChoiceRadio = 6; //nombre d'éléments radios pour les villes

  if(first.value.length <2 || first.value === "" || !first.value.match(letters)) {
    console.log("votre prénom doit comporter au moins 2 lettres, sans chiffre.");
    first.focus();
    return false;
  }
  if(last.value.length <2 || last.value === "" || !last.value.match(letters)) {
    console.log("votre nom doit comporter au moins 2 lettres, sans chiffre.");
    last.focus();
    return false;
  }
  if(!email.value.match(mailRegex)){
    console.log("Veuillez entrer un mail valide.");
    email.focus();
    return false;
  }
  if(quantity.value === "") {
    console.log("Veuillez saisir une valeur numérique, entre 0 et 99.");
    quantity.focus();
    return false;
  }
  
  //todo: en faire une boucle, vérifie si toutes les radios sont décochées
 
  if(!location1.checked && !location2.checked && !location3.checked && !location4.checked && !location5.checked && !location6.checked) {
    console.log("Veuillez choisir une ville");
    return false;
  }
  if(!checkbox1.checked) {
    console.log("Veuillez accepter les conditions d'utilisation" );
    checkbox1.focus();
    return false;
  }
  
  
  alert("Merci pour votre inscription")
  return true;
}
