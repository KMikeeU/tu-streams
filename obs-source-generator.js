import streams from './src/data/streams.json' assert { type: "json" };
import fs from 'fs';

const outfile = "./dist/tu-streams-OBS.json";

let scenes = {
    "groups": [],
    "name": "TU-Streams OBS by kä.se",
    "scene_order": [
    ],
    "sources": [
    ]
};

function getStreamUrl(name) {
    return `https://live-cdn-1.video.tuwien.ac.at/lt-live/_definst_/${name}/chunklist.m3u8`
}


for (let streamname of Object.keys(streams)) {
    if (scenes.sources.length == 0) {
        scenes.current_scene = streamname;
        scenes.current_program_scene = streamname;
    }

    let streamID = streams[streamname];

    // Push scene order
    scenes.scene_order.push({
        "name": streamname
    });

    // Push VLC source
    scenes.sources.push({
        "enabled": true,
        "hotkeys": {},
        "id": "ffmpeg_source",
        "muted": false,
        "name": `${streamname} Source`,
        "settings": {
            "buffering_mb": 8,
            "input": getStreamUrl(streamID),
            "is_local_file": false,
            "reconnect_delay_sec": 3,
            "seekable": false
        },
        "versioned_id": "ffmpeg_source",
        "volume": 1.0
    });


    // Push scene
    scenes.sources.push({
        "enabled": true,
        "id": "scene",
        "muted": false,
        "name": streamname,
        "settings": {
            "items": [
                {
                    "id": 1,
                    "align": 5,
                    "bounds": {
                        "x": 1920.0,
                        "y": 1080.0
                    },
                    "bounds_align": 0,
                    "bounds_type": 2,
                    "locked": false,
                    "name": `${streamname} Source`,
                    "visible": true
                }
            ]
        },
        "versioned_id": "scene",
        "volume": 1.0
    });
}



fs.writeFile(outfile, JSON.stringify(scenes), 'utf8', err => {
    if (err) throw err;
    console.log(`Scenes written to file ${outfile}`);
});
