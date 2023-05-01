
class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y);
    }

    subtract(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }

    dot(vector) {
        return this.x * vector.x + this.y * vector.y;
    }

    magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    normalize() {
        const mag = this.magnitude();
        return new Vector(this.x / mag, this.y / mag);
    }

    multiply(scalar) {
        return new Vector(this.x * scalar, this.y * scalar);
    }
}


function drawFPS(canvas) {
    let lastTime = Date.now();
    let frames = 0;

    function update() {
        const now = Date.now();
        const delta = now - lastTime;

        // Calculate FPS
        const fps = Math.round(1000 / delta);

        // Clear canvas and draw FPS
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillText(`FPS: ${fps}`, 10, 20);

        // Increment frame count and update last time
        frames++;
        lastTime = now;

        // Schedule next update
        requestAnimationFrame(update);
    }

    // Start the loop
    update();
}




function rotateColor(color, degrees) {
    // Convert the color to HSL
    let hsl = rgbToHsl(color[0], color[1], color[2]);

    // Rotate the hue
    hsl[0] += degrees / 360;
    if (hsl[0] < 0) {
        hsl[0] += 1;
    }
    if (hsl[0] > 1) {
        hsl[0] -= 1;
    }

    // Convert the HSL color back to RGB
    let rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);

    return rgb;
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);

    let h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    return [h, s, l];
}



function hslToRgb(h, s, l) {
    let r, g, b;

    if (s == 0) {
        r = g = b = l;
    } else {
        function hue2rgb(p, q, t) {
            if (t < 0) {
                t += 1;
            }
            if (t > 1) {
                t -= 1;
            }
            if (t < 1 / 6) {
                return p + (q - p) * 6 * t;
            }
            if (t < 1 / 2) {
                return q;
            }
            if (t < 2 / 3) {
                return p + (q - p) * (2 / 3 - t) * 6;
            }
            return p;
        }

        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}


function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
