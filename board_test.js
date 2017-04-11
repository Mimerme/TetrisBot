const robot = require("robotjs");

while(true){
    const mouse = robot.getMousePos();

    console.log("Mouse @ x: " + mouse.x + " y: " + mouse.y);
}
