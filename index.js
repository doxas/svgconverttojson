
let parsePath = require('extract-svg-path').parse;
let svgMesh3d = require('svg-mesh-3d');
let fs = require('fs');

let dest = {};
let paths = {
    S1:  './resource/msg/msgS_001.svg',
    S2:  './resource/msg/msgS_002.svg',
    S3:  './resource/msg/msgS_003.svg',
    S4:  './resource/msg/msgS_004.svg',
    S5:  './resource/msg/msgS_005.svg',
    S6:  './resource/msg/msgS_006.svg',
    S7:  './resource/msg/msgS_007.svg',
    S8:  './resource/msg/msgS_008.svg',
    S9:  './resource/msg/msgS_009.svg',
    S10: './resource/msg/msgS_010.svg',
    S11: './resource/msg/msgS_011.svg',
    S12: './resource/msg/msgS_012.svg',
    S13: './resource/msg/msgS_013.svg',
    M1:  './resource/msg/msgM_001.svg',
    M2:  './resource/msg/msgM_002.svg',
    M3:  './resource/msg/msgM_003.svg',
    M4:  './resource/msg/msgM_004.svg',
    M5:  './resource/msg/msgM_005.svg',
    M6:  './resource/msg/msgM_006.svg',
    M7:  './resource/msg/msgM_007.svg',
    M8:  './resource/msg/msgM_008.svg',
    L1:  './resource/msg/msgL_001.svg',
    L2:  './resource/msg/msgL_002.svg',
    L3:  './resource/msg/msgL_003.svg',
    L4:  './resource/msg/msgL_004.svg',
    L5:  './resource/msg/msgL_005.svg'
};

for(let i in paths){
    readFile(i, paths[i], (err, key, mesh) => {
        if(err != null){
            console.log('read error');
            return;
        }
        dest[key] = mesh;
        let f = true;
        for(let j in paths){
            f = f && dest.hasOwnProperty(j);
        }
        if(f === true){
            let json = JSON.stringify(dest);
            fs.writeFile('./dest/msg/out.json', json, (_err) => {
                if(_err != null){
                    console.log('write error');
                }
            });
        }
    });
}

function readFile(key, path, callback){
    fs.readFile(path, 'utf8', function(err, data){
        if(err == null){
            let svgPath = parsePath(data);
            let mesh = svgMesh3d(svgPath, {
                delaunay: true,
                normalize: false
            });
            callback(err, key, mesh);
        }else{
            callback(err);
        }
    });
}

