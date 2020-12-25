var database;
var dog,dogImg,happydogImg;
var foodS,foodStock;

function preload()
{
  dogImg = loadImage("images/dog.png");
  happydogImg = loadImage("images/dog2.png");
}

function setup() {
  createCanvas(1200, 500);
  
  database = firebase.database();

  dog = createSprite(350,350,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.3;

  food = new Food();
  food.getfoodStock();
  food.display();

  console.log("What is the error")

  feedButton = createButton("Feed Milk");
  feedButton.position(200,200);

  addButton = createButton("Add Milk");
  addButton.position(200,220);

}


function draw() {  
  background(rgb(46,139,87))

  drawSprites();

  stroke("black");
  text("Press Up Arrow To Feed Drago Milk!",150,100);
  
  fill(255,255,254);
  textSize(15);
  if(lastFed >= 12){
    text("Last Feed : " + lastFed % 12 + "PM",350,30);
  }else if(lastFed == 0){
    text("Last Feed : " + lastFed + "AM",350,30);
  }

  feedDog();
  addFoods();
}

function feedDog(){
  dog.addImage(happydogImg);

  food.updateFoodStock(food.getFoodStock()-1);
  database.ref('/').update({
    Food:food.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}