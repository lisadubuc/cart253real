"use strict";

/******************************************************

Game - Chaser
Lisa Dubuc

This is a hunting game where the player "the dark moon" is chasing it's prey "the light moon".
when the player overlaps the prey, the player has caught/eaten the prey making the prey smaller
and the player bigger. it will also change the color of the screen sometimes helping the prey to
cammoufage or help the player see the prey. if the player is not fast enough he will die since he
needs to prey to stay alive.

Includes: Physics-based movement, keyboard controls, health/stamina,
random movement, screen wrap.

******************************************************/

// Track whether the game is over
let gameOver = false;

// Player position, size, velocity
let playerX;
let playerY;
let playerRadius = 25;
let playerVX = 0;
let playerVY = 0;
//make the speed of player faster
let playerMaxSpeed = 3;
// Player health
let playerHealth;
let playerMaxHealth = 255;
// Player fill color
let playerFill = 50;

// Prey position, size, velocity
let preyX;
let preyY;
let preyRadius = 25;
let preyVX;
let preyVY;
//change prey speed
let preyMaxSpeed = 8;
// Prey health
let preyHealth;
let preyMaxHealth = 100;
// Prey fill color
let preyFill = 200;
//add variable preynoise
let preynoise = 0;

// Amount of health obtained per frame of "eating" (overlapping) the prey
let eatHealth = 10;
// Number of prey eaten during the game (the "score")
let preyEaten = 0;
//add variable playerhealthspeed with original speed of health decreasing
let playerhealthspeed = 0.5;
//add variables for backgrounds
let backgroundR = 255;
let backgroundG = 255;
let backgroundB = 255;
//add variable for sound
let gameSound;

let gameImage1;
let gameImage2

//add preload function
function preload() {
  //add in sound
  gameSound = loadSound('assets/sounds/game.wav');
  //add image for player
  gameImage1 = loadImage('assets/images/darkmoon.png');
  gameImage2 = loadImage('assets/images/yellowmoon.png');
}
// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(500, 500);

  noStroke();

  // We're using simple functions to separate code out
  setupPrey();
  setupPlayer();
  gameSound.play();
}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width / 5;
  preyY = height / 2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4 * width / 5;
  playerY = height / 2;
  playerHealth = playerMaxHealth;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  //add backgrounf with variable
  background(backgroundR, backgroundG, backgroundB);

  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();

    drawPrey();
    drawPlayer();
  } else {
    showGameOver();
  }
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
  } else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
  } else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
  } else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
  } else if (keyIsDown(SHIFT)) {
    //add the speed of the health decreasing faster when press shift
    playerhealthspeed = playerhealthspeed + 0.05;
    //add that the player has more speed when pressed shift
    if (playerVX < 0) {
      playerVX = playerVX - 1;
    } else if (playerVX > 0) {
      playerVX = playerVX + 1;
    }
    if (playerVY < 0) {
      playerVY = playerVY - 1;
    } else if (playerVY > 0) {
      playerVY = playerVY + 1;
    }
  } else {
    playerVY = 0;
  }
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX = playerX + playerVX;
  playerY = playerY + playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    // Off the left side, so add the width to reset to the right
    playerX = playerX + width;
  } else if (playerX > width) {
    // Off the right side, so subtract the width to reset to the left
    playerX = playerX - width;
  }

  if (playerY < 0) {
    // Off the top, so add the height to reset to the bottom
    playerY = playerY + height;
  } else if (playerY > height) {
    // Off the bottom, so subtract the height to reset to the top
    playerY = playerY - height;
  }
}

// updateHealth()
//
// Reduce the player's health (happens every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health
  playerHealth = playerHealth - playerhealthspeed;
  // Constrain the result to a sensible range
  playerHealth = constrain(playerHealth, 0, playerMaxHealth);
  // Check if the player is dead (0 health)
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  let d = dist(playerX, playerY, preyX, preyY);
  // Check if it's an overlap
  if (d < playerRadius + preyRadius) {
    // Increase the player health
    playerHealth = playerHealth + eatHealth;
    // Constrain to the possible range
    playerHealth = constrain(playerHealth, 0, playerMaxHealth);
    // Reduce the prey health
    preyHealth = preyHealth - eatHealth;
    // Constrain to the possible range
    preyHealth = constrain(preyHealth, 0, preyMaxHealth);
    //make the player bigger when the player eats the prey
    playerRadius = playerRadius + 1;
    //constrain the radius size
    playerRadius = constrain(playerRadius, 25, 100)

    // Check if the prey died (health 0)
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0, width);
      preyY = random(0, height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten = preyEaten + 1;
      //add change of background when prey is eaten
      if (preyEaten > 1) {
        backgroundR = random(0, 255);
        backgroundG = random(0, 255);
        backgroundB = random(0, 255);
      }
    }
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  // Change the prey's velocity at random intervals
  // random() will be < 0.05 5% of the time, so the prey
  // will change direction on 5% of frames
  if (random() < 0.05) {
    // Set velocity based on random values to get a new direction
    // and speed of movement
    //
    // Use map() to convert from the 0-1 range of the random() function
    // to the appropriate range of velocities for the prey
    // change for noise and add a variation to preynoise
    preyVX = map(noise(preynoise), 0, 1, -preyMaxSpeed, preyMaxSpeed);
    preynoise += .4;
    preyVY = map(noise(preynoise), 0, 1, -preyMaxSpeed, preyMaxSpeed);
    preynoise += .4;

  }

  // Update prey position based on velocity
  preyX = preyX + preyVX;
  preyY = preyY + preyVY;

  // Screen wrapping
  // change the prey size to smaller when they are about to avoid the player
  if (preyX < 0) {
    preyRadius = preyRadius - 0.5;
    preyX = preyX + width;
  } else if (preyX > width) {
    preyRadius = preyRadius - 0.5;
    preyX = preyX - width;
  }

  if (preyY < 0) {
    preyRadius = preyRadius - 0.5;
    preyY = preyY + height;
  } else if (preyY > height) {
    preyRadius = preyRadius - 0.5;
    preyY = preyY - height;
  }
}

// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
  //change prey for an image and make it CENTER
  imageMode(CENTER);
  // add tint so image is faded helps with camouflage
  tint(255, preyHealth);
  image(gameImage2, preyX, preyY, preyRadius * 2, preyRadius * 2);
}

// drawPlayer()
//
// Draw the player as an ellipse with alpha value based on health
function drawPlayer() {
  fill(playerFill, playerHealth);
  //change player for an image and make it center
  imageMode(CENTER);
  // add tint so the image is full
  tint(255, 255);
  image(gameImage1, playerX, playerY, playerRadius * 2, playerRadius * 2);
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  // Set up the font
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(0);
  // Set up the text to display
  let gameOverText = "GAME OVER\n"; // \n means "new line"
  gameOverText = gameOverText + "You ate " + preyEaten + " prey\n";
  gameOverText = gameOverText + "before you died."
  // Display it in the centre of the screen
  text(gameOverText, width / 2, height / 2);
}
