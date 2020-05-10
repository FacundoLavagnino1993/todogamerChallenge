const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);

const Users = require('./models/users');

//Create connection to MongoDB.
require('./config/mongo');

app.use(
  bodyParser.json({
    type: ['json', 'application/csp-report']
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.delete('/delete-user?:id', (req, res) => {
  Users.deleteOne({_id: req.query.id}, (error, data) => {
    if (error) {
      res.status(500).send({message: 'Internal Error', error: error})
    } else {
      Users.find({},(error, data) => {
        if (error) res.status(204).send({message: 'Element has been deleted'})
        res.status(200).send({message: 'Element has been deleted', data: data})
      })
    } 
  })
  
})

app.get('/get-all-users', (req, res) => {
  Users.find({},(error, data) => {
    if (error) {
      console.log(error);
      res.status(500).send({message: 'Internal Error'})
    } else {
      res.send(data);
    }
  })
});

app.post('/add-user', (req, res) => {
  let user = new Users();
  user.name = req.body.name;
  user.last_name = req.body.last_name;
  user.user_name = req.body.user_name;
  user.email = req.body.email;

  user.save((error, success) => {
    if (error) {
      res.status(500).send({message: 'Internal Error', error: error.message || error});
    } 
    res.status(200).send({message: 'user created',user: success});
  })

});

app.put('/update-user', (req, res) => {
  Users.findByIdAndUpdate(req.body._id, req.body, {new: true},(error, data) => {
    if (error) {
      res.status(500).send({message: 'Internal Error', error: error});
    } else {
      Users.find({},(error, data) => {
        if (error) res.status(204).send({message: 'Element has been updated'})
        res.status(200).send({message: 'Element has been updated', data: data})
      })
    }
  });
});

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});


app.set('port', 4300);

server.listen(4300, () => {
  console.log('Proxy started on port 4300');
});

module.exports = {
  app
}