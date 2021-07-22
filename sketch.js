var dog,sadDog,happyDog;
var foodObj;
var foodStock;
var FedTime,lastFed,feed,addFood;
var readPosition,showError;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database = firebase.database()
  createCanvas(1000,400);

 foodObj=new Food();
  
 foodStock=database.ref('Food');
 foodStock.on("value",readPosition,showError);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}

function draw() {
  background(46,139,87);
  drawSprites();
}
function readPosition(data){
  position = data.val();
  food.x = position.x;
  food.y = position.y;
}
function ShowError(){
  console.log("ERROR")
}
//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
  Food:foodS
  })
 }

//function to update food stock.
function feedDog(){
  dog.addImage(happyDog);
  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()=1);
  }
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}