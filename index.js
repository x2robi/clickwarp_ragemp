/*
	Author: x2robi
	Github: https://github.com/x2robi
	Discord: https://discord.gg/3nVS2HJp
*/

const lPlayer = mp.players.local;

let farAway;

mp.events.add("render", () => {
    let currentPos = lPlayer.position;
    const h = lPlayer.getHeading();


    const camera = mp.cameras.new("gameplay");

    let direction = camera.getDirection();
    currentPos = lPlayer.position//camera.getCoord();
    currentPos = new mp.Vector3((direction.x * .5) + (currentPos.x), (direction.y * .5) + (currentPos.y), (direction.z * .5) + (currentPos.z));

    farAway = new mp.Vector3((direction.x * 250) + (currentPos.x), (direction.y * 250) + (currentPos.y), (direction.z * 250) + (currentPos.z));

    let result = mp.raycasting.testPointToPoint(currentPos, farAway, [lPlayer], [17]);

    if (typeof result === "object") {
        if (result.position !== undefined) {
            farAway = result.position;
        }
    }

    mp.game.graphics.drawMarker(
        0,
        farAway.x, farAway.y, farAway.z,
        0, 0, 0,
        0, 0, 0,
        .5, .5, .5,
        255, 255, 255, 255,
        false, false, 2,
        false, "", "",false
    );
});

mp.keys.bind(69, false, () => {
	lPlayer.setCoords(farAway.x, farAway.y, farAway.z, false, false, false, false);
});