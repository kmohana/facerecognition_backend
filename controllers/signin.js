const handleSignIn = (knex,bcrypt) => (req,res) => { 
    const { email , password} = req.body;

    if(!email || !password){
        return res.status(400).json('Incorrect sign in data!!');
    }   

    knex.select('email','hash').from('login')
        .where('email','=',email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash); 
            if(isValid){
               return knex.select('*').from('users')
                    .where('email','=',email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('Unable to get user'))
            }else{
                res.status(400).json('Invalid Credentials')
            }
         })
         .catch(err => res.status(400).json('Invalid Credentials'))
}

module.exports = {
    handleSignIn : handleSignIn
}