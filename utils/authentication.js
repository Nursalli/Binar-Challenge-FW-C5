//Import Module
//Third-Party Module
const bcrypt = require('bcryptjs');

//Local Module and Publish in my account npm
const { listUsers } = require('mnursalli-first-module');

const authentication = (data) => {
    const dataUsers = listUsers();

    const existParam1 = dataUsers.find(user => user.email === data.email);

    if(existParam1){
        const existParam2 = bcrypt.compareSync(data.password, existParam1.password);

        if(existParam2){
            return true;
        }else{
            return false; 
        }
    }else{
        return false;
    };
}

module.exports = { authentication }