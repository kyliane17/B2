/*
    TP - Consommation d'une API JokeAPI
*/

// Documentation: https://v2.jokeapi.dev/

// API Endpoint: https://v2.jokeapi.dev/joke/Any
let endpoint="https://v2.jokeapi.dev/joke/Any";

// Endpoint avec les paramètres demandés dans l'énoncé
endpoint += '?lang=fr&blacklistFlags=nsfw,religious,political,racist,sexist,explicit';


// 1. Comportement du bouton
document.getElementById("lablague").addEventListener( "click", getJoke );

// 2. Fonction de Fetch
// ***********************
// https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch

function getJoke(){
    // Vérifier que le navigateur peut faire du fetch
    if (window.fetch){

        // Appel
        fetch( endpoint )
        .then(
            // Premier fonction de callback, c'est la fonction en cas de succès
            // Et on aura un paramètre qui est la réponse
            function (response) {
                console.info("SUCCESS");
                console.log( response );

                // Tester le statut de la réponse
                    // https://developer.mozilla.org/en-US/docs/Web/API/Response/statusText
                // et en fonction on continue ou non
                if ( response.statusText === "OK" ){
                    
                    // On peut continuer
                    // Par défaut, l'API renvoie le format JSON
                    // Transformer la réponse en JSON interpétable
                    response.json()
                    .then(
                        // Succès de la promesse de transformation de la réponse en JSON
                        function (joke) {
                            // Succès
                            //console.table(datas.results);

                            // En observant les données reçues, on voit que les résultats sont dans
                            // setup et delivery

                            // Ici que tout commence
                            // On appelle la fonction d'affichage

                            // On va sélectionner l'élement ayant l'id jokesLines
                            let tabJokes = document.getElementById( "jokesLines" );
                            tabJokes.appendChild( generateJokeLine(joke) );
                        }
                        ,
                        // Erreur de la promesse de transformation de la réponse en JSON
                        function (error) {
                            console.error("ERROR de transformation de la réponse en JSON");
                            console.error(error);
                        }
                    )


                }else{
                    // Erreur
                }

            },

            // La deuxième fonction de callback, c'est la fonction en cas d'échec
            // On aura comme paramètre l'erreur
            function (error) {
                console.error("ERROR");
                console.error ( error );
            }        
        )
        

    }else{

        alert("Votre navigateur ne permet pas de faire du fetch");

    }
}


// 3. Fonction de création des lignes HTML des blagues
// ***********************
/**
 * Prend en paramètre un objet JOKE issu de l'appel de l'API
 * 
 * @returns Element HTML TR
 */
function generateJokeLine( joke ){
    /*
        Cette fonction va recevoir les infos d'une blague
        et elle va renvoyer un élément HTML TR
        https://developer.mozilla.org/fr/docs/Web/API/Document_Object_Model/Introduction

        <!-- Template des lignes -->
        <tr>
            <td>Blague</td>
        </tr>
    */

    // Création de la structure des éléments
    // Affectation des valeurs
    let generatedJokeLine = document.createElement('TR');

    // Blague
    let tdJokeHTML = document.createElement('TD');    
    tdJokeHTML.innerText = joke.setup + "   -->   " + joke.delivery;



    // **************    

    // Filiation de tous les TD au TR
        // Greffe de l'élément TD ID sur la branche TR
        generatedJokeLine.appendChild( tdJokeHTML );
        // ...


    // La ligne renvoyée contient un ELEMENT TR avec des sous éléments TD
    return generatedJokeLine;
}