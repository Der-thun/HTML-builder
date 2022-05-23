const fs = require('fs');
const path = require('path');

const stylePath = path.join(__dirname, 'styles')
const bundleFile = path.join(__dirname, 'project-dist', 'bundle.css')
   

fs.writeFile(
    bundleFile,
    '',
    (err) => {
        if (err) throw err;        
    }
);

fs.readdir(stylePath, (err, files) => {
    if (err) console.log(err)
    files.forEach(file => {
        if (file.slice(-4) === '.css') {
            const readStream = fs.createReadStream(path.join(stylePath, file), 'utf-8');
            readStream.on('data', chunk => 
            fs.appendFile(
                bundleFile,
                chunk,       
                err => {
                    if (err) throw err;            
                })
            )           
        }
    })
})

