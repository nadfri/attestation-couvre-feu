"use strict";
/*********************************** */
let tabUsers = (JSON.parse(localStorage.getItem('usersList')) != null)? 
JSON.parse(localStorage.getItem('usersList')): [];

//**********/Désactivation du bouton new Attestation si No User et de la div_NoUser***/
if(tabUsers.length == 0) 
{
    bt_newAttest.disabled = true; //desactive le bouton new Attestation
    bt_newAttest.src = "img/attestIcon2.png";
    div_NoUser.style.display = "block"; //affiche les divs ayant la class div_NoUser   
}
else 
{
    bt_newAttest.disabled = false; //active le bouton
    bt_newAttest.src = "img/attestIcon.png";
    div_NoUser.style.display = "none"; //masque les divs ayant la class div_NoUser
}

//**************************Liste Users************************************************ */
for (let user of tabUsers)
{
    const spanOptions = document.createElement("span");
    spanOptions.className = "spanOptions";

    const imgBin = document.createElement("img");//ajout de l'icone poubelle
    imgBin.src = "img/bin.png";
    imgBin.className = "bin";
    imgBin.setAttribute("ref",user.id); //ajout d'un attribut d'identification

    const imgEdit = document.createElement("img");//ajout de l'icone crayon
    imgEdit.src = "img/pencil.png";

    const spanUser = document.createElement("span");
    spanUser.textContent =  `${user.prenom} ${user.nom}`;//Nom et prenom affichés

    const div = document.createElement("div");//Creation de la div contenante
    div.className = "divLine";
    field_User.appendChild(div); //insertion dans le fieldset
    div.appendChild(spanUser);
    div.appendChild(spanOptions);
    spanOptions.appendChild(imgEdit);
    spanOptions.appendChild(imgBin);

    //****************Bouton supprimer Utilisateur********************************** */
    imgBin.onclick = (e) =>
    {
        field_User.style.pointerEvents = "none"; //desactive le clic sur le fieldset User
        divPopUp.style.display = "block"; //affiche le pop up de confirmation

        bt_non.onclick = () => {
        divPopUp.style.display = "none";
        field_User.style.pointerEvents = "auto";
        };

        bt_oui.onclick = () => {
            tabUsers = tabUsers.filter(user => user.id != e.target.getAttribute("ref"));
            //filtre le tableau en retirant l'user ayant l'id correspondante à la ref de imgBin
            // (e) est celui de l'evenement imgBin.onclick et non bt_oui.onclick 
            console.log(tabUsers);
            localStorage.setItem("usersList", JSON.stringify(tabUsers));
            document.location.reload();
        };
    };

    //****************Bouton Editer Utilisateur********************************** */
    imgEdit.onclick = () => editUser(user);
    
}

//***************************Verificateur de saisie****************** */
let inputs = document.querySelectorAll("#edit_form input");
for (let input of inputs)
{
    input.onchange = () => 
    {
        if (edit_form.checkValidity()) divEdit.style.backgroundColor = "springGreen";
        else divEdit.style.backgroundColor = "pink";
    };// form.checkValidity() retourne true/false en fonction de la validité
}

//******************Fonction d'édition d'un utilisateur************************** */
function editUser(user)
{
    field_User.style.display = "none";
    edit_form.style.display = "block";
    
    prenom.value = user.prenom;
    nom.value = user.nom;
    birthday.value = user.birthday.replace(/(\d{2})\/(\d{2})\/(\d{4})/,"$3-$2-$1");
    placeBirth.value = user.placeBirth;
    cpNaiss.value = user.cpNaiss;
    adresse.value = user.adresse;
    codePostal.value = user.codePostal;
    city.value = user.ville;

    edit_form.onsubmit= (e) =>
    {
        user.prenom = prenom.value;
        user.nom = nom.value;
        user.birthday = birthday.value.replace(/(\d{4})-(\d{2})-(\d{2})/,"$3/$2/$1");
        user.placeBirth = placeBirth.value;
        user.cpNaiss = cpNaiss.value;
        user.adresse = adresse.value;
        user.codePostal = codePostal.value;
        user.ville = city.value;

        localStorage.setItem("usersList", JSON.stringify(tabUsers));

        document.location.reload();
        return false;
    };
}



