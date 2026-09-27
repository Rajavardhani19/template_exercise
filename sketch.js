const r = require("raylib");

const windowWidth = 300;
const windowHeight = 200;
const FPS = 50;

let detectorX = 0;
const detectorWidth = 20

let detector2X = windowWidth - 20;
let detector3Y = 0;
const detector2Width = 20;
let backward = false;
let backward2 = false;
let backward3 = false;

const particleX = 100;
const particleWidth = 10;

const particle2X = 200;
const particle2Width = 20;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.InitWindow(windowWidth, windowHeight, "Draw Scanner")
    r.SetTargetFPS(FPS)
}

function Speed(detectX, detectWidth, start, end, detectEnd) {
    if (detectEnd === windowHeight) {
        if (detectX === start) {
            return backward3 = false;
        }
        else if (detectX + detectWidth === end) {
            return backward3 = true;
        }
    }
    else if (detectX < detectEnd) {
        if (detectX === start) {
            return backward = false;
            // return false;
        }
        else if (detectX + detectWidth === end) {
            return backward = true;
            // return true;
        }
    }
    else {
        if (detectX === start) {
            return backward2 = false;
        }
        else if (detectX + detectWidth === end) {
            return backward2 = true;
        }
    }
}

function direction(detectX, detectWidth, end, start, speed, backwar, detectEnd) {
    if (detectX + detectWidth === end || backwar === true) {
        Speed(detectX, detectWidth, start, end, detectEnd)
        return detectX -= speed;
    }
    else {
        return detectX += speed;
    }
}

function update() {
    detectorX = direction(detectorX, detectorWidth, windowWidth / 2, 0, 1, backward, windowWidth / 2);
    detector2X = direction(detector2X, detector2Width, windowWidth, windowWidth / 2, 2, backward2, windowWidth / 2);
    detector3Y = direction(detector3Y, 10, windowHeight - 10, 0, 1, backward3, windowHeight)
}

function detectorColourChange(Xparticle, Xdetector, detectWidth, partWidth) {
    const endXParticle = Xparticle + partWidth;
    let diffBtwX = Xparticle - Xdetector;
    let color = r.WHITE;
    if (diffBtwX <= detectWidth && Xdetector <= endXParticle) {
        color = r.RED;
    }
    return color;
}

function detector(particleX, particle2X, particleWidth, particle2Width, detecX, detectorWidth) {
    if (detecX <= particleX + particleWidth || detecX === particleX) {
        return detectorColourChange(particleX, detecX, detectorWidth, particleWidth);
    }
    else {
        return detectorColourChange(particle2X, detecX, detectorWidth, particle2Width);
    }
}

function color(particleX, particle2X, particleWidth, particle2Width, detectX, detectorWidth) {
    if (particleX < particle2X) {
        return detector(particleX, particle2X, particleWidth, particle2Width, detectX, detectorWidth)
    }
    return detector(particle2X, particleX, particle2Width, particleWidth, detectX, detectorWidth)
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    r.DrawRectangle(particleX, 0, particleWidth, windowHeight, r.BLUE);
    r.DrawRectangle(0, 100, windowWidth, 10, r.BLUE)
    r.DrawRectangle(particle2X, 0, particle2Width, windowHeight, r.BLUE);
    r.DrawRectangle(detectorX, 0, detectorWidth, windowHeight, color(particleX, particle2X, particleWidth, particle2Width, detectorX, detectorWidth));
    r.DrawRectangle(detector2X, 0, detector2Width, windowHeight, color(particleX, particle2X, particleWidth, particle2Width, detector2X, detectorWidth));
    r.DrawRectangle(0, detector3Y, windowWidth, 20, color(100, 0, 10, 0, detector3Y, 20))
    r.EndDrawing();
}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    running,
    setup,
    update,
    draw,
    teardown,
};
