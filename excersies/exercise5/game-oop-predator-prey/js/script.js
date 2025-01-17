// Predator-Prey Simulation
// by Lisa Dubuc
//
//it is a predator and prey game where different animals are chasing others
//the size and speed of the preys change
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so they must keep eating to survive.

// Our predator
//create 2 new predators
let tiger;
let snake;
let wolf;

// The three prey
let chicken;
let bunny;
let bee;

// add variables for images
let tigerImage;
let snakeImage;
let wolfImage;
let chickenImage;
let bunnyImage;
let beeImage;
let safariImage;

//add variable for socreboard
let scoreBoard;

//preload images
function preload() {
  tigerImage = loadImage('assets/images/tiger.png');
  snakeImage = loadImage('assets/images/snake.png');
  wolfImage = loadImage('assets/images/wolf.png');
  chickenImage = loadImage('assets/images/chick.png');
  bunnyImage = loadImage('assets/images/bunny.png');
  beeImage = loadImage('assets/images/bee.png');
  safariImage = loadImage('assets/images/forest.jpg');
}


// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
//give the two new predators code keys
//add images in set up
//add sprint to the set up and to all predators with individual keycodes
function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(100, 100, 5, color(200, 200, 0), 40, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, tigerImage, SHIFT);
  snake = new Predator(100, 100, 5, color(200, 100, 0), 40, 87, 83, 65, 63, snakeImage, 32);
  wolf = new Predator(100, 100, 5, color(100, 200, 0), 40, 85, 74, 72, 75, wolfImage, ENTER);
  bunny = new Prey(100, 100, 10, color(255, 100, 10), 50, bunnyImage);
  chicken = new Prey(100, 100, 8, color(255, 255, 255), 60, chickenImage);
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10, beeImage);
  scoreBoard = new scoreboard(tiger.score, snake.score, wolf.score);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(safariImage);

  // Handle input for the tiger
  // give the 2 new predators handle input
  tiger.handleInput();
  wolf.handleInput();
  snake.handleInput();

  // Move all the "animals"
  wolf.move();
  snake.move();
  tiger.move();
  bunny.move();
  chicken.move();
  bee.move();

  // Handle the tiger eating any of the prey
  //give them to the two new predators too
  tiger.handleEating(chicken);
  tiger.handleEating(bunny);
  tiger.handleEating(bee);
  wolf.handleEating(chicken);
  wolf.handleEating(bunny);
  wolf.handleEating(bee);
  snake.handleEating(chicken);
  snake.handleEating(bunny);
  snake.handleEating(bee);

  // Display all the "animals"
  snake.display();
  wolf.display();
  tiger.display();
  chicken.display();
  bunny.display();
  bee.display();

  //put scoreboard in display
  scoreBoard.updateScores(tiger.score, snake.score, wolf.score);
  scoreBoard.display();
}
