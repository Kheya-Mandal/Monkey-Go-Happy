//setting up memory spot
var monkey, monkey_running;
var banana, bananaImage, obstacles, obstacleImage;
var score;
var ground;
var bananaGroup, obstaclesGroup;
var background, backgroundImg;
var canvas;
var play = 1;
var end = 0;
var gameState = play;

function preload() {
  //loading image and animation
  monkey_running = loadAnimation(
    "sprite_0.png",
    "sprite_1.png",
    "sprite_2.png",
    "sprite_3.png",
    "sprite_4.png",
    "sprite_5.png",
    "sprite_6.png",
    "sprite_7.png",
    "sprite_8.png"
  );
  monkeyStop = loadImage("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  backgroundImg = loadImage("jungle.jpg");
}

function setup() {
  canvas = createCanvas(displayWidth - 50, displayHeight - 100);

  //creating monkey,ground,score and the groups
  monkey = createSprite(displayWidth / 10, displayHeight - 400, 10, 10);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.25;

  ground = createSprite(
    displayWidth / 2,
    displayHeight - 200,
    displayWidth * 3,
    20
  );
  ground.velocityX = -4;

  ground.visible = false;

  //creating groups
  bananaGroup = createGroup();
  obstaclesGroup = createGroup();
  score = 0;

  //monkey.debug = fa;
  monkey.setCollider("rectangle", 0, 0, 500, 500);
}

function draw() {
  //background("white");
  background(backgroundImg);

  text(mouseX + "," + mouseY, mouseX, mouseY);
  //dusplaying the text
  stroke("white");
  textSize(20);
  fill("white");
  //text("ServibleTime:"+score,300,50);

  survibleTime = Math.ceil(frameCount);
  text("ServibleTime:" + score, displayWidth / 10, displayHeight / 10);
  //increasing the score
  score = score + Math.round(frameCount / 100);
  if (gameState === play) {
    background.velocityX = -4;
    //scrolling ground
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    //jump when keydown pressed
    if (keyDown("space")) {
      monkey.velocityY = -15;
    }
    //adding gravity
    monkey.velocityY = monkey.velocityY + 0.8;

    //monkey.x = camera.position.x-350;
    //camera.position.y = monkey.y-100;

    spawnBananas();
    spawnObstacles();

    if (obstaclesGroup.isTouching(monkey)) {
      gameState = end;
      text("GameOver", 200, 200);
    }
  } else if (gameState === end) {
    monkey.addImage(monkeyStop);
    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);

    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }

  monkey.collide(ground);

  drawSprites();
}

//functions
function spawnBananas() {
  if (frameCount % 100 === 0) {
    banana = createSprite(displayWidth, displayHeight / 8, 10, 10);
    banana.addImage(bananaImage);
    banana.scale = 0.2;
    banana.y = Math.round(random(120, 200));
    banana.velocityX = -4;
    banana.lifetime = 100;
    bananaGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 100 === 0) {
    obstacles = createSprite(
      camera.position.x + 200,
      displayHeight / 1.65,
      10,
      10
    );
    obstacles.velocityX = -6;
    obstacles.addImage(obstaceImage);
    obstacles.scale = 0.3;
    obstacles.lifetime = 150;
    obstaclesGroup.add(obstacles);
  }
}
