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
const closeBtn2 = document.querySelector(".btn-submit");//bouton fermer après validation du formulaire
const form = document.querySelector("form");//classe du form
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

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//Au click sur la croix ou le bouton fermer on appelle la function closeModal
closeBtn.addEventListener("click", closeModal);
closeBtn2.addEventListener("click", closeModal);
//fermeture de la modal
function closeModal() {
  modalbg.style.display = "none";
  document.querySelector("form").reset(); // re initialise le formulaire quand on ferme la modal
}
//fonction pour montre les erreurs
const showError = (input, message) => {
  // récupérer l'élément formData
  const formData = input.parentElement;
  // ajoute la class error, enlève success
  formData.classList.remove('success');
  formData.classList.add('error');

  // montre le message d'erreur
  const error = formData.querySelector('small');
  error.textContent = message;
};
//fonction pour montrer un message de réussite (ici vide)
const showSuccess = (input) => {
  // récuperer l'élément formData
  const formData = input.parentElement;

  // enlève la class error, ajoute success
  formData.classList.remove('error');
  formData.classList.add('success');

  // cache le message d'erreur
  const error = formData.querySelector('small');
  error.textContent = '';
}
//empêche le formulaire de changer de page au submit
form.addEventListener("submit", (e)=> {
  e.preventDefault();
  console.log("test");
})
//validation formulaire
function validate() {
  const letters = /[A-zÀ-ú]/; //regex pour forcer l'utilisation de lettres uniquement, avec ou sans accent, pour nom et prénom
  const  mailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ //regex pour la validation de l'adresse mail
  if(first.value.length <2 || first.value === "" || !first.value.match(letters)) {
    showError(first,"Votre prénom doit comporter au moins 2 lettres, sans chiffre.");
    first.focus(); //sert à avoir le focus sur l'élément avec une erreur
    return false;
  }
  else showSuccess(first);
  if(last.value.length <2 || last.value === "" || !last.value.match(letters)) {
    showError(last,"Votre nom doit comporter au moins 2 lettres, sans chiffre.");
    last.focus();
    return false;
  }
  else showSuccess(last);
  if(!email.value.match(mailRegex)){ //on vérifie que l'email est bien valide, en utilisant le regex
    showError(email, "Veuillez entrer un email valide.");
    email.focus();
    return false;
  }
  else showSuccess(email);
  if(quantity.value === "" || quantity.value > 99) {
    showError(quantity, "Veuillez saisir une valeur numérique, entre 0 et 99.");
    quantity.focus();
    return false;
  }
  else showSuccess(quantity);
  //todo: en faire une boucle, vérifie si toutes les radios sont décochées
  if(!location1.checked && !location2.checked && !location3.checked && !location4.checked && !location5.checked && !location6.checked) {
    showError(location1, "Veuillez choisir une ville");
    return false;
  }
  else showSuccess(location1);
  if(!checkbox1.checked) {
    showError(checkbox1, "Pour valider l'inscription, veuillez accepter les conditions d'utilisation" );
    checkbox1.focus();
    return false;
  }
  else showSuccess(checkbox1);
  document.querySelector(".modal-body").style.display = "none"; //enleve l'affichage du formulaire
  document.querySelector(".formConfirmation").style.display = "block"; //affiche le message de validation
}
