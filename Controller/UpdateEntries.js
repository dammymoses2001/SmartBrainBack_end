const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'cf490d3ba4954b2380e44693552901ee'
 });

const input =(req,res)=>{
    console.log(req.body.input)
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
     .then(data=>res.json(data))
     .catch(err=>res.status(400).json('Unable to work with API'))
}
const updateEntries=(req,res,db)=>{
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=> {
        if(entries.length){
            res.json(entries[0])
        }
        else{
            res.status(404).json('Page not Found');
        }
    })
    .catch(err=>res.status(404).json('Page not Found3'));
    
}
module.exports={
    updateEntries,
    input
}