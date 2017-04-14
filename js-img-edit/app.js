var angle = 0;
var scale = 1;
var x = 0;
var y = 0;

interact('.draggable')
    .draggable({
            // enable inertial throwing
            inertia: true,
            // keep the element within the area of it's parent
            restrict: {
                restriction: "parent",
                endOnly: true,
                elementRect: {
                    top: 0,
                    left: 0,
                    bottom: 1,
                    right: 1
                }
            },
            // call this function on every dragmove event
            onmove: dragMoveListener,
            // call this function on every dragend event
            onend: function(event) {
                var textEl = event.target.querySelector('p');

                  textEl && (textEl.textContent =
                      'moved a distance of ' +
                      (Math.sqrt(event.dx * event.dx +
                          event.dy * event.dy) | 0) + 'px');
        }
    })
    .gesturable({
        onmove: gestureListener
    });

function dragMoveListener(event) {
var target = event.target;
// keep the dragged position in the data-x/data-y attributes
x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

// translate the element
target.style.webkitTransform =
    target.style.transform =
    'scale(' + scale + ') rotate(' + angle + 'deg) translate(' + x + 'px, ' + y + 'px)';

// update the posiion attributes
target.setAttribute('data-x', x);
target.setAttribute('data-y', y);

document.getElementById("x").innerHTML = x;
document.getElementById("y").innerHTML = y;
}

// this is used later in the resizing demo
// window.dragMoveListener = dragMoveListener;

function gestureListener(event) {
var target = event.target;
scale = scale * (1 + event.ds);
angle += event.da;

target.style.webkitTransform =
    target.style.transform =
    'scale(' + scale + ') rotate(' + angle + 'deg) translate(' + x + 'px, ' + y + 'px)';

document.getElementById("scale").innerHTML = scale;
document.getElementById("angle").innerHTML = angle;

}

var btn = document.getElementById("btn"); btn.onclick = function() {
alert("onclick!");
// sessionStorage.setItem('test-img', c.toDataURL("image/jpeg"));
html2canvas(document.getElementById("test"), {
    onrendered: function(canvas) {
        // theCanvas = canvas;
        canvas.setAttribute("class", "foo");
        document.body.appendChild(canvas);

        // // Convert and download as image
        // Canvas2Image.saveAsJPEG(canvas);
        // document.getElementById("test").append(canvas);
        // // Clean up
        // //document.body.removeChild(canvas);
    }
});
}
