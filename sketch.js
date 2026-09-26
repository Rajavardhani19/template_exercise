const r = require("raylib");

const windowWidth = 1000;
const windowHeight = 1000;
const FPS = 50;

let detectorX = 0;
const detectorY = 0;
const detectorWidth = windowWidth / 10;
const detectorHeight = windowHeight;

let backward = false;

const particleX = windowWidth / 3;
const particleY = 0;
const particleWidth = windowWidth / 6;
const particleHeight = windowHeight;

const endXParticle = particleX + particleWidth;
let diffBtwX = particleX - detectorX;

let color = r.WHITE;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.InitWindow(windowWidth, windowHeight, "Draw Scanner")
    r.SetTargetFPS(FPS)
}

function direction() {
    if (detectorX === 0) {
        backward = false;
    }
    else if (detectorX + detectorWidth === windowWidth) {
        backward = true;
    }
}

function update() {
    if (detectorX + detectorWidth === windowWidth || backward === true) {
        detectorX -= 1;
    }
    else {
        detectorX += 1;
    }
    direction();
    diffBtwX = particleX - detectorX;
}

function detectorColourChange() {
    color = r.WHITE;
    if (diffBtwX <= detectorWidth && detectorX <= endXParticle) {
        color = r.RED;
    }
}

function detector() {
    detectorColourChange(color);
    r.DrawRectangle(detectorX, detectorY, detectorWidth, detectorHeight, color);
}


function particle() {
    r.DrawRectangle(particleX, particleY, particleWidth, particleHeight, r.BLUE);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    particle();
    detector();
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