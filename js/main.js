// main.js

// Position de départ et d'arrivée
let startPosition = { x: 0, y: 0 };   // donc position en haut à gauche
let goalPosition = { x: 4, y: 2 };    // donc 5ème élément de x et 3eme élément de y
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
    step++; // Incrémenter le nombre d'étapes
    // console.log(`Step:${step}`)

    // Si on est à la position finale
    if (isGoal(actualPosition)) {
        console.log(`Goal reached in ${step} steps`);
        console.log(`Goal is ${actualPosition.x},${actualPosition.y}`)
        return true;
    }

    // Marquer la position actuelle comme visitée
    markAsVisited(actualPosition);

    // Ajouter la position actuelle à la pile
    positionStack.push({ ...actualPosition });

    // Tester les déplacements possibles (par ordre de priorité : Sud, Est, Nord, Ouest)
    for (let move of possibleMoves) {
        let newPosition = {
            x: actualPosition.x + move.x,
            y: actualPosition.y + move.y
        };

        // Vérifier si la nouvelle position est dans le labyrinthe, n'est pas un mur et n'a pas encore été visitée
        if (insideMaze(newPosition) && isPath(newPosition) && !isVisited(newPosition)) {
            actualPosition = newPosition;  // Mettre à jour la position actuelle
            console.log(`Step:${step} Moved to position: (${newPosition.x}, ${newPosition.y})`);

            if (findPath()) {  // Continuer la recherche de manière récursive
                return true;
            }
        }
    }
    

    // Si aucun chemin n'est trouvé, on fait demi-tour (backtracking)
    console.log(`Step:${step} Backtracking from position: (${actualPosition.x}, ${actualPosition.y}) `);
    positionStack.pop();  // Retirer la position actuelle de la pile
    actualPosition = positionStack[positionStack.length - 1];  // Revenir à la dernière position valide
    step++;
    return false;
}

// Lancer le jeu
findPath();