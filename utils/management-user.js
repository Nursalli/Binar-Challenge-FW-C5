//Import Module
//Third-Party Module
const fs = require('fs');
const bcrypt = require('bcryptjs');

//Create Folder data
const dirpath = './data';
if(!fs.existsSync(dirpath)){
    fs.mkdirSync(dirpath);
}

//Create File user.json
const dirfile = './data/user.json';
if(!fs.existsSync(dirfile)){
    fs.writeFileSync(dirfile, '[]', 'utf-8');
}

//Get Users
const listUsers = () => {
    const file = fs.readFileSync('data/user.json', 'utf8');
    return JSON.parse(file);
}

//Get Find User
const findUser = (id) => {
    const dataUsers = listUsers();
    return dataUsers.find(data => data.id === parseInt(id));
}

//Save User
const saveUser = (data) => {
    fs.writeFileSync('data/user.json', JSON.stringify(data));
}

//Check Duplicate
const duplicate = (email) => {
    const dataUsers = listUsers();
    return dataUsers.find(data => data.email === email);
}

//Add User
const addUser = (data) => {
    const dataUsers = listUsers();
    
    const id = (dataUsers.length === 0) ? 1 : dataUsers[dataUsers.length - 1].id + 1;
    let { name, email, password } = data;

    password = bcrypt.hashSync(password, 10);

    const post = {
        id,
        name,
        email,
        password
    }

    dataUsers.push(post);

    saveUser(dataUsers);
}

module.exports = { listUsers, findUser, duplicate, addUser };