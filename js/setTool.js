/**
 * Created by Romain on 11/05/2017.
 */
var paint = {

    painting: false, start: false, ctxCoords: [],

    tools: {
        Pen: true, CircleEmpty: false, CirclePlain: false, RectEmpty: false, RectPlain: false, Gomme: false, Line: false
    },

    getPos: function(e) { return ({x: e.clientX - ( window.innerWidth - 800 ) / 2, y: e.clientY}); },
    getSize: function () { return document.getElementById('utils-btn-size').value; },
    getLineColor: function () { return document.getElementById('utils-btn-color-1').value; },
    getPlainColor: function () { return document.getElementById('utils-btn-color-2').value; },
    getActiveTool: function () { let i = 0; while ( !this.tools[Object.keys(this.tools)[i]] )i++; return Object.keys(this.tools)[i]; },

    setTool: function (e) {
        eval('paint.tools.' + paint.getActiveTool() + ' = false' );
        eval('paint.tools.' + e.target.id.split(':')[1] + ' = true' );
    },

    startPainting: function(e) {
        paint.painting = true;
        paint.ctx.beginPath();
        paint.ctx.lineWidth = paint.getSize();
        paint.ctx.strokeStyle = paint.getLineColor();
        paint.ctx.fillStyle = paint.getPlainColor();
        paint.ctx.moveTo(paint.getPos(e).x, paint.getPos(e).y);
        paint.draw(e);
    },

    endPainting: function(e) {
        paint.painting = false;
    },

    cancelPainting: function(e) {
        return paint.painting = false
    },

    draw: function (e) { if (!paint.painting) return false;

        paint.ctxCoords.push({ x: paint.getPos(e).x, y: paint.getPos(e).y, size: paint.getSize() });

        eval('paint.drawWith' + paint.getActiveTool() + '(e)');
        if ( paint.getActiveTool() === 'Pen') paint.ctx.stroke();

    },

    drawWithPen: function (e) { paint.ctx.lineTo(paint.getPos(e).x, paint.getPos(e).y); },

    drawWithCircleEmpty: function () {
        console.log(this.getActiveTool())
    },

    drawWithCirclePlain: function () {
        console.log(this.getActiveTool())
    },

    drawWithRectEmpty: function () {
        console.log(this.getActiveTool())
    },

    drawWithRectPlain: function () {
        console.log(this.getActiveTool())
    },

    drawWithGomme: function (e) { paint.ctx.clearRect( (paint.getPos(e).x - ( paint.getSize() / 2)), ( paint.getPos(e).y - ( paint.getSize() / 2) ), paint.getSize(), paint.getSize()); },

    drawWithLine: function (e) { paint.ctx.lineTo(paint.getPos(e).x, paint.getPos(e).y); }
};



function f(){

    var toolBtns = document.getElementsByClassName('utils-tools');
    paint.canvas = document.getElementById('my-paint');
    paint.ctx = document.getElementById('my-paint').getContext('2d');

    document.getElementById('my-paint').addEventListener('mousedown', paint.startPainting);
    document.getElementById('my-paint').addEventListener('mousemove', paint.draw);
    document.getElementById('my-paint').addEventListener('mouseup', paint.endPainting);
    document.getElementById('my-paint').addEventListener('mouseleave', paint.cancelPainting);

    for (var i = 0; i < toolBtns.length; i ++) { toolBtns[i].addEventListener('click', paint.setTool); }
};

window.addEventListener('load', f);