let mdp;
let nom;
let email;
let nomOk = false;
let emailOk = false;
let mdpOk = false;
let confMdpOk = false;
window.onload = init;

const emailRegex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);    // regex email
const mdpRegex = new RegExp(/^(?=.*[^A-Za-z0-9])(?=.*?[0-9])(?=.*?[#?!@$%^&*-/+"'{}()|`_^¨£¤µ]).{6,}$/); // regex mdp

function init(){
    document.getElementById('nom').addEventListener('input', verifierNom);
    document.getElementById('email').addEventListener('input', verificationEmail);
    document.getElementById('mdp').addEventListener('input', verificationMdp);
    document.getElementById('mdp').addEventListener('input', verificationForceMdp);
    document.getElementById('confmdp').addEventListener('input', verificationconfMdps);
    document.getElementById('reset').addEventListener('click', resetForm);
    document.getElementById('valider').addEventListener('click', utilisateurlocalStorage);
    verifInscription();
}



function verifierNom(event){            // verification nom 3 caracteres
    let saisie = event.currentTarget.value;
    nom = saisie;
    let saisieNom = document.getElementById('imgCheckNom');
    let p =document.getElementById('pNom');
    if(saisie.length > 2){
        passerCheck(saisieNom);
        p.style.visibility="hidden";
        nomOk = true;
        verifInscription();
    } else if(saisie.length == 0) {
        passerRien(saisieNom);
        p.style.visibility="hidden";
        nomOk = false;
        verifInscription();
        } 
    else {
        passerError(saisieNom);
        p.removeAttribute('style');
        p.style.visibility="visible";
        nomOk = false;
        verifInscription();
        }
    }

function verificationEmail(event){      // verification email suivant regex
    let saisie = event.currentTarget.value;
    email = saisie;
    let saisieEmail = document.getElementById('imgCheckEmail');
    let p = document.getElementById('pEmail');   
    let isValidEmail = emailRegex.test(saisie);
    if(isValidEmail){
        passerCheck(saisieEmail);
        p.style.visibility="hidden";
        emailOk = true;
        verifInscription();
    }else if (saisie.length == 0){
        passerRien(saisieEmail);
        p.style.visibility="hidden";
        emailOk = false;
        verifInscription();
    } else {
        passerError(saisieEmail);
        p.style.visibility="visible";
        emailOk = false;
        verifInscription();
    }
}   


function verificationMdp(event){        // verification mdp suivant regex 6 caracteres, 1 chiffre, 1 caractere
    let saisie = event.currentTarget.value;
    mdp = saisie;
    let saisieMdp = document.getElementById('imgCheckMdp');
    let p =document.getElementById('pMdp');
    let isValideMdp = mdpRegex.test(saisie);
    if(isValideMdp){
        passerCheck(saisieMdp);
        p.style.visibility="hidden";
        mdpOk = true;
        verifInscription();
    } else if (saisie.length == 0){
        passerRien(saisieMdp);
        p.style.visibility="hidden";
        mdpOk = false;
        verifInscription();
    } else {
        passerError(saisieMdp);
        p.style.visibility="visible";
        mdpOk = false;
        verifInscription();
    }
}

function verificationForceMdp(){        // verification force mdp
    let saisie = document.getElementById('mdp').value;
    let divMdpFaible = document.getElementById('dfaible');
    let divMdpMoyenne = document.getElementById('dmoyenne');
    let divMdpFort = document.getElementById('dfort');
    let isValideMdp = mdpRegex.test(saisie);
    if(saisie.length == 0){
        divMdpFaible.style.visibility="hidden";
        divMdpMoyenne.style.visibility="hidden";
        divMdpFort.style.visibility="hidden";
    } 
    if( isValideMdp && saisie.length==6){
        divMdpFaible.style.visibility="visible";
        divMdpMoyenne.style.visibility="hidden";
        divMdpFort.style.visibility="hidden";
    } 
    if(isValideMdp && saisie.length>6 && saisie.length<9 ){
        divMdpFaible.style.visibility="visible";
        divMdpMoyenne.style.visibility="visible";
        divMdpFort.style.visibility="hidden";
    }
    if(saisie.length>= 9 && isValideMdp){
        divMdpFaible.style.visibility="visible";
        divMdpMoyenne.style.visibility="visible";
        divMdpFort.style.visibility="visible";
    }
}


function verificationconfMdps(){        // verification egalite mdp et conf mdp
    let confMdp = document.getElementById('confmdp').value;
    if(mdp === confMdp){    
        document.getElementById('imgCheckconfMdp').src = '/img/check.svg'
        document.getElementById('imgCheckconfMdp').hidden = false;
        confMdpOk = true;
        verifInscription();
    } else if(confMdp.length == 0){
        document.getElementById('imgCheckconfMdp').hidden = true;
        confMdpOk = false;
        verifInscription();
    } else if(confMdp.length>0){
        document.getElementById('imgCheckconfMdp').src = '/img/error.svg';
        document.getElementById('imgCheckconfMdp').hidden = false;
        confMdpOk = false;
        verifInscription();
    }
}

function passerCheck(element){  // insertion du check
    element.src = '/img/check.svg'
    element.hidden = false;
}
function passerError(element){  // insertion du error
    element.src = '/img/error.svg';
    element.hidden = false;
}
function passerRien(element){   // rendre invisible 
    element.hidden = true;
}

function resetForm(){
    window.location.reload();
}
function verifInscription(){
    console.log(nomOk);
    console.log(emailOk);
    console.log(mdpOk);
    console.log(confMdpOk);
    if (nomOk && emailOk && mdpOk && confMdpOk){
        document.getElementById('valider').removeAttribute('disabled');
    }
    else {
        document.getElementById('valider').setAttribute('disabled', 'disabled');
    }
}

function utilisateurlocalStorage() {
    let utilisateur = [{nom: nom, email: email, mdp: mdp}];
    localStorage.setItem('utilisateur', JSON.stringify(utilisateur));
}