
window.onload = init;

let placeMini1 = null;
let placeMini2 = null; 
let gagne = 0;
let pass = 0;
let nbCoup = 0;
let carte1 = null;
let carte2 = null;
let place = ['1','2','3','4','5','5','4','3','2','1','6','6']; // tableau image
shuffle(place); // melange des cartes dans le tableau
function  init() {
        let mesImg = document.querySelectorAll('img');
        
        mesImg.forEach(monImg => {
            monImg.addEventListener('click', visibilite); //écoute sur le click de chaque img
        })
}


function visibilite(event) { 
    let clickImg = event.currentTarget.src;
    if(clickImg.endsWith('question.svg')){ // regarde si click sur img ?
        if(pass === 0){                                        // au premier passage
            carte1 = event.currentTarget;   
            carte1.classList.toggle('imgSelect');             // ajoute la class imgSelect (pour rotation)
            event = event.currentTarget.id;
            let n = event.substr(4);                          // regarde sur quel place du tableau
            document.getElementById(event).src = 'img/memory-legume/'+ place[n] + '.svg'; //changement de l'image
            placeMini1 = n;                                   // garde en mémoire la carte 1 retourne
            pass+=1;
        } else if(pass === 1) {                                // au second passage
            carte2 = event.currentTarget;
            carte2.classList.toggle('imgSelect');
            event = event.currentTarget.id;
            let n = event.substr(4);
            document.getElementById(event).src = 'img/memory-legume/'+ place[n] + '.svg';
            placeMini2 = n;
            pass +=1 ;
            compare(placeMini1, placeMini2);
        }      
    }
    
}


function compare(placeMini1,placeMini2){
    if(place[placeMini1] != place[placeMini2]){             // si carte différente
        nbCoup+=1;                                          // incrementation du compteur
        document.getElementById('nbCoup').innerHTML="<p id='nbCoup'>Nombre de coups " + nbCoup + "</p>"; // affichage sur balise p
        setTimeout(initImg, 5000);                          // temps avant intialisation des images
     }  else{
        nbCoup+=1;
        document.getElementById('nbCoup').innerHTML="<p id='nbCoup'>Nombre de coups " + nbCoup + "</p>";
        gagne+=1;                                           // incrementation du nombre de paire retourné
        pass = 0;
        if(gagne == 6){                                     // si nombre de paire egal 6 alors gagné
            
            setTimeout(() => {
                alert("Vous avez gagnez en : " + nbCoup + " coups !!!" );

            }, 500);
            
            document.addEventListener('keydown', function (event) { // fonction reinitialisation du plateau
                if (event.code !== 'Space') {
                } else {
                    window.location.reload();
                }  
             });  
        }
     }
}

function initImg(){
    document.getElementById('case' + placeMini1).src='img/question.svg'; //changement de la 1er carte
    document.getElementById('case' + placeMini2).src='img/question.svg'; // changement de la 2em carte
    carte1.classList.remove('imgSelect');   // supression de la classe 
    carte2.classList.remove('imgSelect');   // supression de la classe
    pass = 0;
}



function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }