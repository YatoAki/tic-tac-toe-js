# Tic-Tac-Toe

Classic Tic-Tac-Toe Game created with Html, Css & JavaScript

## Features

* Play with friends - 1 vs 1

## How to run the game

### Through the GitHub page

Check the live version <a href="https://yatoaki.github.io/tic-tac-toe-js/">Here</a>

### On your local machine

1. First, clone this repo to your local mechine with __git__ command.
* `git clone https://github.com/YatoAki/tic-tac-toe-js`
2. Go to the cloned source code dictionary.
3. Open the `index.html` file in your broswer.

## Game Architecture - `script.py`

### player Factory Function

* Keep player's sign as private
* Get method for the sign

### gameBoard Factory Function

* Keep board as private
* getter, setter & reset method for board

### displayController Factory Function

* Connect between our JavaScript functions & Html file
* Displaying our action & showing messages

### gameController Factory Function

* Use all the other functions to process the game
* It will make players play taking turn and check for the winner
