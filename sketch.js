var bgImg2,bgImg;
var player ,playerWalk,playerJump;
var obstGroup;
var obst1Img,obst2Img,obst3Img,obst4Img,obst5Img,obst6Img,obst7Img,obst8Img;
var garbageGroup;
var garbage1Img,garbage2Img,garbage3Img,garbage4Img;
var gameOver;
var trackImg;
var obstacle,garbage;
var stars;

var score;

var ground;
var road,invroad;

var gameState = "wait";
var play1,playImg;
var lose, winning;

var jumpSound,coinSound,loseSound;


function preload(){
  //load image & sound
  playerWalk=loadAnimation("FighterW-1.png","FighterW-2.png","FighterW-3.png");
  playerJump=loadAnimation("FighterJ-1.png","FighterJ-2.png","FighterJ-3.png");

  obst1Img=loadImage("obs-1.png");
  obst2Img=loadImage("obs-2.png");
  obst3Img=loadImage("obs-3.png");
  obst4Img=loadImage("obs-4.png");
  
  

  garbage1Img=loadImage("bonus-1.png");
  garbage2Img=loadImage("bonus-2.png");
  garbage3Img=loadImage("bonus-3.png");
  garbage4Img=loadImage("bonus-4.png");

  bgImg=loadImage("plastic-bg.jpg");
  bgImg2=loadImage("aiua.jpg");
  gameOver=loadImage("gameover.jpg");
  trackImg=loadImage("track.jpg");

  playImg=loadImage("start.png");

  jumpSound=loadSound("jump-1.wav");
  coinSound=loadSound("coin.wav");
  loseSound=loadSound("game-over.wav");
}

function setup() {

  createCanvas(windowWidth,windowHeight);
    //createSprite 
  score=0;
  player=createSprite(displayWidth/2-displayWidth/3,displayHeight/2,20,20);
  player.addAnimation("running",playerWalk);
  player.addAnimation("jump",playerJump);

  play1=createSprite(displayWidth/2+100,displayHeight/2,20,20);
  play1.addImage(playImg);
  play1.scale=0.5;

  ground=createSprite(displayWidth/2,displayHeight/2-displayHeight/5,20,displayHeight/2);
  ground.addImage(bgImg2);
  bgImg2.resize(displayWidth+displayWidth+300,displayHeight/2+displayHeight/5);
  ground.x = ground.width /2;

  road=createSprite(displayWidth/2,displayHeight/2+displayHeight/4+30,displayWidth+800,70);
  road.addImage(trackImg)
  road.scale=0.30;

  invroad=createSprite(displayWidth/2,displayHeight/2+displayHeight/4,displayWidth,5);
  invroad.visible=false;

  obstGroup = createGroup();
  garbageGroup=createGroup();
}

function draw() {
  
  if(gameState==="wait"){
    background(bgImg);
    fill("black");
     textSize(30);
     text("Press Space To Jump",100,50);
     
    start();
  }

  else if(gameState==="play"){
    background("LightGreen");

   

  
    //infinite background
    ground.velocityX = -(6+score/50);
    road.velocityX = -(6+score/50);
    

    if (ground.x < 0){
      ground.x = ground.width/2;
    } 

    if (road.x < 450){
      road.x = road.width/11;
    } 
    
    // player jump
    if(keyDown("space")&& player.y>=displayHeight/2+150 ) {
      player.velocityY = -25;
      jumpSound.play();
     
    }
 
    //game over
    if(obstGroup.isTouching(player)){
      gameState = "end";
    loseSound.play();
    }

    // adding score
    if(garbageGroup.isTouching(player)){
      score=score+5;
      garbage.remove();
      coinSound.play();
    }
   
    
    
    ground.depth=player.depth;
    player.depth=player.depth+1;
    

    spawnObstacles();
    spawnGarbage();

    run();
  }

  else if(gameState==="end"){
    background("black");
       
       end();

  }

  player.collide(invroad);
  //gravity
  player.velocityY= player.velocityY+0.8;
  

drawSprites();


if(gameState==="play"){
  textSize(30);
  fill("black")
text("Score: "+ score, 100,50);
}

}

function start(){
  player.visible=false;
  play1.visible=true;
  ground.visible=false;
  road.visible=false;
  obstGroup.visible=false;
  garbageGroup.visible=false;
  player.velocityX=0;
  if(mousePressedOver(play1) == true){
    gameState="play";
}
}

function run(){
  player.visible=true;
  play1.visible=false;
  ground.visible=true;
  road.visible=true;
  obstGroup.visible=true;
  garbageGroup.visible=true;
  
}

function end(){
  player.visible=false;
  obstGroup.destroyEach();
  garbageGroup.destroyEach();
  road.visible=false;
  ground.visible=false;
  play1.visible=false;
  obstGroup.velocityX=0;
  garbageGroup.velocityX=0;
  score.visible=true;
  swal(
    {
      title: `Game Over!!! Try Again`,
      text: 'Score:'+score,
      imageUrl:"gameover.jpg",
            imageSize: "150x150",
      confirmButtonText: "Ok"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
        
      }
      
    }
  );///swal end
}


function spawnObstacles(){
  if (frameCount % 200 === 0){
     obstacle = createSprite(displayWidth+500,displayHeight/2+displayHeight/5,10,40);
    obstacle.velocityX = -(8+score/50);
    
     //generate random obstacles
     var rand = Math.round(random(1,4));
     switch(rand) {
       case 1: obstacle.addImage(obst1Img);
               break;
       case 2: obstacle.addImage(obst2Img);
               break;
       case 3: obstacle.addImage(obst3Img);
               break;
       case 4: obstacle.addImage(obst4Img);
               break; 
       default: break;
     }
    
     //assign scale and lifetime to the obstacle           
     obstacle.scale = 0.4;
     obstacle.lifetime = 500;
    
    //add each obstacle to the group
     obstGroup.add(obstacle);
  }
 
}

function spawnGarbage(){
  if (frameCount % 250 === 0){
     garbage = createSprite(displayWidth,displayHeight/2+displayHeight/5,10,40);
    garbage.velocityX = -(6+score/50);
    
     //generate random obstacles
     var rand1 = Math.round(random(1,4));
     switch(rand1) {
       case 1: garbage.addImage(garbage1Img);
               break;
       case 2: garbage.addImage(garbage2Img);
               break;
       case 3: garbage.addImage(garbage3Img);
               break;
       case 4: garbage.addImage(garbage4Img);
               break;
       default: break;
     }
    
     //assign scale and lifetime to the obstacle           
    
     console.log(garbage.depth)
     console.log(ground.depth)
    garbage.scale=0.4
    //add each garbage to the group
     garbageGroup.add(garbage);

     ground.depth=garbageGroup.depth;
     garbageGroup.depth=garbageGroup.depth+1;
  }
 
}


