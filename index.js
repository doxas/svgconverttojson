
let parsePath = require('extract-svg-path').parse;
let svgMesh3d = require('svg-mesh-3d');
let fs = require('fs');

let dest = {};
let paths = {
    hajicco: './resource/hajicco.svg'
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
            fs.writeFile('./dest/out.json', json , (_err) => {
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
                delaunay: true
            });
            callback(err, key, mesh);
        }else{
            callback(err);
        }
    });
}


