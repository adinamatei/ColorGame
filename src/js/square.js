//jshint esversion:6
var numSquares = 6;
var colors = [];
var pickedColor;


var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById('colorDisplay');
var messageDisplay = document.getElementById("message");
var headingColor = document.querySelector('h1');
var resetButton = document.querySelector('#resetBtn');
// var easy = document.querySelector("#easyBtn");
// var hard = document.querySelector("#hardBtn");
var modeButton = document.querySelectorAll(".mode");

init();

function init() {
  setupModeButtons();
  setupSquares();
  reset();
}

//setup and add event listener on easy and hard button
function setupModeButtons(){
  for (var i = 0; i < modeButton.length; i++) {
    //add event listener to buttons and remove and add class
    modeButton[i].addEventListener("click", function(){
      modeButton[0].classList.remove('selected');
      modeButton[1].classList.remove('selected');
      this.classList.add('selected');

      //when click on .mode buttons
      this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
      reset();
    });
  }
}


function setupSquares () {
  for (var i = 0; i < squares.length; i++) {
    //add event listener to squares
    squares[i].addEventListener("click", function () {
      //take color of clicked square
      var clickedSquare = this.style.backgroundColor;

      //compare clickedSquare with pickedColor
      if (clickedSquare === pickedColor){
        messageDisplay.textContent = "Correct!";
        resetButton.textContent = "Play Again?";
        correctColor(clickedSquare);
        headingColor.style.backgroundColor = clickedSquare;
      }
      else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try Again!";
      }
    });
  }
}


function reset () {
  //generate all new colors
  colors = generateRandomColors(numSquares);
  //pick a new random color from array
  pickedColor = pickRandomColor();
  //change colorDisplay with pickedColor
  colorDisplay.textContent = pickedColor;
  //reset messageDisplay to empty
  messageDisplay.textContent = "";
  //reset button
  resetButton.textContent = "New Colors";

  //change colors of squares
  for (var i = 0; i < squares.length; i++) {
    if(colors[i]){
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    }
    else {
      squares[i].style.display = "none";
    }
  }
  headingColor.style.backgroundColor = "#4278ab";
}


// add event listener on reset button
resetButton.addEventListener("click", function() {
  reset();
});


//when find correct color change the color of all squares
function correctColor (color) {
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}

// pick a random color from colors
function pickRandomColor () {
  var pickColor = Math.floor(Math.random() * colors.length);
  return colors[pickColor];
}

//get random color for number times and push into array
function generateRandomColors (number) {
  var color = [];
  for (var i = 0; i < number; i++) {
    color.push(randomColor());
  }
  return color;
}


//generate a rgb color
function randomColor () {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return ("rgb(" + r + ", " + g + ", " + b + ")");
}
