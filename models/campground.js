var mongoose=require('mongoose');
//Schema setup
var campgroundSchemma=new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }]
});
 
//Model setup
module.exports=mongoose.model('Campground',campgroundSchemma);