class Line
{
    constructor(x1, y1, x2, y2, color, lim)
    {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.color = color;
        this.drawing = false;
        this.finished = false;
        this.lim = lim;
    }

    restart()
    {
        this.drawing = false;
        this.finished = false;
    }

    draw(t)
    {
        if(this.finished)
            this.drawFull();
        else if(!this.drawing)
            this.drawInit(t);
        else
            this.drawLogic(t);
    }

    drawInit(t)
    {
        this.tInit = t;
        this.drawing = true;

        this.generatedX = 0;
        this.generatedY = 0;

        this.drawLogic(t);


    }

    drawLogic(t)
    {
        //debug circles
        if(false)
        {
            circle(this.x1, this.y1, 3);
            circle(this.x2, this.y2, 3);
        }

        let m = t - this.tInit;
        let n = this.lim;
        n -= m;
    
        //little bit of logic bounding
        if(n < 0)
        {
            n = 0;
            this.finished = true;
            return;
        }

        this.generatedX = ((m * this.x2) + (n * this.x1)) / (m + n);
        this.generatedY = ((m * this.y2) + (n * this.y1)) / (m + n);

        stroke(this.color.r, this.color.g, this.color.b);
        circle(this.generatedX, this.generatedY, 5);
        line(this.x1, this.y1, this.generatedX, this.generatedY);

    }

    drawFull()
    {
        stroke(this.color.r, this.color.g, this.color.b);
        line(this.x1, this.y1, this.x2, this.y2);
    }
}

class Ellipse
{
    constructor(x, y, w, h, color, lim)
    {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.color = color;
        this.drawing = false;
        this.finished = false;
        this.lim = lim;
    }

    restart()
    {
        this.drawing = false;
        this.finished = false;
    }

    draw(t)
    {
        if(this.finished)
            this.drawFull();
        else if(!this.drawing)
            this.drawInit(t);
        else
            this.drawLogic(t);
    }

    drawInit(t)
    {
        this.tInit = t;
        this.drawing = true;

        this.theta = 0;

        //this.drawLogic(t);
    }

    drawLogic(t)
    {
        //our two bounds: tInit, tInit + lim

        //formula for converting t from scale a -> b to x -> y is:
        //assuming x < y and a < b

        //n = (y - x) * (t / (b - a))

        let a = this.tInit;
        let b = this.tInit + this.lim;

        a -= b;
    
        //little bit of logic bounding (?)
        if(true)
        if(this.theta > 4.71)
        {   
            this.finished = true;
            return;
        }

        this.theta = (4.71 + 1.57) * (t / (b - a))

        stroke(this.color.r, this.color.g, this.color.b);
        //line(this.x1, this.y1, this.generatedX, this.generatedY);
        noFill();

        arc(this.x, this.y, this.w, this.h, -1.57, this.theta);

        fill(255, 255, 255);
        text(this.theta, 60, 30);
        console.log(this.theta)
    }

    drawFull()
    {
        stroke(this.color.r, this.color.g, this.color.b);
        noFill();
        ellipse(this.x, this.y, this.w, this.h);
    }
}

class DrawingController
{
    constructor()
    {
        this.roster = [];
    }

    line(x1, y1, x2, y2, color, lim)
    {
        this.roster.push(new Line(x1, y1, x2, y2, color, lim));
    }

    rect(x1, y1, l, w, color, lim)
    {
        this.roster.push(new Line(x1, y1, x1 + w, y1, color, lim));
        this.roster.push(new Line(x1 + w, y1, x1 + w, y1 + l, color, lim));
        this.roster.push(new Line(x1 + w, y1 + l, x1, y1 + l, color, lim));
        this.roster.push(new Line(x1, y1 + l, x1, y1, color, lim));
    }

    ellipse(x, y, w, h, color, lim)
    {
        this.roster.push(new Ellipse(x, y, w, h, color, lim));
    }

    draw(t)
    {
        for(var i = 0; i < this.roster.length; i++)
        {
            this.roster[i].draw(t);

            if(!this.roster[i].finished)
                break;
        }
    }

}