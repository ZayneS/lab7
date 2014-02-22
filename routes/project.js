var models = require('../models');

exports.projectInfo = function(req, res) { 
  var projectID = req.params.id;

  // query for the specific project and
  // call the following callback
  models.Project.find({ "_id" : projectID}).exec(afterQuery);

  function afterQuery(err, projects) {
    if(err) console.log(err);
    res.json(projects[0]);
  }
}

exports.addProject = function(req, res) {
  // get the form_data as posted from the submit button
  var form_data = req.body;
  console.log(form_data);

  var post_data = {
                    "title": form_data.project_title,
                    "date": form_data.date,
                    "summary": form_data.summary,
                    "image": form_data.image_url
                  };

  var newPost = new models.Project(post_data);
  console.log(newPost);

  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();
  newPost.save(afterSaving);

  function afterSaving(err, project){
    if (err) {console.log(err); res.send(500);}
    console.log(project);
    res.redirect('/'); // redirect to home
  }

}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;


  models.Project.find({ "_id" : projectID}).remove().exec(afterDeleting);

  function afterDeleting(err, removed){
    res.send();
  }

  // find the project and remove it
  // YOU MUST send an OK response w/ res.send();
}