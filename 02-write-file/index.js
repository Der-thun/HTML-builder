const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'text.txt')

fs.promises.writeFile(
    file,
    '',
);

process.stdout.write('Введите что-нибудь:\n>')

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


process.on('exit', () => process.stdout.write('Прощайте! Все что вводили ищите в text.txt'));
process.on('SIGINT', () =>{
    process.stdout.write('\n');
    process.exit();
    });