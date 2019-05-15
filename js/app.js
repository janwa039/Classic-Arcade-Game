const collisionXLength = 20
var level = 0
let closeIcon = document.getElementsByClassName("close")[0]
let score = 0

let playAgainButton = document.getElementById('play-again')

// generates random numbers between the mininum and maximum number to use for the spped
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x; //position of the enemy in the x axis
    this.y = y; //position of the enemy in the y axis
    this.speed = getRandomInt(100, 50);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt
    // Increases the enemy speed based on what level the player is on
    if(this.x > 550){
        this.x = -200;
    }
    else {

        if(level === 0){

            this.x += this.speed * dt;

        }else if(level === 1){

            this.x += 2 * this.speed * dt;
        }
        else if ( level === 2){

            this.x += 2.5 * this.speed * dt;
        }
        else{

            this.x += 2.9 * this.speed * dt;
        }
    }
 
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player =function(x, y, playerImage){
    this.playerImage = playerImage
    this.x = x //position of the player in the x axis
    this.y = y //position of the player in the y axis
}

Player.prototype.update=function(){
    return this.y
}

Player.prototype.render =function(){
    ctx.drawImage(Resources.get(this.playerImage), this.x, this.y)

}

Player.prototype.handleInput=function(keyPressed){
    // console.log('here')

    //board is 0 to 505 from left and 0 to 606 from up down
    switch(keyPressed){
        case 'left':
        if(this.x > 30)
            this.x = this.x - 38
        break
        case 'right':
        if(this.x < 379){
           this.x = this.x + 38
        }
        else if(this.x >= 390) {
            this.upDatePlayers()
        }

        break
        case 'up':
        if(this.y > 0){
            this.y = this.y - 38
        }
        else{
            level = level + 1
            document.getElementById('level1').innerHTML = `Level ${level}`
            gameReset()

        }
        break
        case 'down':
        if(this.y < 400)
            this.y = this.y + 38
        break
    }

}
/* this function put the player to the begining position
* when it colides with an enemy
*/
Player.prototype.reset = function(){
    this.x=200
    this.y=400
}
/* this function put the player to the begining position
* before it started the game
*/
Player.prototype.startAgain = function (){
    this.x=390
    this.y=420
}

/* this function handles when the enemy and player colide
* so it reset the game when the player coliides with an enemy
*/
function checkCollisions(enemies, player){
    enemies.forEach(function(enemy){
        if(enemy.x < player.x + 45 && enemy.x + 45 > player.x  &&
           enemy.y < player.y + 45 && enemy.y + 45 > player.y  ){
            score +=1
            document.getElementById("score").innerHTML = `${score}`
            player.reset()
        }
    })

}

//player initialiazation
let player = new Player(390, 420, 'images/char-boy.png')

//Array of players images
let charPlayer = [
    'images/char-boy.png',
    'images/char-horn-girl.png',
    'images/char-cat-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
]
let min = 0
let max = 1

// handles the change of characters
Player.prototype.upDatePlayers = function (){
    if(min <= 4 && max <=5 ){
        let  charPlayerCurrent = charPlayer.slice(min, max)

        player = new Player(390, 420,  charPlayerCurrent[0])
        min +=1
        max +=1
        charPlayerCurrent.pop()

    }
    else{
        min = 0
        max = 1
    }

}

document.addEventListener('click', player.upDatePlayers) 


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemy2 = new Enemy(-600,60);
var enemy3 = new Enemy(-165,140);
var enemy4 = new Enemy(-500,140);
var enemy5 = new Enemy(-200,220);
var enemy6 = new Enemy(-400,220);
var enemy1 = new Enemy(-300,60);

// Place the player object in a variable called player
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6]

function dismissPopUp () {

allEnemies.forEach(enemy=>{
        enemy.speed = getRandomInt(100, 50)
})

// Play again button restarts the game and removes the modal
level = 0
score = 0
document.getElementById('level1').innerHTML = `Level ${level}`
document.getElementById('score').innerHTML = `${score}`
player.startAgain() 
// When the user clicks on <span> (x), close the modal  
document.getElementById('popUpAlert').style.display = "none"
allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5]


}

closeIcon.addEventListener('click', dismissPopUp)

// Handle the alert when the player wins the game
function popUp () {

    document.getElementById('popUpAlert').style.display = 'block'
    document.getElementById('winning').style.color = '#5fc148'
    if(score > 10){
        document.getElementById('winning').innerHTML = `oh oh , you lost ${score} lives at ${level-1} level, don't worry just try again`
    }
    else{
        document.getElementById('winning').innerHTML = `Great work , you lost ${score} lives at ${level-1} level`
    }

}


function gameReset(){
    player.reset()
    if(level === 1){

    }else if(level === 2 ){
        var enemy9 = new Enemy(-700,210)
        allEnemies.push(enemy9)

    }else if(level === 3){
        var enemy10 = new Enemy(0,220)
        allEnemies.push(enemy10)

    }else if(level === 4){
        popUp()
        level = 0
        allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5]
      

    }
}


playAgainButton.addEventListener('click', dismissPopUp)


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});



