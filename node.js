// creating node function:
class Node {
    constructor(x, y) {
        this.pos = new Vector(x, y);
        this.size = 3;
        this.neighbours = [];
        this.color = [20, 0, 0];
        this.avtivatedColor = [60, 0, 0];
        this.activated = 0;
    }

    connect(otherNode) {
        ctx2.beginPath();
        ctx2.lineWidth = 1;
        ctx2.strokeStyle = "rgb(20, 20, 20)";
        ctx2.moveTo(this.pos.x, this.pos.y);
        ctx2.lineTo(otherNode.pos.x, otherNode.pos.y);
        ctx2.stroke();
    }

    draw() {
        ctx2.beginPath();
        if (this.activated) {ctx2.fillStyle = `rgb(${this.avtivatedColor[0]}, ${this.avtivatedColor[1]}, ${this.avtivatedColor[2]})`}
        else {ctx2.fillStyle = `rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]})`}
        ctx2.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI);
        ctx2.fill();
    }
}

function drawLines() {
    nodes.forEach(node => {
        nodes.forEach(neighbour => {
            if ((node.pos.subtract(neighbour.pos).magnitude()) < neighbourDistance) {
                node.neighbours.push(neighbour);
                node.connect(neighbour);
            }
        });
        node.draw();
    });
}

// creating node population
function createPopulation() {
    for (let idx = 0; idx < population; idx++) {
        const node = new Node(Math.random() * canvas.width, Math.random() * canvas.height);
        nodes.push(node);
    }
      drawLines();
}

createPopulation();