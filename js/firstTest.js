/**
 * Created by Romain on 10/05/2017.
 */

window.onload = function () {

    var size = prompt('size');
    var md = false;
    var posX = posY = undefined;

    var canvas = document.getElementById('my-paint');
        canvas.setAttribute('width', '800');
        canvas.setAttribute('height', '600');
        canvas.style.border = '1px solid black';

    var ctx = canvas.getContext('2d');

    canvas.addEventListener('mousedown', function (e) {
        md = true;
        ctx.beginPath();
        ctx.lineWidth = size;
        ctx.moveTo(e.clientX - resizeWindow(), e.clientY);
    });
    canvas.addEventListener('mouseup', function (e) {
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        md = false;
    });

    canvas.addEventListener('mousemove', function (e) {

        if (md) {
            ctx.lineTo(e.clientX, e.clientY);
            ctx.stroke();
        }
    });
}