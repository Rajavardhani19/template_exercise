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

const particle2X = windowWidth / 2;
const particle2Y = 0;
const particle2Width = windowWidth / 12;
const particle2Height = windowHeight;

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
    detectorColourChange();
    r.DrawRectangle(detectorX, detectorY, detectorWidth, detectorHeight, color);
}


function particle() {
    r.DrawRectangle(particleX, particleY, particleWidth, particleHeight, r.BLUE);
}

function particle2() {
    r.DrawRectangle(particle2X, particle2Y, particle2Width, particle2Height, r.BLUE);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    particle();
    particle2();
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