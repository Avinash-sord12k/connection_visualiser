// creating energy orbs 
class Orb {
    constructor(x, y, from, to) {
        this.pos = new Vector(x, y);
        this.color = "#bbb";
        this.speed = Math.random() * 0.7 + 1;
        this.from = from;
        this.to = to;
        this.radius = 1;
        this.reached = 0;
    }

    move() {
        const direction = this.to.pos.subtract(this.from.pos).normalize();
        this.pos = this.pos.add(direction.multiply(this.speed));
    }

    hasReachedDestination() {
        const distance = this.pos.subtract(this.to.pos).magnitude();
        // this.reached = 1;
        return distance <= this.radius;
    }
}

function moveOrbs() {
    energyBalls.forEach((orb, index) => {
        orb.move();
        if (orb.hasReachedDestination()){
            orb.reached = 1;
            energyBalls.splice(index, 1);
            createOrbs(orb.to);
        }
    });
    // energyBalls = energyBalls.filter(balls=> balls.reached===0);
}


// algo
// 1 OnClick Event
// 2 Create energy balls for each connection
// 3 Move energy balls - from active node to inactive node.
// 4 Create new balls when it hit the neighbouring nodes
// 5 Delete parent ball
// 6 Repeat 3 - 5 

$(canvas).on("click", function (e) {
    const mousePos = new Vector(e.offsetX, e.offsetY);
    nodes.forEach(node => {
        const distance = node.pos.subtract(mousePos).magnitude();
        if ((distance < 50) && (node.activated===0)) {
            createOrbs(node);
        }
    });
});

function createOrbs(node) {
    if (node.activated === 1) return;
    node.neighbours.filter(neighbour => neighbour.activated === 0).forEach(neighbour => {
        node.activated = 1;
        const orb = new Orb(node.pos.x, node.pos.y, node, neighbour);
        energyBalls.push(orb);
    });
}



// setInterval(moveOrbs, 10);
