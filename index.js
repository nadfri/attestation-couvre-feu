"use strict";
/*********************************** */
let tabUsers = (JSON.parse(localStorage.getItem('usersList')) != null)? 
JSON.parse(localStorage.getItem('usersList')): [];

let listAttest_Storage = (JSON.parse(localStorage.getItem('listAttest_Storage')) != null)? 
JSON.parse(localStorage.getItem('listAttest_Storage')): [];
//console.log(listAttest_Storage);

//**********/Désactivation du bouton new Attestation si No User et de la div_NoUser***/
if(tabUsers.length == 0) 
{
    bt_newAttest.disabled = true; //desactive le bouton new Attestation
    bt_newAttest.src = "img/attestIcon2.png";
    div_NoUser.style.display = "block"; //affiche la div_NoUser   
}
else 
{
    bt_newAttest.disabled = false; //active le bouton
    bt_newAttest.src = "img/attestIcon.png";
    div_NoUser.style.display = "none"; //masque la div div_NoUser
}

if(listAttest_Storage.length == 0 && tabUsers.length != 0)
    div_NoAttest.style.display = "block"; //affiche la div div_NoAttest
else
    div_NoAttest.style.display = "none"; //masque la div div_NoAttest


//**************************Liste Attestations************************************************ */
for(let attestation of listAttest_Storage)
{
    const divLine = document.createElement("div");
    divLine.className = "divLine"; //conteneur

//*** */
    const divEye = document.createElement("div");
    divEye.className = "divImg";
    const imgEye = document.createElement("img");
    imgEye.src = "img/oeil.png";
    divEye.appendChild(imgEye);

//*** */
    const divInfo = document.createElement("div");
    divInfo.className = "divInfo";

    let listPrenoms = "";
    for(let user of attestation.listNom)
        listPrenoms +=  `${user.prenom}, `;

    const spanListPrenom = document.createElement("span");
    spanListPrenom.textContent = listPrenoms;

    const spanDate = document.createElement("span");
    spanDate.className = "spanDate";
    spanDate.textContent = `Pour le ${attestation.dateSortie} à ${attestation.heureSortie}`;

    const spanMotif = document.createElement("span");
    spanMotif.className = "spanMotif";
    spanMotif.textContent = `Motif: ${attestation.motif}`;

    divInfo.appendChild(spanListPrenom);
    divInfo.appendChild(spanDate);
    divInfo.appendChild(spanMotif);

 //**** */
    const divBin = document.createElement("div");
    divBin.className = "divImg divBin";
    const imgBin = document.createElement("img");
    imgBin.src = "img/bin.png";
    imgBin.setAttribute("ref",attestation.id); //ajout d'un attribut d'identification
    divBin.appendChild(imgBin);

    field_Attest.appendChild(divLine);
    divLine.appendChild(divEye);
    divLine.appendChild(divInfo);
    divLine.appendChild(divBin);


    //****************Bouton supprimer Utilisateur********************************** */
    imgBin.onclick = (e) =>
    {
        field_Attest.style.pointerEvents = "none"; //desactive le clic sur le fieldset Attest
        divPopUp.style.display = "block"; //affiche le pop up de confirmation

        bt_non.onclick = () => {
        divPopUp.style.display = "none";
        field_Attest.style.pointerEvents = "auto";
        };

        bt_oui.onclick = () => {
            listAttest_Storage = listAttest_Storage.filter(attestation => 
                attestation.id != e.target.getAttribute("ref"));
            //filtre le tableau en retirant l'attestation ayant l'id correspondante à la ref de imgBin
            localStorage.setItem("listAttest_Storage", JSON.stringify(listAttest_Storage));
            document.location.reload();
        };
    };

    //****************Bouton Voir Attestation **************************************/
    let open = false;
    divLine.onclick = (e) => {
        if(!Object.is(e.target, imgBin) && open == false) //ne tient pas compte du click sur ImgBin
        {
            affichage_Attestation(attestation);
            open = true;
        }
        else
        {
            output.innerHTML = ""; //vide la div d'affichage
            open = false;
        }
    }
} 


//*********************Masquer la barre de Menu lors du scroll */
document.onscroll = () =>{
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50)
        divIcon.style.display="none";
    else
        divIcon.style.display="flex";
}

