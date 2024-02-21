class Obstacle {
    //The obstacles to jump over
    constructor (gameScreen){
        this.imgArr = ["sharkobstacle.png", "boyobstacle.png", "fishobstacle.png"]
        this.gameScreen = gameScreen;
        this.speed = 5; 
        this.positionX = gameScreen.offsetWidth;
        this.top = gameScreen.offsetHeight
        this.width = 50; 
        this.height = 50;
        console.log(this.top);

        //NEED TO ADD THE OTHER OBSTACLES
        this.element = document.createElement("img");
        this.element.src = `images/${this.imgArr[Math.floor(Math.random() * this.imgArr.length) ]}`;
        this.element.style.position = "absolute";
        this.element.style.top = (this.top - this.height) + "px"
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;

        this.updatePosition();

        this.gameScreen.appendChild(this.element);
    }

    move() {
        this.positionX -= this.speed;
        this.updatePosition();
    }

    updatePosition () {
        this.element.style.left = `${this.positionX}px`;

    }


}