const { readFile } = require('fs');
const { argv, exit } = require('process');


function cat(path){
    
    readFile(path, 'utf8', (err, data)=>{
        if(err){
            console.log('Error reading', path)
            console.log('Code:', err.code)
            exit(1)
        }
        console.log(data)
    })
}

cat(argv[2])