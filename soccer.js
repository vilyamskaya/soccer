'use strict'

document.onmousedown = function (event) {
    event.preventDefault();
    document.ondragstart = () => false;

    let draggableElem = event.target.closest('.draggable');
    if(!draggableElem) return;
    if(event.which !== 1) return;

    let shiftX = event.clientX - draggableElem.getBoundingClientRect().left;
    let shiftY = event.clientY - draggableElem.getBoundingClientRect().top;

    draggableElem.style.position = 'fixed';
    draggableElem.style.left = event.clientX - shiftX + 'px';
    draggableElem.style.top = event.clientY - shiftY + 'px';

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {

        let left = event.clientX - shiftX;
        let top = event.clientY - shiftY;
        let bottom = document.documentElement.clientHeight - draggableElem.offsetHeight;
        let right = document.documentElement.clientWidth - draggableElem.offsetWidth;

        if(left < 0) {
            left = Math.max(left, 0);
            window.scrollBy(-5, 0);
        }

        if(left > right) {
            left = Math.min(left, right);
            window.scrollBy(5, 0);
        }

        if(top < 0) {
            top = Math.max(top, 0);
            window.scrollBy(0, -5);
        }

        if(top > bottom) {
            top = Math.min(top, bottom);
            window.scrollBy(0, 5);
        }


        draggableElem.style.left = left + 'px';
        draggableElem.style.top = top + 'px';
    }

    function onMouseUp() {
        draggableElem.style.position = 'absolute';
        draggableElem.style.left = parseInt(draggableElem.style.left)+ pageXOffset + 'px';
        draggableElem.style.top = parseInt(draggableElem.style.top)+ pageYOffset + 'px';

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
}

