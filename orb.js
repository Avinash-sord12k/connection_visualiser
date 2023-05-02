// creating energy orbs 
class Orb {
    constructor(x, y, from, to) {
        this.pos = new Vector(x, y);
        this.color = [200, 0, 0];
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
        return distance <= this.radius;
    }
}

function moveOrbs() {
    energyBalls.forEach((orb, index) => {
        orb.move();
        if (orb.hasReachedDestination()){
            orb.reached = 1;
            createOrbs(orb.to, orb.color);
            fakeNodes.push(new fakeNode(orb.to.pos.x, orb.to.pos.y, orb.color));
            energyBalls.splice(index, 1);
        }
    });
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

function createOrbs(node, last_color) {
    if (node.activated === 1) return;
    if (node.neighbours.filter(neighbour => neighbour.activated === 0).length === 0) return;
    node.activated = 1;
    node.neighbours.filter(neighbour => neighbour.activated === 0).forEach(neighbour => {
        const orb = new Orb(node.pos.x, node.pos.y, node, neighbour);
        orb.color = (last_color) ? rotateColor(last_color, 30): orb.color;
        node.color = orb.color;
        energyBalls.push(orb);
    });
}

