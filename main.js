const express = require('express');
const Mustache = require('mustache-express');
const bodyParser = require('body-parser');
const postgres = require('pg');
const sequelize = require('sequelize');

const models = require("./models");

var application = express();
application.engine('mustache', Mustache());

application.set('views', './views');
application.set('view engine', 'mustache');

application.use(bodyParser.urlencoded({ extended: true }));

var localModel = {}
localModel.todos = []
localModel.dones = []

application.get('/', (request, response) => {
      
      models.todos.findAll().then(function (daTodos) {
        //populate local model w/ accurate data
         localModel.todos = daTodos;
      }).then(function (){
            models.dones.findAll().then(function (daDones) {
                //populate local model w/ accurate data
                  localModel.dones = daDones;
                  response.render('todo', localModel);
            });
          });

});

application.post("/", function (request, response) {
  var doIt = request.body.item

  models.todos.count().then(function (count) {
    let todo = models.todos.build({
      tag: 5,
      item: doIt
    });
    todo.save().then(function (newTodo) {
      response.redirect('/');
    });
  });
});

application.post("/:id", function (request, response) {
  //get requested id, add todo id to dones, remove todo id from todo
  var dex = parseInt(request.params.id);
  var moveItem;
  
  models.todos.findOne({
    where: {
      id: dex
    }
  }).then(function (todo) {
    moveItem = todo.item;
    models.todos.destroy({
      where: {
        id: dex
      }
    }).then(function(){
      let done = models.dones.build({
        tag: 5,
        item: moveItem
      });
      console.log("done built");
      done.save().then(function (newDone) {
          console.log("done save");
          response.redirect('/');
      });
    });
  });

  
});

application.listen(3000);