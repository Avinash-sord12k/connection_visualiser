// creating node function:
class Node {
    constructor(x, y) {
        this.pos = new Vector(x, y);
        this.size = nodeSize;
        this.neighbours = [];
        this.color = [20, 20, 20];
        this.avtivatedColor = [200, 0, 0];
        this.activated = 0;
    }

    connect(otherNode) {
        ctx2.beginPath();
        ctx2.lineWidth = 1;
        ctx2.strokeStyle = `rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]})`;
        ctx2.moveTo(this.pos.x, this.pos.y);
        ctx2.lineTo(otherNode.pos.x, otherNode.pos.y);
        ctx2.stroke();
    }

    drawOnce() {
        ctx2.beginPath();
        ctx2.fillStyle = `rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]})`;
        ctx2.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI);
        ctx2.fill();
    }

    draw() {
        ctx.beginPath();
        if (this.activated) {
            ctx.fillStyle = `rgb(${this.avtivatedColor[0]}, ${this.avtivatedColor[1]}, ${this.avtivatedColor[2]})`
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#ffffff10"
        }
        else {
            ctx.fillStyle = `rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]})`
            ctx.shadowBlur = 0;
        }
        ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function fakeNode(x, y, color) {
    this.pos = new Vector(x, y);
    this.color = color;
    this.size = nodeSize;
    this.draw = function () {
        ctx.beginPath();
        ctx.fillStyle = `rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]})`
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }
}


function drawLines(neighbourDistance) {
    nodes.forEach(node => {
        nodes.forEach(neighbour => {
            if ((node.pos.subtract(neighbour.pos).magnitude()) < neighbourDistance) {
                node.neighbours.push(neighbour);
                node.connect(neighbour);
            }
        });
        node.drawOnce();
    });
}

// creating node population
function createPopulation(population, neighbourDistance) {
    for (let idx = 0; idx < population; idx++) {
        const node = new Node(Math.random() * canvas.width, Math.random() * canvas.height);
        nodes.push(node);
    }
    drawLines(neighbourDistance);
}

function createHexagonalPopulation(radius = 100, sides = 6, padding = 10, interlocking = 1) {
    const angle = 2 * Math.PI / sides;
    let startVector = new Vector(10, 10);
    let row = 1;
    let col = 1;
    while (startVector.y + padding < canvas.height) {
        while (startVector.x + padding < canvas.width) {
            const center = startVector.add(new Vector(radius, radius));
            for (let idx = 0; idx < sides; idx++) {
                let newangle = angle * idx;
                const node = new Node(center.x + Math.cos(newangle) * radius, center.y+ Math.sin(newangle) * radius);
                nodes.push(node);
            }
            startVector = startVector.add(new Vector(2 * radius, 0)); col++;
        }
        startVector = new Vector(padding - ((row % 2) * 1 * radius) * interlocking, startVector.y + Math.sqrt(3) * radius); row++;
    }
    neighbourDistance = 1.1 * radius;
    drawLines(neighbourDistance);
}

createPopulation(population, neighbourDistance);
// createHexagonalPopulation(redius=20, sides = 6, padding= 10, interlocking=1);

function resetPage() {
    nodes = [];
    energyBalls = [];
    fakeNodes = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
}