// Exercise 1 - Movement
// Pippin Barr
//
// Starter code for exercise 1.
// Draws a moving square and circle that intersect
// in the middle of the canvas.

// The current position and size of the circle
let circleX;
let circleY;
let circleSize = 100;

// The current position and size of the square
let squareX;
let squareY;
let squareSize = 100;
//current position and size of text
let textX=0;
let textY=640;
let textSize=100;
//to get current position of ellipse
let ellipseX;
let ellipseY;










// preload()
//
// Nothing here

function preload() {

}


// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);
  //current position of ellipse
  ellipseX = 0;
  ellipseY = height/2;
  // textX=width+textSize/2;
  // textY=height+textSize/2;
  // Start the circle off screen to the bottom left
  // We divide the size by two because we're drawing from the center
  circleX = -circleSize/2;
  circleY = height + circleSize/2;

  // Start the square off screen to the bottom right
  // We divide the size by two because we're drawing from the center
  squareX = width + squareSize/2;
  squareY = height + squareSize/2;


  // We'll draw rectangles from the center
  rectMode(CENTER);


  // We won't have a stroke in this
  noStroke();
}


// draw()
//
// Change the circle and square's positions so they move
// Draw the circle and square on screen

function draw() {
//draw red ellipse to go across the canvas
  fill(255,0,0,10);
  ellipseX = ellipseX + 1;
  ellipse(ellipseX,ellipseY,50,50);
    // We don't fill the background so we get a drawing effect
  // Move circle up and to the right
  circleX += 1;
  circleY -= 1;
  // Make the circle transparent red
  fill(255,0,0,10);
  // Display the circle
  ellipse(circleX,circleY,circleSize,circleSize);

  // Move square up and to the left
  squareX -= 1;
  squareY -= 1;
  // Make the square transparent blue
  fill(0,0,255,10);
  // Display the square
  rect(squareX,squareY,squareSize,squareSize);

  //add text to the screen
  let lowkey = "We need to stay lowkey";
  fill(0);
  text(lowkey, textX, textY); //make text black
  textX+=1;
  textY-=1;




  //create rectangle for mouse
  fill(0)// make it black
  rect(mouseX,mouseY,30,30);

  }
