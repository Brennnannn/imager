let w = window.innerWidth
let h = window.innerHeight
let img

let action = 0
let click = false
let changes = [ 0, 0, 0, 0 ]
let start = [-1, -1]

let imgX = 0, imgY = 0, imgDX = 0, imgDY = 0

function preload() {
  img = loadImage('image3.jpg')
}


function setup() {
  canvas = createCanvas(w, h);
  if( img.width > 3 * w / 4 ) {
    imgX = w / 4
    imgDX = w / 2
  } else {
    imgX = w / 2 - img.width / 2
    imgDX = img.width
  }

  if( img.height > 3 * h / 4 ) {
    imgY = h / 4
    imgDY = h / 2
  } else {
    imgY = h / 2 - img.height / 2
    imgDY = img.height
  }

  if(img.width >= img.height && imgDX - imgX == width / 2) {    //Check width - it seems weird
    imgDY = img.height * (imgDX / img.width)
    imgY = h / 2 - imgDY / 2
  } else {
    imgDX = img.width * (imgDY / img.height)
    imgX = w / 2 - imgDX / 2
  }

  image(img, 
    imgX, imgY, imgDX, imgDY,
    0, 0, img.width, img.height, CONTAIN)
}

function draw() {
  clear()

  if(action == 1) {
    background(100, 0, 0)
  } if (action == 2) {
    background(0, 100, 0)
  } if (action == 3) {
    background(0, 0, 100)
  }
  image(img, 
    imgX + changes[0], 
    imgY + changes[1],
    imgDX + changes[2],
    imgDY + changes[3],
    0, 0, img.width, img.height, CONTAIN)

  {  
    cursor(ARROW)
     if(isClose(imgX + changes[0], imgY + changes[1], mouseX, mouseY)) {
      cursor('nwse-resize')
      action = 2
    } else if(isClose(imgX + imgDX, imgY, mouseX, mouseY)) {
      cursor('nesw-resize')
      action = 3
    } else if(isClose(imgX, imgY + imgDY, mouseX, mouseY)) {
      cursor('nesw-resize')
      action = 4
    } else if(isClose(imgX + imgDX, imgY + imgDY, mouseX, mouseY)) {
      cursor('nwse-resize')
      action = 5
    } else if(mouseX > imgX + changes[0]
      && mouseX < imgX + imgDX + changes[0]
      && mouseY > imgY + changes[1]
      && mouseY < imgY + imgDY + changes[1]) { 
      cursor('grab')
      action = 1
    }
  } //Cursor Shenanigans

  if(mouseX > imgX + changes[0] - 15 
    && mouseX < imgX + changes[0] + imgDX + changes[2] + 15 
    && mouseY > imgY + changes[1] - 15 
    && mouseY < imgY + changes[1] + imgDY + changes[3] + 15) {
    fill(22, 115, 166)
    noStroke()
    circle(imgX + changes[0], imgY + changes[1], 15)
    circle(imgX + imgDX + changes[0] + changes[2], imgY + changes[1], 15)
    circle(imgX + changes[0], imgY + imgDY + changes[1] + changes[3], 15)
    circle(imgX + imgDX + changes[0] + changes[2], imgY + imgDY + changes[1] + changes[3], 15)
  } //Border circles

  if(click) {
    switch (action) {
      case 1:                   //Moving image
        cursor('grabbing')
          changes[0] = mouseX - start[0]
          changes[1] = mouseY - start[1]
        break;
      case 2:                   //Upper left resize
        if(abs(start[0] - mouseX) >= abs(start[1] - mouseY)) {
          changes[0] = mouseX - start[0]
          changes[1] = changes[0] * (imgDY / imgDX)
          changes[2] = -changes[0]
          changes[3] = -changes[1]
        } else {
          changes[1] = mouseY - start[1]
          changes[0] = changes[1] * (imgDX / imgDY)
          changes[3] = -changes[1]
          changes[2] = -changes[0]
        }
        break;
      case 3:                   //Upper right resize
        if(abs(start[0] - mouseX) >= abs(start[1] - mouseY)) {
          changes[2] = mouseX - start[0]
          changes[3] = changes[2] * (imgDY / imgDX)
          changes[1] = -changes[3]
        } else {
          changes[3] = mouseY - start[1]
          changes[2] = changes[3] * (imgDX / imgDY)
          changes[1] = -changes[3]
        }
        break;
    }
        
        
  }

}

function mousePressed() { 
  click = true
  start = [mouseX, mouseY]
}
function mouseReleased() { 
  click = false 
  start = [-1, -1]
  imgX += changes[0]
  imgY += changes[1]
  imgDX += changes[2]
  imgDY += changes[3]
  changes = [ 0, 0, 0, 0 ]
  action = 0
}

function isClose(originX, originY, mouseX, mouseY) {
  return sqrt(sq(originX - mouseX) + sq(originY - mouseY)) < 20
}

window.onresize = function() {

  w = window.innerWidth
  h = window.innerHeight
  resizeCanvas(w,h)
}
