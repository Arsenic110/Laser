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
            this.drawFull();
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
    constructor(x, y, w, h, color, lim, p)
    {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.color = color;
        this.drawing = false;
        this.finished = false;
        this.lim = lim;

        if(p)
            this.p = p;
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

        console.log("Init time: "+ t);
        this.drawing = true;

        this.theta = 0;

        this.drawLogic(t);
    }

    drawLogic(t)
    {
        let ll = 6.28;
        if(this.p)
        {
            ll = this.p.b * 6.28;

        }
        if(t >= this.lim + this.tInit || this.theta > ll)
        {   
            this.theta = ll;
            this.finished = true;
            this.drawFull();
            return;
        }



        this.theta = 6.28 * ((t - this.tInit) / this.lim);

        if(this.theta > ll)
            this.theta = ll;

        stroke(this.color.r, this.color.g, this.color.b);

        noFill();

        if(this.p)
        {
            if(this.theta >= this.p.a * 6.28)
                arc(this.x, this.y, this.w, this.h, this.p.a * 6.28, this.theta);
        }
        else
            arc(this.x, this.y, this.w, this.h, 0, this.theta);

        //var bruh = this.getPoint(this.x, this.y, this.r)

        //circle(this.x + this.w / 2, this.y, 15);

        fill(255, 255, 255);
        //console.log(this.theta)
    }

    getPoint(x, y, r, rad)
    {
        return createVector(x + Math.cos(rad) * r, y + Math.sin(rad) *r);
    }

    drawFull()
    {

        stroke(this.color.r, this.color.g, this.color.b);
        noFill();
        //we are only drawing the arc
        if(this.p)
        {
            arc(this.x, this.y, this.w, this.h, this.p.a * 6.28, this.p.b * 6.28);
            return;
        }
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
        this.roster.push(new Line(x1, y1, x1 + w, y1, color, lim / 4));
        this.roster.push(new Line(x1 + w, y1, x1 + w, y1 + l, color, lim / 4));
        this.roster.push(new Line(x1 + w, y1 + l, x1, y1 + l, color, lim / 4));
        this.roster.push(new Line(x1, y1 + l, x1, y1, color, lim / 4));
    }

    tri(v1, v2, v3, color, lim)
    {
        this.roster.push(new Line(v1.x, v1.y, v2.x, v2.y, color, lim / 3));
        this.roster.push(new Line(v2.x, v2.y, v3.x, v3.y, color, lim / 3));
        this.roster.push(new Line(v3.x, v3.y, v1.x, v1.y, color, lim / 3));
    }

    ellipse(x, y, w, h, color, lim)
    {
        this.roster.push(new Ellipse(x, y, w, h, color, lim));
    }

    curve(x, y, w, h, p, color, lim)
    {
        this.roster.push(new Ellipse(x, y, w, h, color, lim * p.b, p));
    }

    wave(x, y, w, h, p, i, s, color, lim)
    {
        for(let j  = 0; j < i; j++)
        {
            this.roster.push(new Ellipse(x, y, w + (j * s), h + (j * s), color, lim * p.b, p));
        }

    }

    draw(t)
    {
        for(var i = 0; i < this.roster.length; i++)
        {
            if(this.roster[i].finished == false)
            {
                this.roster[i].draw(t);
                return;
            }
            else
                this.roster[i].draw(t);
        }
    }

}