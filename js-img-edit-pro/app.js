var scale = 1;
var angle=0;

interact('#gestureArea').gesturable({
  onmove: function(event) {
    angle += event.da;
    scale = scale * (1+event.ds);
    
    if (scale > 2) { scale = 2; }
    if (scale < 0.5) { scale = 0.5; }

    $('#draggable').css({'transform':'scale(' + scale + ') rotate('+ angle + 'deg)'});
    
    document.getElementById("scale").innerHTML = scale;
    document.getElementById("angle").innerHTML = angle;
    
    dragMoveListener(event);
  }
}).draggable({ onmove: dragMoveListener });

function dragMoveListener(event) {

  var target = $(event.target);

  // keep the dragged position in the data-x/data-y attributes
  x = (parseFloat(target.attr('data-x')) || 0) + event.dx;
  y = (parseFloat(target.attr('data-y')) || 0) + event.dy;

  // translate the element
  target.css({'transform':'translate(' + x + 'px, ' + y + 'px)'});

  // update the posiion attributes
  target.attr('data-x', x);
  target.attr('data-y', y);
  
  document.getElementById("x").innerHTML = x;
  document.getElementById("y").innerHTML = y;
}

// this is used later in the resizing and gesture demos
// window.dragMoveListener = dragMoveListener;

var btn = document.getElementById("btn"); 
var node = document.getElementById("container");
btn.onclick = function() {
  alert("onclick!");
  domtoimage.toSvg(node, {quality:1})
    .then(function (dataUrl) {
    var img = new Image();
    img.src = dataUrl;
    //document.getElementById("btn-con").append(img);
    var canvas = document.createElement('canvas'); 
    canvas.width = document.getElementById('container').offsetWidth;
    canvas.height = document.getElementById('container').offsetHeight;
    var context = canvas.getContext('2d');
    context.drawImage(img, 0, 0);
    //alert(canvas.toDataURL('image/png'));
     $("#btn-con").append('<img src="'+canvas.toDataURL('image/png')+'"/>');
    
  })
    .catch(function (error) {
    alert('oops, domtoimage.js error!'+ error);
  });
}