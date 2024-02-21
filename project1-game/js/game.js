class Game {
    //MAIN GAME LOGIC
    constructor() {
        this.startScreen = document.querySelector("#game-intro");
        this.gameScreen = document.querySelector("#game-screen");
        this.gameEndScreen = document.getElementById("game-end");

        this.kitesurfer = new Kitesurfer(
            this.gameScreen,
            15, //left
            4, //bottom
            10, //width
            10, //height
            "../images/kiter.png",
        );
            
        this.height = 600; //del background del game (ocean)
        this.width = 1200; // ocean
        this.obstacles = [];
 
        this.score = 0;
        this.lives = 3;
        this.gameOver = false;
        this.gameIntervalId = null;
        this.gameLoopFrequency = Math.round(1000/60);

        this.frames = 0; 
        this.scoreElement = document.getElementById("score");
        this.livesElement = document.getElementById("lives");
        this.stats = document.getElementById("stats-container");
        this.clockContainer = document.getElementById("clock-container");
        this.clock = document.getElementById("clock");
        this.endMessage = document.getElementById("end-message");

        this.timeLeft = 30;

        this.isMoving = true; //for the obstacles
        // this.initial();
    }


    start() {
        // Set the height and width of the game screen
        this.gameEndScreen.style.display = "none";
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;
    
        // Hide the start screen
        this.startScreen.style.display = "none";
        
        // Show the game screen
        this.gameScreen.style.display = "block";

        //Esto es para mostrar el tiempo
        this.stats.style.display = "block";
        this.clockContainer.style.display = "flex";
    
        // Runs the gameLoop on a fequency of 60 times per second. Also stores the ID of the interval.
        this.gameIntervalId = setInterval(() => {
          this.gameLoop();
        }, this.gameLoopFrequency);
    }

    gameLoop() {
      

        this.frames += 1;
        if (this.frames % 120 === 0) {
            this.obstacles.push(new Obstacle(this.gameScreen))
            // this.generateObstacle();
        };

        this.update();

        if (this.lives <= 0 || this.timeLeft <= 0){
            this.gameOver = true;
        }

        if (this.frames % 60 === 0){
            this.timeLeft--;
            this.clock.innerHTML = this.timeLeft;
        }

        // If "gameIsOver" is set to "true" clear the interval to stop the loop
        if (this.gameOver) {
            clearInterval(this.gameIntervalId);
            this.gameOverScreen();
        }
    }

    
    update() {
        this.obstacles.forEach((obstacle, i) => {
            obstacle.move();
            console.log(obstacle.positionX);
            console.log(this.w);
            if (this.kitesurfer.didCollide(obstacle)){
                obstacle.element.remove();
                this.obstacles.splice(i, 1);
                this.lives -= 1;
            }
      
            if(obstacle.positionX < -10) {
                obstacle.element.remove();
                this.obstacles.splice(i,1);
                this.score++;
            }
        });

        this.scoreElement.innerHTML = this.score;
        this.livesElement.innerHTML = this.lives;
    };


    gameOverScreen(){
        console.log("Game over", this.score);
        this.kitesurfer.element.remove();
        this.obstacles.forEach((obstacle) => {
            obstacle.element.remove();
        });

        this.gameScreen.style.height = `${0}px`;
        this.gameScreen.style.width = `${0}px`;
        this.gameScreen.style.display = "none";
        console.log("Game end screen", this.stats);

        this.stats.style.display = "none";
        this.clockContainer.style.display = "none";
        this.gameEndScreen.style.display = "inherit";

        if (this.timeLeft <= 0) {
            this.endMessage.innerText = `You won! You finished with a score of ${this.score}.`;
        } else {
            this.endMessage.innerText = `You lost!  You ran out of lives and finished with a score of ${this.score}.`;
        }
    };
    
}; 

