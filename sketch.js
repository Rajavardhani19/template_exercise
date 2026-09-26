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
        detectorX -= 3;
    }
    else {
        detectorX += 3;
    }
    direction();
}

function detectorColourChange(Xparticle, Xdetector, detectWidth, partWidth) {
    const endXParticle = Xparticle + partWidth;
    let diffBtwX = Xparticle - Xdetector;
    color = r.WHITE;
    if (diffBtwX <= detectWidth && Xdetector <= endXParticle) {
        color = r.RED;
    }
}

function detector() {
    detectorX <= particleX + particleWidth
    detectorColourChange(particleX, detectorX, detectorWidth, particleWidth);

    // else {
    //     detectorColourChange(particle2X, detectorX, detectorWidth, particle2Width);
    // }
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