
const fs = require('fs');
const path = require('path');

const secretFolder = path.join(__dirname, 'secret-folder')

fs.readdir(secretFolder, {withFileTypes: true}, (err, files) => {
    if(err) console.log(err)
    else {
        files.forEach(file => {
            if(file.isFile()) {
                const filePath = path.join(secretFolder, file.name)
                const fileInfo = file.name.split('.')
                fs.stat(filePath, (err, stats) => {
                    if(err) console.log(err)
                    else {
                        console.log(`${fileInfo[0]} - ${fileInfo[1]} - ${stats.size}b`)
                    }
                })
            }            
        })
    }
});
  