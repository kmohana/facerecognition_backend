const handleRegister = (req,res,knex,bcrypt) => {
    const {name , email , password} = req.body;

    const hash = bcrypt.hashSync(password);

    if(!email || !name || !password){
        return res.status(400).json('Incorrect form data!!');
    }
    knex.transaction(trx => {
        trx.insert({
            hash : hash,
            email : email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                name : name,
                email : loginEmail[0],
                joined : new Date()
            })
            .then(user => {
                res.json(user[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(404).json('Unable to register!. Kindly Contact Admin'))
}

module.exports = {
    handleRegister : handleRegister
};