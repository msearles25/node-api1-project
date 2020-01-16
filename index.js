// implement your API here
const express = require('express');

const Users = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/api/users', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            console.log(error)

            res.status(500).json({ errorMessage: "The users information could not be retrieved."})
        })
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    Users.findById(id)
        .then(users => {
            if(users) {
                res.status(200).json(users)
            } else {
                res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ errorMessage: "The user information could not be retrieved."})
        })
})


server.post('/api/users', (req, res) => {
    const {name, bio} = req.body
    Users.insert(req.body)
    .then(user => {
            res.status(201).json(user)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
    })

    if(!name || !bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user."  })
    }
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    Users.remove(id)
        .then(deleted => {
            if(deleted) {
                res.status(200).json(deleted)
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist."  })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                errorMessage: 'The user could not be removed.'
            })
        })
    
})

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const  { name, bio } = req.body;
    Users.update(id, req.body)
        .then(updated => {
            if(updated) {
                res.status(200).json(updated)
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist."  })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                errorMessage: "The user information could not be modified." 
        })
    })
    if(!name || !bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user."  })
    }

})
 


const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`\n ** api on port: ${port} **\n`))
