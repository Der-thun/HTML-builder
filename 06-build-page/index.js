const fs = require('fs');
const path = require('path');

const projectDirPath = path.join(__dirname, 'project-dist');
const indexFile = path.join(projectDirPath, 'index.html');
const styleFile = path.join(projectDirPath, 'style.css');

const templateFile = path.join(__dirname, 'template.html');
const componentsDir = path.join(__dirname, 'components');
const assetsDir = path.join(__dirname, 'assets');
const stylesDir = path.join(__dirname, 'styles');




/* Creation project folder */

fs.promises.mkdir(projectDirPath, {recursive: true});


/* Stylebundle */

fs.promises.writeFile(
    styleFile,
    ''
);
fs.readdir(stylesDir, (err, files) => {
    if (err) console.log(err)
    files.forEach(file => {
        if (file.slice(-4) === '.css') {
            const readStream = fs.createReadStream(path.join(stylesDir, file), 'utf-8');
            readStream.on('data', chunk => 
            fs.appendFile(
                styleFile,
                chunk,       
                err => {
                    if (err) throw err;            
                })
            )           
        }
    })
})

/* Assets clone */
const assetsProjectDir = path.join(projectDirPath, 'assets')


async function copyDir (dirPathFrom, dirPathTo) {
    await fs.promises.mkdir(dirPathTo, {recursive: true}); 

    let files = await fs.promises.readdir(dirPathFrom, {withFileTypes: true})
    
    files.forEach(file => {        
        if (file.isDirectory()) {            
            const newDirPathFrom = path.join(dirPathFrom, file.name);
            const newDirPathTo = path.join(dirPathTo, file.name);
            copyDir(newDirPathFrom, newDirPathTo)
        }                
    })
        

    fs.readdir(dirPathFrom, {withFileTypes: true}, (err, files) => {
        files.forEach(file => {
            if (file.isFile()) {
                const fileFrom = path.join(dirPathFrom, file.name);
                const fileTo = path.join(dirPathTo, file.name);
                fs.promises.copyFile(fileFrom, fileTo)
            }            
        })
    })
}

async function clearDir(dir) {
    fs.readdir(dir, {withFileTypes: true}, (err, files) => {
        if (err) return
        else {
            files.forEach(file => {
                if (file.isDirectory()) {
                    const newDir = path.join(dir, file.name);
                    clearDir(newDir)                                           
                } else if (file.isFile()) {
                    const fileForDel = path.join(dir, file.name);
                    fs.promises.unlink(fileForDel)
                }
            })
        }
    })

}

clearDir(assetsProjectDir)
copyDir(assetsDir, assetsProjectDir)


/* Create template */

async function createTemplate() {
    let result = await fs.promises.readFile(templateFile, 'utf-8');

    const parts = await fs.promises.readdir(componentsDir, {withFileTypes: true})

    for(let part of parts) {
        if (part.isFile()) {
            if (part.name.slice(-5) === '.html') {
                let currentName = part.name.slice(0, -5)
                const currentPath = path.join(componentsDir, part.name)
                const replacement = await fs.promises.readFile(currentPath)
                
                result = result.replace(`{{${currentName}}}`, replacement);
            }
        }
    }
    await fs.promises.writeFile(
        indexFile,
        result
    )
}

createTemplate()
