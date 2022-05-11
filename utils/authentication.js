//Import Module
//Third-Party Module
const bcrypt = require('bcryptjs');

//Local Module
const { listUsers } = require('./management-user');

const authentication = (user) => {
    const dataUsers = listUsers();

    const existParam1 = dataUsers.find(data => data.email === user.email);

    if(existParam1){
        const existParam2 = bcrypt.compareSync(user.password, existParam1.password);

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