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
const birthdate = document.querySelector("#birthdate")//date de naissance
const quantity = document.querySelector("#quantity");//nombre de tournois
const locations = document.querySelectorAll("input[type=radio]");//check-box de type radio
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
//fonction pour montrer les erreurs, qui s'affichent dans les balises <small> associées aux input
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
  //envoie un message vide
  const error = formData.querySelector('small');
  error.textContent = '';
}
//empêche le formulaire de changer de page au submit, sinon on ne voit pas la page de validation du form
form.addEventListener("submit", (e)=> {
  e.preventDefault();
})
//validation formulaire
function validate() {
  let hasErrorLocations = true;
  let hasError = false;
  const letters = /[A-zÀ-ú]/; //regex pour forcer l'utilisation de lettres uniquement, avec ou sans accent, pour nom et prénom
  const  mailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ //regex pour la validation de l'adresse mail
  if(first.value.length <2 || first.value === "" || !first.value.match(letters)) {
    showError(first,"Votre prénom doit comporter au moins 2 lettres.");
    hasError = true;
  }
  else {
    showSuccess(first);//montre le message de validation, ici vide
  }
  if(last.value.length <2 || last.value === "" || !last.value.match(letters)) {
    showError(last,"Votre nom doit comporter au moins 2 lettres.");
    hasError = true;
  }
  else {
    showSuccess(last);
  }
  if(!email.value.match(mailRegex)){ //on vérifie que l'email est bien valide, en utilisant le regex
    showError(email, "Veuillez entrer un email valide.");
    hasError = true;
  }
  else {
    showSuccess(email);
  }
  if(!birthdate.value) {
    showError(birthdate, "Veuillez saisir une date de naissance.")
    hasError = true
  }
  else {
    showSuccess(birthdate);
  }
  if(quantity.value === "" || quantity.value > 99) {
    showError(quantity, "Veuillez saisir une valeur numérique, entre 0 et 99.");
    hasError = true;
  }
  else {
    showSuccess(quantity);
  }
  //boucle qui vérifie si un des locations est checked
  for (let i = 0; i < locations.length; i++) {
    if(locations[i].checked) {
      //console.log(locations[i].checked);
      hasErrorLocations = false;
      showSuccess(locations[i])
      break
    }
  }
  if (hasErrorLocations) {
    showError(locations[0], "Veuillez choisir une ville.");
  }
  if(!checkbox1.checked) {
    showError(checkbox1, "Pour valider l'inscription, veuillez accepter les conditions d'utilisation." );
    hasError = true;
  }
  else {
    showSuccess(checkbox1);
  }
  //tant qu'on a une erreur, on ne valide pas le formulaire
  if(
    hasError == true 
    || hasErrorLocations == true
  ) {
    return;
  }
  document.querySelector(".modal-body").style.display = "none"; //enleve l'affichage du formulaire
  document.querySelector(".formConfirmation").style.display = "block"; //affiche le message de validation
}
