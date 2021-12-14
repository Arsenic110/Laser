//the timing variable.
let t = 0;

//drawingcontroller is used to manage the list of things needed to be drawn with respect to t
let drawController;

//matrix colah
let col = new Color(0, 255, 65);


function setup() 
{
    createCanvas(1800, 800);

    drawController = new DrawingController();

    //drawController.addLine(50, 150, 1000, 100, col, 0.5);
    //drawController.addLine(1000, 100, 500, 700, col, 0.5);
    //drawController.addLine(500, 700, 300, 300, col, 0.5);

    //scaling sheet
     drawController.rect(110, 110, 50, 50, col, 0.1);
     drawController.rect(110, 110, 50*2, 50*2, col, 0.1);
     drawController.rect(110, 110, 50*4, 50*4, col, 0.1);
     drawController.rect(110, 110, 50*8, 50*8, col, 0.1);
     drawController.rect(110, 110, 50*10, 50*10, col, 0.1);
     drawController.rect(110, 110, 50*10, 50*26, col, 0.1);

    drawController.ellipse(900, 400, 1600, 700, col, 5);

}
  
function draw() 
{
    //manual ticker (cuz im dumb)
    tick();


    noFill();
    //ellipse(100, 200, 200, 100);
    //arc(800, 200, 100, 300, -1.57, 4.71);

}

function tick()
{
    //pause execution
    if(keyCode === 32)    
        return;


    //clear buffer
    background(10);

    //timer
    textSize(32);
    fill(255, 255, 255);
    text(Math.round(t), 10, 30);
    t += 0.02;

    //laser drawing
    drawController.draw(t);
}