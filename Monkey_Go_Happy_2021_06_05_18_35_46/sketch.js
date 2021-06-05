var monkey , monkey_running, monkeyCollide;
var ground, invisiGround, groundImg;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var bananaScore = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload(){
  monkey_running = loadAnimation("https://assets.editor.p5js.org/5f5a2347cd492c00200ecd6d/766b89a3-8732-40fa-85c8-96cd2695887d.png","https://assets.editor.p5js.org/5f5a2347cd492c00200ecd6d/00d89b58-d71e-41b8-85b0-b8f74edba19b.png","https://assets.editor.p5js.org/5f5a2347cd492c00200ecd6d/cdfe4e33-b30a-4047-8186-e6dbee6ce237.png","https://assets.editor.p5js.org/5f5a2347cd492c00200ecd6d/e6baad68-87ab-4b75-b947-b3560ac084f0.png","https://assets.editor.p5js.org/5f5a2347cd492c00200ecd6d/95b79051-5795-43a0-9a07-1a0796830621.png","https://assets.editor.p5js.org/5f5a2347cd492c00200ecd6d/8ac6ce1d-bb09-49dd-a1f9-1192916878a8.png","https://assets.editor.p5js.org/5f5a2347cd492c00200ecd6d/11037de3-4e90-4fa3-b10b-0acb5e339e1c.png","https://assets.editor.p5js.org/5f5a2347cd492c00200ecd6d/d9177493-f364-4475-9343-15cc92538b2a.png","https://assets.editor.p5js.org/5f5a2347cd492c00200ecd6d/22091c43-1d9d-4764-8518-122fd57ec2d5.png") 
  monkeyCollide = loadAnimation("https://assets.editor.p5js.org/5f5a2347cd492c00200ecd6d/00d89b58-d71e-41b8-85b0-b8f74edba19b.png");
  groundImg = loadAnimation("https://assets.editor.p5js.org/5f5a2347cd492c00200ecd6d/d7f9c4fc-73f0-4a50-979c-50ddb02adf61.jpg") 
  bananaImage = loadImage("https://assets.editor.p5js.org/5f5a2347cd492c00200ecd6d/ae1d9744-aeec-47b0-b3a8-b801d0b921ca.png");
  obstacleImage = loadImage("https://assets.editor.p5js.org/5f5a2347cd492c00200ecd6d/87ddc876-2d2a-4e81-bfba-d0b6f3486f44.png");
}

function setup(){
 createCanvas(600,300); 
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  monkey = createSprite(80,230,10,10);
  monkey.scale = 0.12;
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide", monkeyCollide);    
  ground = createSprite(300,340,600,10);
  ground.scale = 1;
  ground.addAnimation("ground", groundImg);
  invisiGround = createSprite(300,278,600,7);
  invisiGround.visible = false; 
}

function draw(){
  background("skyblue");
  fill("black");
  text("SURVIVAL TIME: "+score, 470, 20);
  text("BANANAS COLLECTED: "+bananaScore,300,20);
  
  if (gameState === PLAY){
    obstacles();
    bananas();
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(4+score*1.5/100);
  
    if(keyDown("space")&&monkey.y >= 235) {
      monkey.velocityY = -13; 
    }
    monkey.velocityY = monkey.velocityY + 0.5     
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if (monkey.isTouching(bananaGroup)){
      bananaScore++;  
      bananaGroup.destroyEach();
    }
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
  }
  
  if (gameState === END){
    ground.velocityX = 0;
    monkey.y = 235;
    monkey.scale = 0.12;
    monkey.changeAnimation("collide", monkeyCollide);
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    fill("red")
    stroke("black")
    textSize(30);
    text("GAMEOVER!!!", 220, 170);
    fill("black");
    textSize(15);
    text("Press 'R' to play again", 240, 200);
    
    if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
    }
  }
  drawSprites(); 
  monkey.collide(invisiGround);
}

function bananas(){
  if (frameCount%80 === 0){  
    banana = createSprite(620,120, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+score*1.5/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);
    bananaGroup.add(banana); 
  }
}

function obstacles(){
  if (frameCount%200 === 0){  
    obstacle = createSprite(620,253,50,50);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(4+score*1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle); 
  }
}