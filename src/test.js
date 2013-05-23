console.log("Begin tests");

var w = new World(1);
w.pacman.setPosition(1, 2);
console.log(w.pacman.where());
w.pacman.setDirection(DIRECTION.UP);
w.pacman.move();
console.log(w.pacman.where());

console.log("End tests");
