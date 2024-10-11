// main.js

// Position de départ et d'arrivée
let startPosition = { x: 0, y: 0 };   // donc position en haut à gauche
let goalPosition = { x: 0, y: 2 };    // donc 5ème élément de x et 3eme élément de y
let actualPosition = { ...startPosition };  // Faire une copie de la position de départ

// Déplacements possibles : Sud, Est, Nord, Ouest
const possibleMoves = [
    { x: 1, y: 0 },  // Sud  
    { x: 0, y: 1 },  // Est  
    { x: -1, y: 0 }, // Nord  
    { x: 0, y: -1 }  // Ouest
];

// Chemin ou mur
const wall = 0;
const path = 1;

// Labyrinthe
let maze = [
    [1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1],
    [1, 0, 1, 0, 0, 1, 0],
    [1, 0, 1, 1, 1, 1, 1],
];

// Initialisation du compteur pour trouver le goal
let step = 0;

// Tableau pour garder la trace des positions visitées
let visitedPositions = new Set();  // Utilisation d'un Set pour stocker les positions visitées

// Pile pour garder la trace des positions et gérer le backtracking
let positionStack = [];

// Fonction pour afficher la grille du labyrinthe dans la console
function displayMaze() {
    console.log("Maze:");
    for (let y = 0; y < maze[0].length; y++) { // Itérer sur les lignes (y)
        let row = "";
        for (let x = 0; x < maze.length; x++) { // Itérer sur les colonnes (x)
            if (x === startPosition.x && y === startPosition.y) {
                row += "S ";  // Position de départ
            } else if (x === goalPosition.x && y === goalPosition.y) {
                row += "G ";  // Position d'arrivée
            } else if (maze[x][y] === 1) {
                row += "[-]";  // Chemin (vide)
            } else {
                row += "[█]";  // Mur
            }
        }
        console.log(row);
    }
}

// Exemple d'affichage
displayMaze();


// Vérification si une position est dans les limites du labyrinthe
function insideMaze(position) {
    return position.x >= 0 && position.x < maze.length && position.y >= 0 && position.y < maze[0].length;
}

// Vérifier si la position est celle d'arrivée
function isGoal(position) {
    return position.x === goalPosition.x && position.y === goalPosition.y;
}

// Vérifier si une direction mène à un chemin possible
function isPath(position) {
    return maze[position.x][position.y] === path;
}

// Fonction pour marquer une position comme visitée
function markAsVisited(position) {
    visitedPositions.add(`${position.x},${position.y}`);
}

// Fonction pour vérifier si une position a déjà été visitée
function isVisited(position) {
    return visitedPositions.has(`${position.x},${position.y}`);
}

// Trouver le chemin vers le goal
function findPath() {
    // Initialiser la pile avec la position de départ
    positionStack.push({ ...startPosition });
    markAsVisited(startPosition);

    // Boucle tant qu'il y a des positions dans la pile
    while (positionStack.length > 0) {
        let currentPosition = positionStack[positionStack.length - 1];  // Ne pas dépiler immédiatement
        actualPosition = currentPosition;
        step++;  // Incrémenter le nombre d'étapes

        // Si on est à la position finale
        if (isGoal(actualPosition)) {
            console.log(`Goal reached in ${step} steps`);
            return true;
        }

        let moved = false;  // Indicateur pour savoir si on a bougé

        // Tester les déplacements possibles (Sud, Est, Nord, Ouest)
        for (let move of possibleMoves) {
            let newPosition = {
                x: actualPosition.x + move.x,
                y: actualPosition.y + move.y
            };

            // Vérifier si la nouvelle position est dans le labyrinthe, est un chemin, et n'a pas encore été visitée
            if (insideMaze(newPosition) && isPath(newPosition) && !isVisited(newPosition)) {
                markAsVisited(newPosition);  // Marquer la position comme visitée
                positionStack.push(newPosition);  // Ajouter la nouvelle position à la pile
                console.log(`Step:${step} Moved to position: (${newPosition.x}, ${newPosition.y})`);
                moved = true;  // On a trouvé un chemin possible
                break;  // Sortir de la boucle dès qu'un mouvement est possible
            }
        }

        // Si aucun mouvement n'est possible, on fait demi-tour
        if (!moved) {
            console.log(`Step:${step} Backtracking from position: (${actualPosition.x}, ${actualPosition.y})`);
            positionStack.pop();  // Retirer la position actuelle de la pile pour revenir en arrière
        }
    }

    console.log("No path to the goal was found.");
    return false;
}

// Lancer le jeu
findPath();
