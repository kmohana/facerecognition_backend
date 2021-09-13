const handleProfileGet = (req,res,knex) =>{
    const { id } = req.params;
    let found = false;

    knex.select('*').from('users').where({id})
        .then(user => {
            if(user.length){
                res.json(user[0])
            }
            else{
                res.status(400).json('No such user')
            }
        })
        .catch(err => res.status(400).json('Error fetching user details'))

}

module.exports = {
    handleProfileGet
}