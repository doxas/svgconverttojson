
let parsePath = require('extract-svg-path').parse;
let svgMesh3d = require('svg-mesh-3d');
let fs = require('fs');

let dest = {};
let paths = {
    first: './resource/flower_original_20190415.svg'
};

const TO_FIXED = 3;

for(let i in paths){
    readFile(i, paths[i], (err, key, mesh) => {
        if(err != null){
            console.log('read error');
            return;
        }
        let positions = [];
        let cells = [];
        for(let _i = 0, _j = mesh.positions.length; _i < _j; ++_i){
            positions.push(
                parseFloat(mesh.positions[_i][0].toFixed(TO_FIXED)),
                parseFloat(mesh.positions[_i][1].toFixed(TO_FIXED)),
                0
            );
        }
        for(let _i = 0, _j = mesh.cells.length; _i < _j; ++_i){
            cells.push(
                mesh.cells[_i][0],
                mesh.cells[_i][1],
                mesh.cells[_i][2]
            );
        }
        dest[key] = {positions: positions, cells: cells};
        let f = true;
        for(let j in paths){
            f = f && dest.hasOwnProperty(j);
        }
        if(f === true){
            let json = JSON.stringify(dest);
            fs.writeFile('./dest/out.json', json, (_err) => {
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


