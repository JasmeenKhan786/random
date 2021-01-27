const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Mouse = Matter.Mouse

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;
var index;
var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;
var birdarr=[];
var mouse,canvas
function preload() {
    backgroundImg=loadImage("sprites/bg.png")
    getBackgroundImg();
   
}

function setup(){
     canvas = createCanvas(1200,400);
    canvas.position(20,70);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/8);
    log5 = new Log(870,120,150, -PI/8);

    bird = new Bird(200,50);
    bird2=new Bird(150,170);
    bird3= new Bird(100,170);
    bird4 = new Bird(50,170);

   birdarr.push(bird4);
    birdarr.push(bird3);
    birdarr.push(bird2);
    birdarr.push(bird);
    index=birdarr.length-1;
    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
    /* mouse = Mouse.create(canvas.elt);
    const options={
        mouse:mouse
    }
    mConstraint = Matter.MouseConstraint.create(engine,options);
    World.add(world,mConstraint);*/
}

function draw(){
    
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    bird2.display();
    bird3.display();
    bird4.display();
    platform.display();
    //log6.display();
    slingshot.display();    
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(birdarr[index].body, {x: mouseX , y: mouseY});
      //  Matter.Body.applyForce(birdarr[birdarr.length-1].body,birdarr[birdarr.length-1].position,{x:5,y:-5});
        //return false;
    }
}


function mouseReleased(){
    setTimeout(()=>{
        slingshot.fly();
    },100);
    
    birdarr.pop();
    index--;
    log1.body.friction=0.5;
    log4.body.friction=0.5
    log5.body.friction=0.5
    log3.body.friction=0.5
    box1.body.friction=0.5;
    box2.body.friction=0.5;
    box3.body.friction=0.5;
    box4.body.friction=0.5;
    box5.body.friction=0.5;
    gameState = "launched";
    //return false;
}

function keyPressed(){
    if(keyCode === 32 && gameState === "launched"){
        if(birdarr.length>=0){
        Matter.Body.setPosition(birdarr[index].body,{x:200,y:50})
        slingshot.attach(birdarr[index].body);
        gameState="onSling";
        }
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=06 && hour<=19){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}
