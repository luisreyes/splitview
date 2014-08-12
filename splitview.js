var
// Main Container for containers 
  workSpace = document.getElementById('work-space'),
// Base grip element
  grip = document.createElement('div');
// Grip Clones 1 Vertical and 2 Horizontal for Left and Right
  vGrip = grip.cloneNode(),
  hGripL = grip.cloneNode(),
  hGripR = grip.cloneNode();

/** Setup Elements **/

  // Ids
  vGrip.id = 'vg';
  hGripL.id = 'hgl';
  hGripR.id = 'hgr';

  // Classes
  vGrip.className = 'vertical grip';
  hGripL.className = 'horizontal-left grip';
  hGripR.className = 'horizontal-right grip';

  // Add to the Main Container
  workSpace.appendChild(vGrip);
  workSpace.appendChild(hGripL);
  workSpace.appendChild(hGripR);


/** Mouse Events for size rendering **/

var
// Grip element being dragged  
  _do = null,
// 'v' for vertical or 'h' for hortizontal
  _dd = null,
// Globalize mouse screen offset
  _mo = null,
// Globalize mouse position offset
  _mp = null,
// Cache containers
  c0 = document.getElementById('container0'),
  c1 = document.getElementById('container1'),
  c2 = document.getElementById('container2'),
  c3 = document.getElementById('container3');

document.onmousemove = mouseMove;
document.onmouseup = mouseUp;


makeDraggable(vGrip);
makeDraggable(hGripR);
makeDraggable(hGripL);


function mouseCoords(e) {
  if (e.pageX || e.pageY) {
    return {
      x: e.pageX,
      y: e.pageY
    };
  }
  return {
    x: e.clientX + document.body.scrollLeft - document.body.clientLeft,
    y: e.clientY + document.body.scrollTop - document.body.clientTop
  };
}

function getMouseOffset(target, e) {
  e = e || window.event;
  var docPos = getPosition(target);
  _mp = mouseCoords(e);
  return {
    x: _mp.x - docPos.x,
    y: _mp.y - docPos.y
  };
}

function getPosition(e) {
  var left = 0;
  var top = 0;
  while (e.offsetParent) {
    left += e.offsetLeft;
    top += e.offsetTop;
    e = e.offsetParent;
  }
  left += e.offsetLeft;
  top += e.offsetTop;
  return {
    x: left,
    y: top
  };
}

function mouseMove(e) {
  e = e || window.event;
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

  _mp = mouseCoords(e);
  if (_do) {
    if (_dd === 'h') {
      _do.style.top = ((_mp.y-_mo.y) / h) * 100 +'%';
    }
    else {
      _do.style.left = ((_mp.x - _mo.x) / w) * 100 +'%';
    }
    redraw(_dd, _mp);
    return false;
  }
}

function mouseUp() { 
  _do = null;
}

function makeDraggable(element) {
  if (!element) return;
  element.onmousedown = function(e) {
    _do = this;
    _dd = this.className[0];
    _mo = getMouseOffset(this, e);
    return false;
  }
}

function redraw(dir, _mp) {
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  
  if (dir === 'h') {
    
    var heightTop = _mp.y - _mo.y + 'px',
        heightBottom = h - (_mp.y - _mo.y) + 'px';
    
    var percentageTop = ((_mp.y-_mo.y) / h) * 100 +'%',
        percentageBottom = (100 - ((_mp.y-_mo.y) / h) * 100) +'%';

    if (_do.id === 'hgl') {
    
      c0.style.height = percentageTop;
      c2.style.top = percentageTop;
      c2.style.height = percentageBottom;
    
    }else if (_do.id === 'hgr') {
    
      c1.style.height = percentageTop;
      c3.style.top = percentageTop;
      c3.style.height = percentageBottom;
    
    }

  }
  else {
    var widthLeft = _mp.x - _mo.x + 'px',
        widthRight = (w - (_mp.x - _mo.x)) + 'px';
    
    var percentageLeft = ((_mp.x - _mo.x) / w) * 100 +'%',
        percentageRight = (100 - ((_mp.x - _mo.x) / w) * 100) +'%';   
    
    c0.style.width = percentageLeft;
    c2.style.width = percentageLeft;
    hGripL.style.width = percentageLeft;
    hGripR.style.width = percentageRight;
    c1.style.width = percentageRight;
    c3.style.width = percentageRight;
  }
}