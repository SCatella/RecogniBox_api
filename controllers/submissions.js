const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: process.env.API_CLARIFAI
});

const handleApiCall = () => (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('Unable to work with API'));
}

const handleSubmissions = (db) => (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('submissions', 1)
        .returning('submissions')
        .then(submissions => {
            res.json(submissions[0]);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json('Unable to get entries');
        })
}

module.exports = {
    handleSubmissions,
    handleApiCall
}