//************************Affichage des Attestions Ecrites/QRCODE********************* */
function affichage_Attestation(tab)
{
    output.innerHTML = ""; //vide la div d'affichage

    for(let user of tab.listNom)
    {
       let prenomID      = user.prenom;
       let nomID         = user.nom;
       let birthdayID    = user.birthday;
       let placeBirthID  = user.placeBirth;
       let adresseID     = `${user.adresse} ${user.codePostal} ${user.ville}`;
       let cityID        = user.ville;

       let dateSortieID    = tab.dateSortie;
       let heureSortieID   = tab.heureSortie;

       let listCaseIMG           = [];
       listCaseIMG["travail"]    = "img/case.png";
       listCaseIMG["santé"]      = "img/case.png";
       listCaseIMG["famille"]    = "img/case.png";
       listCaseIMG["handicap"]   = "img/case.png";
       listCaseIMG["judiciaire"] = "img/case.png";
       listCaseIMG["missions"]   = "img/case.png";
       listCaseIMG["transits"]   = "img/case.png";
       listCaseIMG["animaux"]    = "img/case.png";

       listCaseIMG[tab.motif] = "img/caseValid.png";

    //*****************QRCODE******************* */
        const imgQR = document.createElement("img");
        let info = `Créé le:${tab.dateCreation} à ${tab.heureCreation}%3B
                    Nom:${user.nom}%3B
                    Prenom:${user.prenom}%3B
                    Naissance:${user.birthday} à ${user.placeBirth}%3B
                    Adresse:${adresseID}%3B
                    Sortie:${tab.dateSortie} à ${tab.heureSortie}%3B
                    Motifs:${tab.motif}`;
    
        imgQR.src = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&ecc=M&data="+info;
        //APi en ligne pour generer le QRCODE

        const figure = document.createElement("figure");
        const figcaption = document.createElement("figcaption");
        figcaption.textContent = `Date de création: ${tab.dateCreation} à ${tab.heureCreation}`;

    
        //*********************Version Ecrite******************** */
        const fieldset = document.createElement("fieldset");
        let legend = document.createElement("legend");
        legend.textContent = user.prenom;
        output.appendChild(fieldset);
        fieldset.innerHTML = `
        <h1>ATTESTATION DE DÉPLACEMENT DÉROGATOIRE</h1>
        <h2>
            En application de l'article 51 du décret n° 2020-1262 du 16 octobre 2020 
            prescrivant les mesures générales
            nécessaires pour faire face à l'épidémie de covid-19 dans le cadre de 
            l'état d'urgence sanitaire
        </h2>

        <p>Je soussigné(e), Mme/M. : <span class="colorSpan">${nomID} ${prenomID}</span></p>
        <p>Né(e) le :<span class="colorSpan">${birthdayID}</span></p>
        <p>À :<span class="colorSpan">${placeBirthID}</span></p>
        <p>Demeurant:<span class="colorSpan">${adresseID}</span></p>

        <p>certifie que mon déplacement est lié au motif suivant (cocher la case) autorisé en application des mesures générales nécessaires pour faire face à l'épidémie de Covid19 dans le cadre de l'état d'urgence sanitaire<sup>1</sup>:
        </p>

        <p  class="case"><img src = ${listCaseIMG["travail"]} ALIGN=LEFT>
        Déplacements entre le domicile et le lieu d'exercice de l'activité professionnelle ou le lieu d'enseignement et de formation.
        </p>

        <p  class="case">
        <img src = ${listCaseIMG["santé"]} ALIGN=LEFT>
        Déplacements pour des consultations et soins ne pouvant être assurés à distance et ne pouvant être différés ou pour l'achat de produits de santé.
        </p>

        <p  class="case">
        <img src = ${listCaseIMG["famille"]} ALIGN=LEFT>
        Déplacements pour motif familial impérieux, pour l’assistance aux personnesvulnérables ou la garde d’enfants.
        </p>

        <p class="case">
        <img src = ${listCaseIMG["handicap"]} ALIGN=LEFT>
        Déplacements des personnes en situation de handicap et de leur accompagnant.
        </p>

        <p class="case">
        <img src = ${listCaseIMG["judiciaire"]} ALIGN=LEFT>
        Déplacements pour répondre à une convocation judiciaire ou administrative.
        </p>

        <p class="case">
        <img src = ${listCaseIMG["missions"]} ALIGN=LEFT>
        Déplacements pour participer à des missions d'intérêt général sur demande de l'autorité administrative.
        </p>

        <p class="case">
        <img src = ${listCaseIMG["transits"]} ALIGN=LEFT>
        Déplacements liés à des transits pour des déplacements de longues distances.
        </p>

        <p class="case">
        <img src = ${listCaseIMG["animaux"]} ALIGN=LEFT>
        Déplacements brefs, dans un rayon maximal d'un kilomètre autour du domicile pour les besoins des animaux de compagnie.
        </p>

        <p>Fait à :<span class="colorSpan">${cityID}</span></p>
        <p>Le : <span class="colorSpan">${dateSortieID}</span> à <span class="colorSpan">${heureSortieID}</span></p>
        `;

        fieldset.appendChild(legend);
        fieldset.appendChild(figure)
        figure.appendChild(imgQR);
        figure.appendChild(figcaption);
    }
}

//*************Service Worker ******************/
//Register service worker to control making site work offline
if('serviceWorker' in navigator)
{
	navigator.serviceWorker
			 .register('./sw.js', {scope: './'})
			 .then(function() {console.log('Service Worker Dispo pour ce navigateur')});
}


/************Permettre le 100vh sur mobile */
let vh = window.innerHeight * 0.01;
const hauteur = window.innerHeight;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

const metas = document.getElementsByTagName('meta');
metas[1].content = 'width=device-width, height=' + window.innerHeight + ' initial-scale=1.0, maximum-scale=5.0,user-scalable=0';



