function animate() {
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveOrbs();

    // loop through energy balls
    energyBalls.forEach(ball => {
        // move energy ball

        // draw energy ball
        ctx.beginPath();
        ctx.arc(ball.pos.x, ball.pos.y, ball.radius, 0, 2 * Math.PI);
        ctx.fillStyle = ball.color;
        ctx.fill();
    });
    nodes.filter(node => node.activated == 1).forEach(node => { node.draw()});

    // request animation frame
    requestAnimationFrame(animate);
}

animate();
