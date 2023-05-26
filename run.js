function animate() {
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveOrbs();

    // loop through energy balls
    energyBalls.forEach(ball => {
        ctx.beginPath();
        ctx.arc(ball.pos.x, ball.pos.y, ball.radius, 0, 2 * Math.PI);
        ctx.fillStyle = ball.color;
        ctx.fillStyle = `rgb(${ball.color[0]}, ${ball.color[1]}, ${ball.color[2]})`;
        ctx.fill();
    });
    fakeNodes.forEach(node => { node.draw();});
    requestAnimationFrame(animate);
}

animate();
