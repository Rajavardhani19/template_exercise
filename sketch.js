const r = require("raylib");

const windowWidth = 300;
const windowHeight = 200;
const FPS = 50;

let detectorX = 0;
const detectorY = 0;
const detectorWidth = windowWidth / 10;
const detectorHeight = windowHeight;

let backward = false;

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

function detector() {
    r.DrawRectangle(detectorX, detectorY, detectorWidth, detectorHeight, r.WHITE);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
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