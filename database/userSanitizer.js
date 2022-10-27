//this function is responsible for cleaning userdata before been inserted into the database
import bycript from 'bcrypt'


let salt = 10;
export default async function(values) {
    let userdata = {};
    values.forEach((feild) => {
        if (feild.id == 'password') {
            userdata[feild.id] = bycript.hashSync(feild.value, salt);
            return
        }
        userdata[feild.id] = feild.value
    })

    console.log(userdata)
    return userdata;

}
