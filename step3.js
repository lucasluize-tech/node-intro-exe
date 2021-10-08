const { default: axios } = require('axios');
const { readFile, writeFile } = require('fs');
const { argv, exit } = require('process');

// this function takes a text and writes to output file.
function writeOut(text, out){
    if (out){
        writeFile(out, text, 'utf8', (err)=>{
            if(err){
                console.log(`Fail to write ${out} to ${path}`)
                exit(1)
            }
        })
    }else{
        console.log(path)
    }
}

// this function takes a url , logs the data and if --out, writes to file.
async function webCat(url, out){
    try{
        res = await axios.get(url)
        writeOut(res.data, out)
    }catch(err){
        console.log('Error Fetching', url)
        exit(1)
    }
    return res.data
}

// this function takes a file and logs the data, if --out , writes to file.
function cat(path, out){
    readFile(path, 'utf8', (err, data)=>{
        if(err){
            console.log('Error reading', path)
            console.log('Code:', err.code)
            exit(1)
        }else{
            writeOut(data, out)
        }  
    })
}

let path;
let out;

if (process.argv[2] === '--out') {
  out = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

if (path.startsWith('http')){
    webCat(path, out)
}else{
    cat(path, out)
}
