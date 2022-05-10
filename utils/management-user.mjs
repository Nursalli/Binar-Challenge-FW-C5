//Third-Party Module
import fs from "fs";
import bcrypt from "bcryptjs"

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
const listUser = () => {
    const file = fs.readFileSync('data/user.json', 'utf8');
    return JSON.parse(file);
}

//Get Find User
const findUser = (id) => {
    const dataUsers = listUser();
    return dataUsers.find(data => data.id === parseInt(id));
}

//Save User
const saveUser = (data) => {
    fs.writeFileSync('data/user.json', JSON.stringify(data));
}

//Check Duplicate
const duplicate = (email) => {
    const dataUsers = listUser();
    return dataUsers.find(data => data.email === email);
}

//Add User
const addUser = (data) => {
    const dataUsers = listUser();
    
    const id = (dataUsers.length === 0) ? 1 : dataUsers[dataUsers.length - 1].id + 1;
    let { name, email, password } = data;

    password = bcrypt.hashSync(password, 10);

    // const compare = bcrypt.compareSync("12345", password);

    const post = {
        id,
        name,
        email,
        password
    }

    dataUsers.push(post);

    saveUser(dataUsers);
}

export { listUser, findUser, duplicate, addUser };