// setting up canvas:
const canvas = $("#canvas")[0];
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const ctx = canvas.getContext("2d");

const canvas2 = $("#bg")[0];
const ctx2 = canvas2.getContext("2d");

canvas.width = screenWidth;
canvas.height = screenHeight;

canvas2.width = screenWidth;
canvas2.height = screenHeight;

//setting up global variables
const population = 800;
let neighbourDistance = 100;
var energyBalls = [];
var nodes = [];
var fakeNodes = [];