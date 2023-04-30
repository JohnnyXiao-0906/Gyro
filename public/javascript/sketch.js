

// Create connection to Node.JS Server
const socket = io();

let canvas;
let roll = 0;
let pitch = 0;
let yaw = 0;

let r = 150;
let g = 0;
let b = 150;

let size = 30;
function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
 
  createEasyCam();
 
}

function draw() {
  background(0);

  noStroke();
  lights();
  ambientMaterial(r, g, b);

  translate(-240, -100, 0);
  normalMaterial();
  push();
  rotateZ(pitch);
  rotateX(roll);
  rotateY(yaw);
  torus(size, size/5);
  pop();

  translate(240, 0, 0);
  normalMaterial();
  push();
  rotateZ(pitch);
  rotateX(roll);
  rotateY(yaw);
  torus(size, size/5);
  pop();
  
  translate(240, 0, 0);
  normalMaterial();
  push();
  rotateZ(pitch);
  rotateX(roll);
  rotateY(yaw);
  torus(size, size/5);
  pop();

  translate(-240 * 2, 200, 0);
  normalMaterial();
  push();
  rotateZ(pitch);
  rotateX(roll);
  rotateY(yaw);
  torus(size, size/5);
  pop();

  translate(240, 0, 0);
  normalMaterial();
  push();
  rotateZ(pitch);
  rotateX(roll);
  rotateY(yaw);
  torus(size, size/5);
  pop();

  translate(240, 0, 0);
  normalMaterial();
  push();
  rotateZ(pitch);
  rotateX(roll);
  rotateY(yaw);
  torus(size, size/5);
  pop();

}

//process the incoming OSC message and use them for our sketch
function unpackOSC(message){

  /*-------------

  This sketch is set up to work with the gryosc app on the apple store.
  Use either the gyro OR the rrate to see the two different behaviors
  TASK: 
  Change the gyro address to whatever OSC app you are using to send data via OSC
  ---------------*/

  //maps phone rotation directly 
  // if(message.address == "/gyrosc/gyro"){
  //   roll = message.args[0]; 
  //   pitch = message.args[1];
  //   yaw = message.args[2];
  // }

  //uses the rotation rate to keep rotating in a certain direction
  if(message.address == "/gyrosc/rrate"){
    roll += map(message.args[0],-3,3,-0.1,0.1);
    pitch += map(message.args[1],-3,3,-0.1,0.1);
    yaw += map(message.args[2],-3,3,-0.1,0.1);

    r += map(message.args[0],-3,3,-100,100);
    //g += map(message.args[0],-3,3, 0, 255);
    b += map(message.args[0],-3,3,-20,80);

    size += map(message.args[0],-3,3,-30,30);
  }
}

//Events we are listening for
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Connect to Node.JS Server
socket.on("connect", () => {
  console.log(socket.id);
});

// Callback function on the event we disconnect
socket.on("disconnect", () => {
  console.log(socket.id);
});

// Callback function to recieve message from Node.JS
socket.on("message", (_message) => {

  console.log(_message);

  unpackOSC(_message);

});