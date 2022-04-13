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

    drawController.tri(createVector(300, 300), createVector(440, 310), createVector(490, 200), col, 2);
    //presentation(t);

    drawController.ellipse(900, 400, 150*2, 77*9, col, 5);


}

function presentation()
{
    let r = 20;
    drawController.rect(r, r, r*1, r*1, col, 0.1);
    drawController.rect(r, r, r*2, r*2, col, 0.1);
    drawController.rect(r, r, r*4, r*4, col, 0.1);
    drawController.rect(r, r, r*8, r*8, col, 0.1);
    drawController.rect(r, r, r*10, r*10, col, 0.1);
    drawController.rect(r, r, r*10, r*26, col, 0.1);

    drawController.ellipse(900, 400, 150*0, 77*9, col, 0.5);

    drawController.ellipse(900, 400, 150*1, 77*9, col, 0.5);
    drawController.ellipse(900, 400, 150*2, 77*9, col, 0.5);
    drawController.ellipse(900, 400, 150*3, 77*9, col, 0.5);
    drawController.ellipse(900, 400, 150*4, 77*9, col, 0.5);
    drawController.ellipse(900, 400, 150*5, 77*9, col, 0.5);
    drawController.ellipse(900, 400, 150*6, 77*9, col, 0.5);
    drawController.ellipse(900, 400, 150*7, 77*9, col, 0.5);
    drawController.ellipse(900, 400, 150*8, 77*9, col, 0.5);
    drawController.ellipse(900, 400, 150*9, 77*9, col, 0.5);

    drawController.ellipse(900, 400, 150*9, 77*0, col, 0.5);

    drawController.ellipse(900, 400, 150*9, 77*1, col, 0.5);
    drawController.ellipse(900, 400, 150*9, 77*2, col, 0.5);
    drawController.ellipse(900, 400, 150*9, 77*3, col, 0.5);
    drawController.ellipse(900, 400, 150*9, 77*4, col, 0.5);
    drawController.ellipse(900, 400, 150*9, 77*5, col, 0.5);
    drawController.ellipse(900, 400, 150*9, 77*6, col, 0.5);
    drawController.ellipse(900, 400, 150*9, 77*7, col, 0.5);
    drawController.ellipse(900, 400, 150*9, 77*8, col, 0.5);
    drawController.ellipse(900, 400, 150*9, 77*9, col, 0.5);

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