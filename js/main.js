// main.js

// Position de départ et d'arrivée
let startPosition = { x: 0, y: 0 };
let goalPosition = { x: 4, y: 2 };
let actualPosition = { x: startPosition.x, y: startPosition.y };

// Déplacements possibles
const possibleMoves = [
    { x: 0, y: 1 },  // Sud  
    { x: 1, y: 0 },  // Est  
    { x: 0, y: -1 }, // Nord  
    { x: -1, y: 0 }  // Ouest
];

// Chemin ou mur
const wall = 0;
const path = 1;

// Labyrinthe
let maze = [
    [1, 0, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 1, 0],
    [1, 0, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1],
    [1, 0, 1, 1, 1, 0, 1],
];

// Définir les direction
let possiblePath = [];
let unvisitedPath = [];


// Initialisation du compteur pour trouver le goal
let step = 0;

// Fonction pour afficher la grille du labyrinthe dans la console
function displayMaze() {
    for (let i = 0; i < maze.length; i++) {
        console.log(maze[i].join(" "));
    }
}

displayMaze();

 
// Vérification si une position est dans les limites du labyrinthe
function insideMaze(position) {
    return position.x >= 0 && position.x < maze.length && position.y >= 0 && position.y < maze.length;
}

// Vérifier si la position est celle d'arrivée
function isGoal(position) {
    return position.x === goalPosition.x && position.y === goalPosition.y;
}


// 

//Afficher les coordonnées d'arrivée
console.log(actualPosition)