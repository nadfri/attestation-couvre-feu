"use strict";
/*********************************** */
let tabUsers = (JSON.parse(localStorage.getItem('usersList')) != null)? 
JSON.parse(localStorage.getItem('usersList')): [];
console.log(tabUsers);

if(tabUsers.length > 0)
{
    nom.value = tabUsers[0].nom;
    adresse.value = tabUsers[0].adresse;
    codePostal.value = tabUsers[0].codePostal;
    city.value = tabUsers[0].ville;
}

//************Desactive la barre de menu à l'apparition du clavier sur Mobile */
document.onclick = () =>{
    if (document.activeElement.tagName == "INPUT") divIcon.style.display = "none";
    else divIcon.style.display = "flex";
    //document.activeElement => donne le nom de l'element qui a le focus
};


//**********/Désactivation du bouton new Attestation si No User***/
if(tabUsers.length == 0) 
{
    bt_newAttest.disabled = true; //desactive le bouton new Attestation
    bt_newAttest.src = "img/attestIcon2.png";  
}
else 
{
    bt_newAttest.disabled = false; //active le bouton
    bt_newAttest.src = "img/attestIcon.png";
}


placeBirth.oninput = () => {
    if(placeBirth.value.length > 1) 
        window.scroll({top: 300,behavior: 'smooth'});
}; // scroll afin de voir les propositions de ville caché par le clavier


birthday.onfocus = () => birthday.type = "date";

form.onsubmit= (e) =>
{
    let id = Date.now();
    tabUsers.push(
        {
            prenom: prenom.value,
            nom: nom.value,
            birthday: birthday.value.replace(/(\d{4})-(\d{2})-(\d{2})/,"$3/$2/$1"),
            placeBirth: placeBirth.value,
            adresse: adresse.value,
            codePostal: codePostal.value,
            ville: city.value,
            check: false,
            id: id
            });

    localStorage.setItem("usersList", JSON.stringify(tabUsers));
    console.log(tabUsers);
    document.location = "newAttest.html";

    e.preventDefault();
}

//***************************Verificateur de saisie****************** */
let inputs = document.querySelectorAll("#form input");
for (let input of inputs)
{
    input.oninput = () => 
    {
        if (form.checkValidity()) divAjouter.style.backgroundColor = "springGreen";
        else divAjouter.style.backgroundColor = "pink";
    };// form.checkValidity() retourne true/false en fonction de la validité
 }

/******************AutoComplete OFF***************** */

