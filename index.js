const fs = require('fs');
const { writeFile, readFile } = require('node:fs/promises');

async function handleFile(...args) {
    createFile(...args);
    await readContent(...args);
    await changeContent(...args);
    await readContent(...args);
    setTimeout(() => {
        removeFile(...args)
        },5000);
}

handleFile({
    name: "newFile",
    extension: 'txt',
    content: 'inner content',
    newContent: 'new content',
})



function createFile({ name, extension, content }) {
    fs.appendFile(`${name}.${extension}`, `${content}`, function (err) {
        if (err) throw err;
        console.log(`${name}.${extension} created!`);
    });
}

function removeFile({ name, extension }) {
    fs.unlink(`${name}.${extension}`, function (err) {
        if (err) throw err;
        console.log('deleted');
    })
}

async function readContent({ name, extension }) {
    const content = await readFile(`${name}.${extension}`, 'utf-8')
    console.log('read ' + content)
}

async function changeContent({ name, extension, newContent }) {
    await writeFile(`${name}.${extension}`, newContent);
    console.log('write new content');
}