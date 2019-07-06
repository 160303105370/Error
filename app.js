var express     = require('express'),
    app         = express(),
    bodyPaser   = require('body-parser'),
    mongoose    = require('mongoose'),
    Comment     = require('./models/comment'),
    Campground  = require('./models/campground'),
    seedDB      = require('./seeds');
    var Campground=require('./models/campground');
mongoose.connect('mongodb://localhost/yelp_camp_v3',{useNewUrlParser: true });


//app config
app.use(bodyPaser.urlencoded({extended:true}));
app.set('view engine','ejs');
seedDB();

app.get('/',function(req,res){
    //res.send('Hompage!');
    res.render('landing');
});

app.get('/campgrounds',function(req,res){
    //get all the campground from DB
    Campground.find({},function(err,allcampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render('index',{campgrounds:allcampgrounds});
        }
    });
    
});

app.post('/campgrounds',function(req,res){
    var name=req.body.name,
        image=req.body.image,
        description=req.body.description;
    var newCampground={name: name,image: image,description: description};
    
    //Create new campground
    Campground.create(newCampground,function(err,newlyCreated){
        if(err)
        {
            console.log(err);
        }
        else{
            res.redirect('/campgrounds');
        }
    });
    
});

app.get('/campgrounds/new',function(req,res){
    res.render('new');
});
//show
app.get('/campgrounds/:id',function(req,res){
    Campground.findById(req.params.id).populate('comments').exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }
        else
        {   console.log(foundCampground);
            res.render('show',{campground:foundCampground});
        }
    });
      
});

app.listen(3000,function() {
    console.log('Yelp camp is running');
});