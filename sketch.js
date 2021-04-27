//all variables
var forest, forestimg;
var gem, gemimg;
var princess, princessimg;
var warriorimg;
var branches, branchesimg;
var gemGroup;
var ground;
var warriorGroup;
var gameOver;
var restart;
var warrior

//initiate Game States
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {

warriorimg=loadImage("princess animations/princess1.png");

//loading gem gif
gemimg=loadAnimation("gem frames/frame0.gif","gem frames/frame1.gif","gem frames/frame2.gif","gem frames/frame3.gif","gem frames/frame4.gif","gem frames/frame5.gif","gem frames/frame6.gif","gem frames/frame7.gif");

//loading forest image
forestimg=loadImage("forest1.jpg");

//loading princess image
princessimg=loadAnimation("princess animations/princess1.png","princess animations/princess2.png","princess animations/princess3.png")

}


function setup() {
  createCanvas(1600,400);

//create warrior group
warriorGroup = new Group();

//create gem group
gemGroup = new Group();

//place gameOver and restart icon on the screen
 gameOver = createSprite(200,300);
 restart = createSprite(200,340);
//gameOver.addAnimation("gameOver");
gameOver.scale = 0.5;
//restart.addAnimation("restart");
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;

//ground sprite
ground=createSprite(800,400,1600,10);

//making ground invisible
ground.visible=false;

//background sprite
forest=createSprite(750,200,10,10);
forest.addImage(forestimg);

//princess sprite
princess=createSprite(150,350,10,10)
princess.addAnimation("princess1",princessimg);

//scale forest
forest.scale=2;

//scale princess
princess.scale=1;
 
// creating gem animation
 //gem.addAnimation("gem",gemimg);


}



function draw() {
background("white");

if(gameState===PLAY){

//move background
forest.velocityX=(-5);

if(forest.x<0){

forest.x= forest.width/2;
}

//Princess Jump
if(keyDown("space")&& princess.y> 300){
princess.velocityY=-16;
}
//gravity
princess.velocityY+=0.8;



spawnGems();

spawnWarrior();

//End the game when princess is touching the warrior
if(warriorGroup.isTouching(princess)){
  gameState = END;
  //playSound("die.mp3");
}

}

else if(gameState===END){
gameOver.visible=true;
restart.visible=true;

//stop objects
forest.velocityX=0;
princess.velocityY=0;
warriorGroup.setVelocityXEach(0);
gemGroup.setVelocityXEach(0);

}



//collide
princess.collide(ground);

drawSprites();
}


function spawnWarrior() {
  if(World.frameCount % 60 === 0) {
    warrior = createSprite(1600,300,50,100);
    warrior.velocityX = - 6;
    warrior.addImage(warrior.png);
    //generate random obstacles
    console.log("hello");
    //warrior.setAnimation("warrior" + rand);
    
    //assign scale and lifetime to the obstacle           
    //warrior.scale = 0.5;
    warrior.lifetime = 70;
    //add each obstacle to the group
    warriorGroup.add(warrior);
  }
}

//spawn gems function
function spawnGems(){
  var r=Math.round(random(200,300));
  console.log(r);
  if(World.frameCount % r === 0){
    gem=createSprite(1600,300,10,10)
    gem.velocityX= (-5)

    //spawn gems at different heights
    gem.y= random (200,300)
    gem.addAnimation("gem",gemimg);
  //gem lifetime
    gem.lifetime = 60;
   //scale gem
    gem.scale= 0.1;

    gemGroup.add(gem);

  }

}