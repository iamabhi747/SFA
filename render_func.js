function showGrid(len) {
  stroke(100,100,100);
  strokeWeight(1);
  for (var i = 1; i <= Math.floor(width/len); i++) {
    line(i*len,0,i*len,height);
  }
  for (var i = 1; i <= Math.floor(height/len); i++) {
    line(0,height-i*len,width,height-i*len);
  }
};


function showRod(l, w) {
  var x = l.pos.x;
  var y = height - l.pos.y;
  var sin = Math.sin(-l.a);
  var cos = Math.cos(-l.a)
  var len  = l.len/2
  var w2  = w/2
  stroke(0);
  fill(255)
  ellipse(x - len*cos, y - len*sin, w);
  ellipse(x + len*cos, y + len*sin, w);
  quad(
        x - len*cos - w2*sin, y - len*sin + w2*cos,
        x - len*cos + w2*sin, y - len*sin - w2*cos,
        x + len*cos + w2*sin, y + len*sin - w2*cos,
        x + len*cos - w2*sin, y + len*sin + w2*cos
    );
  fill(0,255,0);
  ellipse(x - len*cos, y - len*sin, w2);
  ellipse(x + len*cos, y + len*sin, w2);
};