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

const updateUser = (data, id) => {
    const dataUsers = listUsers();

    let findUser = dataUsers.find(user => user.id === parseInt(id));

    let newData = {};
    
    if(data.password.length > 0){
        newData = {
            name: data.name,
            email: data.email,
            password: bcrypt.hashSync(data.password, 10)
        }
    }else{
        newData = {
            name: data.name,
            email: data.email
        }
    }

    findUser = { ...findUser, ...newData }

    const postNewData = dataUsers.map(user => user.id === findUser.id ? findUser : user);

    console.log(postNewData);

    saveUser(postNewData);
}

const deleteUser = (id) => {
    const dataUsers = listUsers();

    const postAfterDeleteData = dataUsers.filter(user => user.id !== parseInt(id));

    saveUser(postAfterDeleteData);
}

module.exports = { listUsers, findUser, duplicate, addUser, updateUser, deleteUser };