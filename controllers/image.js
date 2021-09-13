const Clarifai = require('clarifai');
 
const app = new Clarifai.App({
    apiKey : '837411cc77cf47b589935900beee1e87'
  });

const handleApiCall = (req,res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err =>  res.status(400).json('Unable to recognize face'))
}


const handleImage = (req,res,knex) => {
    const { id } = req.body;
    knex('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => {
            res.status(400).json('Entries could not be updated')
        })
}

module.exports = {
    handleImage,
    handleApiCall
}