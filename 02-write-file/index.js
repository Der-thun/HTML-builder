const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'text.txt')

fs.writeFile(
    file,
    '',
    (err) => {
        if (err) throw err;        
    }
);

process.stdout.write('Приглашение на ввод текста\n>')

process.stdin.on('data', data => {
    const dataStringified = data.toString();
    if (dataStringified.trim() == 'exit') process.exit();
    process.stdout.write('>')    
    fs.appendFile(
        file,
        dataStringified,       
        err => {
            if (err) throw err;            
        });            
    }    
);


process.on('exit', () => process.stdout.write('Прощальная фраза'));
process.on('SIGINT', () => process.exit());