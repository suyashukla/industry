var mongoose    =   require("mongoose"),
    Project     =   require("./models/projects")
    Location     =  require("./models/location");

var data=[
    {
        name: "Project 1",
        description: "The is first project"
    },
    {
        name: "Project 2",
        description: "The is second project"
    },
    {
        name: "Project 3",
        description: "this is third project"
    }
]

function seedDB(){
    //Remove all projects
    Project.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("projects removed");
        //add a few projects
        data.forEach(function(seed){
            Project.create(seed, function(err, project){
                if(err){
                    console.log(err);
                }else{
                    console.log("Added a project");
                    //create a location
                    Location.create(
                        {
                            name: "Location 1",
                            description: "this is first location"
                        }, function(err, location){
                            if(err){
                                console.log(err);
                            }else{
                                project.locations.push(location);;
                                project.save();
                                console.log("Created new location");
                            }
                        });
                }
            });
        });
    });
}

module.exports  =   seedDB;