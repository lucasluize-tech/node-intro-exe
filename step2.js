const { default: axios } = require('axios');
const { readFile, exists } = require('fs');
const { argv, exit } = require('process');

async function webCat(url){
    try{
        res = await axios.get(url)
    }catch(err){
        console.log('Error Fetching', url)
        exit(1)
    }
    return console.log(res.data)
}


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

if (argv[2].startsWith('http')){
    webCat(argv[2])
}else{
    cat(argv[2])
}