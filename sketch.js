var player,playerImage;

var bg,bgImage;

var obstacle,obstacleImage;

var goldenBall,gBImage;

var gbGroup,obstacleGroup;

var score;

var gameState = "play";

function preload() {
  
  bgImage = loadImage("codingbg2.jpg");
  playerImage = loadImage("coding caracter.png");
  
  gBImage = loadImage("coding ball2.png");
  obstacleImage = loadImage("coding ball3.jpg");
  
}

function setup() {
  createCanvas(400, 400);
  
  bg = createSprite(200,200,200,100);
  bg.addImage("movingBG",bgImage);
  bg.velocityX = -4;
  bg.x = bg.width/2;
  
  player = createSprite(50,300,10,20);
  player.addImage("movingCaracter", playerImage);
  player.scale = 0.3;
  
  score = 0;
  
  obstacleGroup =  new Group();
  gbGroup = new Group();
}

function draw() {
  background(220);
  
  if(gameState === "play") {
      if(bg.x < 0) {
      bg.x = bg.width/2;
    }

    if(keyDown("space")) {
      player.velocityY = -12;
    }

    player.velocityY = player.velocityY+0.8;  

    spawnObsBall();

    spawnGoldenball();

    drawSprites();

    stroke("white");
    textSize(20);
    fill("white");
    text("Points:"+score,300,75);

    if(gbGroup.isTouching(player)) {
      score = score+2;

      gbGroup.destroyEach();
    }

   if(obstacleGroup.isTouching(player)) {
      player.velocityX = 0;
      bg.velocityX = 0;

      gbGroup.setVelocityXEach(0);
      obstacleGroup.setVelocityXEach(0);

      gbGroup.setLifetimeEach(-1);
      obstacleGroup.setLifetimeEach(-1);
      
      gameState = "end";
   }
  }
  
  if(gameState === "end") {
    stroke("white");
    textSize(25);
    fill("white");
    text("Game over",200,150);
  }
} 

function spawnGoldenball() {
  if(frameCount % 80 === 0) {
    goldenBall = createSprite(250,200,20,10);
    goldenBall.y = Math.round(random(120,200));
    goldenBall.velocityX = -5;
    
    goldenBall.lifetime = 390;
    player.depth = goldenBall.depth+1;
    
    goldenBall.addImage("gs",gBImage);
    goldenBall.scale = 0.1;
    
    gbGroup.add(goldenBall);
  }
}

function spawnObsBall() {
  if(frameCount % 250 === 0){
    obstacle = createSprite(350,300,20,20);
    obstacle.velocityX = -5;
    
    obstacle.addImage("sb",obstacleImage);
    obstacle.scale = 0.06;
    
    obstacle.lifetime = 390;
    
    obstacleGroup.add(obstacle);
  }
}

