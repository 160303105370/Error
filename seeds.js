var mongoose    =require('mongoose'),
    Campground  =require('./models/campground');
    var Comment =require('./models/comment');
    var data        =[
        {
            name:'Camping at night',
            image:'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
            description:'What can be better than sleeping with the mosquitoes under the moon light'
        },
        {
            name:'Engoying your own company ',
            image:'https://images.unsplash.com/photo-1546811740-23e671faf31c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
            description:'Nothing can beat the silence'
        },
        {
            name:'Northern lights',
            image:'https://images.unsplash.com/photo-1505735754789-3404132203ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
            description:'Sleeping under the northern lights'
        }
    ];
function seedDB(){
    Campground.remove({},function(err){
        if(err){
            console.log(err);
        }
            console.log('removed campground!');
            data.forEach(element => {
                Campground.create(element,function(err,campground){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log('added a campground!');
                        //Create comment
                        Comment.create({
                            text:'this place is gr8 but I wish there was Internet',
                            author:'homer'
                        },function(err,comment){
                            if(err){
                                console.log(err);
                            }
                            else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log('Created a new comment');
                            }
                        });
                    }
                });
            });
        
    });
}
module.exports=seedDB;