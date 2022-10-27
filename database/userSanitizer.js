//this function is responsible for cleaning userdata before been inserted into the database

export default async function(values) {
    let userdata = {};

    values.forEach((feild) => {
        userdata[feild.id] = feild.value
    })

    return userdata;

}