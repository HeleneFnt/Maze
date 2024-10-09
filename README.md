# Maze

Programming a maze game. 
The aim is from the start point to reach the end point.

Initially, the maze is a 7x6 grid but the game could work with different size.


### Pseudo-code


Initiate 
grid rows = 7 cols = 6 rows  
Start point S= (0,0)  
Goal Point G(4,2)

startPosition = { x: 0, y: 0 }  
goalPosition = { x: 4, y: 2 }  
possibleMoves= [  
  { x: 0, y: 1 },  // Droite  
  { x: 1, y: 0 },  // Bas  
  { x: 0, y: -1 }, // Gauche  
  { x: -1, y: 0 }  // Haut   
  ]
  wall=0
  path=1

Tests :  
 Est-ce que je suis à la case arrivée?  
--- non : Est-ce que je suis dans les limites du labyrinthe?  
--------- non : error  
--------- oui : vérifier si le déplacement est possible  
------------ présence de chemin ? :  
--------------- test limite du mabyrinthe si déplacement + 1  
--------------- hors limite : pas de déplacement  
--------------- inside maze : déplacement possible  
------------------ test combien de chemin ?  
------------------ si il y a une possibilité : on se déplace sur la case et on garde en mémoire celle sur laquelle on se trouvait  
------------------ si il y a plus d'une possibilité, on se déplace en primier lieu par défaut en bas si c'est possible,  
------------------ sinon à droite, sinon en haut sinon à gauche  
------------------ et on garde en mémoire celle surlaquelle on se trouvait ainsi que les choix non  effectués (unvisitPosition)  
--------------------------- Tant que ce n'est pas un cul de sac (1 seul chemin possible ET déjà visité)    
--------------------------- alors on retourne en arrière sur la case précédente mémorisée  
--------------------------- et on recherche une case non explorée pour de nouveau faire le test combien de chemin  
Oui : Solution trouvée	

### Logigramme : [fichier](/Maze/maze_logigram.jpeg)