/**
 * Created by Romain on 11/05/2017.
 */
function f () {

    var windowWidth = parseInt(window.innerWidth);
    var body = document.getElementsByTagName('body')[0];
        body.style.width = windowWidth + 'px';

    function initDomUtils(domEl, domAttr, domParent) {
        domAttr.forEach(function (el, index) { domEl.setAttribute(el[0], el[1]); });
        domParent.appendChild(domEl);
    }

    function initDomCanvas(e) {
        initDomUtils(document.createElement('canvas'),
            [
                ['id', 'my-paint'],
                ['width', '800'],
                ['height', '600'],
                ['style', 'border: 1px solid black; ' +
                '           display: block; ' +
                '           margin-left: ' + ( windowWidth - 800)  / 2 + 'px' ]
            ], body);
    }

    function initDomBottomDiv() {
        initDomUtils(document.createElement('div'),
            [
                ['id', 'utils-bottom'],
                ['style', 'border: 1px solid black; ' +
                '           height: 50px; ' +
                '           width: 800px; ' +
                '           margin-left: ' + ( windowWidth - 800)  / 2 + 'px' ]
            ], body);
    }

    function initDomToolsBtn() {

        var domBtnStyle = ['style', 'border: 1px solid black; height: 20px;'];
        var domUtilsBtnSettings = [
            [['id', 'utils-btn-pen:Pen'], ['class', 'utils-tools'], ['value', 'Pen'], ['type', 'button'], domBtnStyle],
            [['id', 'utils-btn-rectacngle-empty:RectEmpty'], ['class', 'utils-tools'], ['value', 'Rect Vide'], ['type', 'button'], domBtnStyle],
            [['id', 'utils-btn-rectangle-plain:RectPlain'], ['class', 'utils-tools'], ['value', 'Rect Plein'], ['type', 'button'], domBtnStyle],
            [['id', 'utils-btn-circle-empty:CircleEmpty'], ['class', 'utils-tools'], ['value', 'Circle Vide'], ['type', 'button'], domBtnStyle],
            [['id', 'utils-btn-circle-plain:CirclePlain'], ['class', 'utils-tools'], ['value', 'Circle Plein'], ['type', 'button'], domBtnStyle],
            [['id', 'utils-btn-gomme:Gomme'], ['class', 'utils-tools'], ['value', 'Gomme'], ['type', 'button'], domBtnStyle],
            [['id', 'utils-btn-line:Line'], ['class', 'utils-tools'], ['value', 'Ligne'], ['type', 'button'], domBtnStyle],
            [['id', 'utils-btn-color-1'], ['class', 'utils-settings'], ['type', 'color'], domBtnStyle],
            [['id', 'utils-btn-color-2'], ['class', 'utils-settings'], ['type', 'color'], domBtnStyle],
            [['id', 'utils-btn-save'], ['class', 'utils-save'], ['type', 'button'], ['value', 'Save'], domBtnStyle],
            [['id', 'utils-btn-size'], ['class', 'utils-settings'], ['type', 'number'],['min', '1'], ['value', '10'], domBtnStyle],
        ];

        domUtilsBtnSettings.forEach(function (el) {
            initDomUtils(document.createElement('input'), el, document.getElementById('utils-bottom'));
        });
    }

    initDomCanvas();
    initDomBottomDiv();
    initDomToolsBtn();
}

function resizeWindow() {
    var body = document.getElementsByTagName('body')[0];
    var canvas = document.getElementById('my-paint');
    var domBottomUtils = document.getElementById('utils-bottom')
    windowWidth = parseInt(window.innerWidth);
    domBottomUtils.style.marginLeft = canvas.style.marginLeft = ( windowWidth - 800)  / 2 + 'px';
    body.setAttribute('width', windowWidth);
}

window.addEventListener('load', f);
window.addEventListener('resize', resizeWindow);