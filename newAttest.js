"use strict";
/*********************************** */
let tabUsers = (JSON.parse(localStorage.getItem('usersList')) != null)? 
JSON.parse(localStorage.getItem('usersList')): [];

let listAttest_Storage = (JSON.parse(localStorage.getItem('listAttest_Storage')) != null)? 
JSON.parse(localStorage.getItem('listAttest_Storage')): [];

let count_users = 0; //sert à compter les checkbox

let options = {day: "2-digit", month: "2-digit", year:"numeric"};
dateSortie.value =  Intl.DateTimeFormat("fr-CA",options).format(Date.now());
//fr-CA permet d'avoir une date conforme mm-dd-yyyy
heureSortie.value =  Intl.DateTimeFormat("fr-FR",{hour: "numeric", minute: "numeric"}).format(Date.now());


//**************************Affichage Liste Users************************************************ */
for (let user of tabUsers)
{
    const imgCheck = document.createElement("img");
    imgCheck.src = "img/noChecked.png";
    imgCheck.className = "check";
    imgCheck.setAttribute("check", "false");

    const spanUser = document.createElement("span");
    spanUser.textContent =  `${user.prenom} ${user.nom}`;//Nom et prenom affichés

    const div = document.createElement("div");//Creation de la div contenante
    div.className = "divLine";
    field_User.appendChild(div); //insertion dans le fieldset
    div.appendChild(imgCheck);
    div.appendChild(spanUser);

    //**************Gestion de la checkBox********************************************* */
    div.onclick = ()=>{
        
        if (imgCheck.getAttribute("check") == "false")
        {
            imgCheck.src = "img/checked.png";
            imgCheck.setAttribute("check", "true");
            user.check = true; //ajout d'une nouvelle proprieté pour l'attestation
            count_users++;
        }

        else
        {
            imgCheck.src = "img/noChecked.png";
            imgCheck.setAttribute("check", "false");   
            user.check = false;
            count_users--;
        }

        if(count_users == 0) 
        {
            spanCount.textContent = "Pas d'utilisateurs selectionnés";
            spanCount.style.color = "red";
        }

        else
        {
            spanCount.style.color = "blue";
            spanCount.textContent = `Attestation pour ${count_users} utilisateur(s)`;
        }
    };
}

//***************************Verificateur de saisie du formulaire****************** */
let inputs = document.querySelectorAll(".inputs");
for (let input of inputs)
{
    input.onchange = () => 
    {
        if (form.checkValidity() && count_users != 0) 
        divAjouter.style.backgroundColor = "springGreen";
        else divAjouter.style.backgroundColor = "pink";
    };// form.checkValidity() retourne true/false en fonction de la validité
 }

//*******************************Nouvelle Attestation**************************************** */
form.onsubmit = (e) =>{

    let usersForAttest = tabUsers.filter(user=> user.check == true);
    //creation d'un nouveau tableau avec les users checked
    //console.log(usersForAttest);

    /*******************Gestion en cas de non selection d'utilisateur **********************/
    if(count_users == 0)
    {   
        spanCount.classList.add("blinking");
        setTimeout(()=>spanCount.classList.remove("blinking"),3000);
    }

    else
    {
        let optionDate  = {day: "2-digit",   month: "2-digit", year:"numeric"};
        let dateCreation  = Intl.DateTimeFormat("fr-FR",optionDate).format(Date.now());  
        let heureCreation = Intl.DateTimeFormat("fr-FR",{hour:"numeric", minute:"numeric"}).format(Date.now());

        let objet_final = {
                            listNom: usersForAttest,
                            dateCreation: dateCreation,
                            heureCreation: heureCreation,

                            dateSortie: dateSortie.value.replace(/(\d{4})-(\d{2})-(\d{2})/,"$3/$2/$1"),// jj/mm/aaaa
                            heureSortie: heureSortie.value,
                            motif: motif.value,
                            id: Date.now()
                          };

        listAttest_Storage.push(objet_final);  //ajout des compos dans le storage
        listAttest_Storage.sort((a,b)=>b.id-a.id); //tri le tableau par id decroissante =>(Date.now)
        localStorage.setItem("listAttest_Storage", JSON.stringify(listAttest_Storage));

        document.location = "index.html"; //mise à jour de la liste
    }

    e.preventDefault();
};

/*********************************** */

