var dog;
var dogImage;
var happyDog;
var database;
var foodS;
var foodStock;

function preload()
{
dogImage = loadImage("dogImg.png");
happyDog = loadImage("dogImg1.png");
}

function setup() {
  
  dog = createSprite(250,300,15,20);
  dog.scale = 0.3;
  dog.addImage(dogImage);

  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value",readStock,writeStock); 

  createCanvas(500, 500);
  
}


function draw() {  

  background(46,139,87);
  
  text("Press the Up Arrow Key to Feed Drago !",250,350);
  
  if(keyWentDown(UP_ARROW)){
  dog.addImage(happyDog);
  }
  
  if(keyWentDown(DOWN_ARROW)){
   writeStock();
   dog = addImage("dogImg.png"); 
  }
  
 drawSprites();

}

function readStock(data){

foodS = data.val();

}

function writeStock(x){

if(x <= 0){
x = 0;   
}else{
x = x-1;
}

database.ref("/").update({
Food:x
})

}
