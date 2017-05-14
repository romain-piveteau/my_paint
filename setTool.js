var paint = {

    painting: false, start: false, ctxCoords: [], click: 1,
    tools: {
        Pen: true, CircleEmpty: false, CirclePlain: false, RectEmpty: false, RectPlain: false, Gomme: false, Line: false
    },

    getPos: function(e) { return ({x: e.clientX - ( window.innerWidth - 800 ) / 2, y: e.clientY}); },
    getSize: function () { return document.getElementById('utils-btn-size').value; },
    getLineColor: function () { return document.getElementById('utils-btn-color-1').value; },
    getPlainColor: function () { return document.getElementById('utils-btn-color-2').value; },
    getActiveTool: function () { let i = 0; while ( !this.tools[Object.keys(this.tools)[i]] )i++; return Object.keys(this.tools)[i]; },
    getStartCoords: function() { return ({x: paint.ctxCoords[paint.ctxCoords.length - 2].x, y: paint.ctxCoords[paint.ctxCoords.length - 2].y}); },
    
    setTool: function (e) {
        document.getElementsByClassName('utils-tools active')[0].className = 'utils-tools';
        paint.click = 0;
        eval('paint.tools.' + paint.getActiveTool() + ' = false' );
        eval('paint.tools.' + e.target.id.split(':')[1] + ' = true' );
        this.className = 'utils-tools active';
    },

    startPainting: function(e) {
        paint.painting = true;
        paint.ctx.beginPath();
        paint.ctx.lineWidth = paint.getSize();
        paint.ctx.strokeStyle = paint.getLineColor();
        paint.ctx.fillStyle = paint.getPlainColor();
        if (paint.getActiveTool().substring(0, 6) !== 'Circle') paint.ctx.moveTo(paint.getPos(e).x, paint.getPos(e).y);
        paint.draw(e);
    },

    endPainting: function(e) { paint.ctx.stroke(); paint.ctx.closePath(); paint.painting = false; },
    cancelPainting: function(e) {
        return paint.painting = false
    },

    draw: function (e) { if (!paint.painting) return false;
        paint.ctxCoords.push({ x: paint.getPos(e).x, y: paint.getPos(e).y, size: paint.getSize() });
        paint.click++;
        eval('paint.drawWith' + paint.getActiveTool() + '(e)');
    },

    drawWithPen: function (e) { paint.ctx.lineTo(paint.getPos(e).x, paint.getPos(e).y); paint.ctx.lineCap = paint.ctx.lineJoin = 'round'; paint.ctx.stroke(); },
    drawWithGomme: function (e) { paint.ctx.clearRect( (paint.getPos(e).x - ( paint.getSize() / 2)), ( paint.getPos(e).y - ( paint.getSize() / 2) ), paint.getSize(), paint.getSize()); },
    drawWithRectPlain: function (e) { paint.drawWithRectEmpty(e, true); },
    drawWithCirclePlain: function (e) { paint.drawWithCircleEmpty(e, true); },

    drawWithCircleEmpty: function (e, plain = false) {
        if ( paint.click > 1 ) {

            var radius = Math.sqrt(Math.pow((paint.getPos(e).x - paint.getStartCoords().x), 2) + Math.pow((paint.getPos(e).y - paint.getStartCoords().y), 2));
            var startX = ( paint.getStartCoords().x > paint.getPos(e).x ) ? paint.getStartCoords().x - radius /2 : paint.getStartCoords().x + radius /2;
            var startY = ( paint.getStartCoords().y > paint.getPos(e).y ) ? paint.getStartCoords().y - radius /2 : paint.getStartCoords().y + radius /2;

            paint.ctx.arc(startX, startY, radius /2, 0, 2 * Math.PI);
            if (plain) paint.ctx.fill();
            paint.click = 0;
        }
    },

    drawWithRectEmpty: function (e, plain = false) {
        if ( paint.click > 1 ) {
            paint.ctx.strokeRect(paint.getStartCoords().x, paint.getStartCoords().y, paint.getPos(e).x - paint.getStartCoords().x, paint.getPos(e).y - paint.getStartCoords().y);
            if (plain) paint.ctx.fillRect(paint.getStartCoords().x, paint.getStartCoords().y, paint.getPos(e).x - paint.getStartCoords().x, paint.getPos(e).y - paint.getStartCoords().y);
            paint.click = 0;
            paint.endPainting();
        }
    },

    drawWithLine: function (e) { 
        if ( paint.click > 1 ) {
            paint.ctx.lineTo(paint.getStartCoords().x, paint.getStartCoords().y);
            paint.click = 0;
            paint.ctx.lineCap = paint.ctx.lineJoin = 'round';
            paint.endPainting();
        }
    },

    saveImage: function(){
        var img = document.createElement('img');
            img.src = paint.canvas.toDataURL('base64');
        window.location.href = img.src.replace('image/png', 'image/octet-stream');
     }
};

function f(){
    
    var toolBtns = document.getElementsByClassName('utils-tools');
    paint.canvas = document.getElementById('my-paint');
    paint.ctx = document.getElementById('my-paint').getContext('2d');

    document.getElementById('my-paint').addEventListener('mousedown', paint.startPainting);
    document.getElementById('my-paint').addEventListener('mousemove', paint.draw);
    document.getElementById('my-paint').addEventListener('mouseup', paint.endPainting);
    document.getElementById('my-paint').addEventListener('mouseleave', paint.cancelPainting);
    document.getElementById('utils-btn-save').addEventListener('click', paint.saveImage);

    for (var i = 0; i < toolBtns.length; i ++) { toolBtns[i].addEventListener('click', paint.setTool); }
};
window.addEventListener('load', f);