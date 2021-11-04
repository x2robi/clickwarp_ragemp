let prevLeftMousePressed = false;

mp.events.add("render", () => {
    const leftMousePressed = mp.game.controls.getDisabledControlNormal(0, 24);
    const direction = mp.cameras.new("gameplay").getDirection();
    const playerPos = mp.players.local.position;

    let pointPos = new mp.Vector3((direction.x * 125) + playerPos.x, (direction.y * 125) + playerPos.y, (direction.z * 125) + playerPos.z);

    const result = mp.raycasting.testPointToPoint(playerPos, pointPos, mp.players.local.handle, 17);

    if (typeof result === "object") {
        if (result.position !== undefined) {
            pointPos = result.position;
        }
    }

    mp.game1.graphics.drawMarker(
        0,
        pointPos.x, pointPos.y, pointPos.z + .5,
        0, 0, 0,
        0, 0, 0,
        .5, .5, .5,
        255, 255, 255, 255,
        false, false, 2,
        false, "", "",false
    );

    if (!prevLeftMousePressed && leftMousePressed) {
        mp.players.local.setCoords(pointPos.x, pointPos.y, pointPos.z, false, false, false, false);
    }

    prevLeftMousePressed = leftMousePressed;
});
