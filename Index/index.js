const express = require('express'); // import the express package
const server = express(); // creates the server
const shortid = require('shortid');

server.use(express.json()); // express reads json from body

let users = [
    {
       id: shortid.generate(),
       name: 'Ralph',
       bio: 'Im gonna wreck it' 
    },
    {
        id: shortid.generate(),
        name: 'Felix',
        bio: 'I can fix it!!' 
     }
]

// handle requests to the root of the api, the / route
server.get('/', (req, res) => {

    res.send('Hello from Express');
})

server.post('/api/users', (req, res) => {
    const newUser = req.body; 
    users.add(newUser)
    .then(user => {
  
    if(newUser !== req.body.json({name: "", bio: ""})){
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    }else {
        newUser.id = shortid.generate();
        users.push(newUser);
         
    }})
    .catch(error => {
        console.log(error);
        res.status(500).json({
            errorMessage: "There was an error while saving the user to the database" 
        });
    })
    .then(
        res.status(201).json(newUser)
    )
    .catch(
        res.status(500).json({
            errorMessage: "The users information could not be retrieved."
        }));
    
})
server.get('/api/users', (req, res) => {
    users.find(req.query)
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        res.status(500).json({
            errorMessage: "The users information could not be retrieved."
        });
    });
});

server.get('/api/users/:id', (req, res) => {
    id = req.params.id
    users.find(id)
    .then(user => {
        if (user) {
            res.status(200).json(user);
        }else{
            res.status(404).json({errorMessage: 'User not found'})
        }
    })
    .catch(error => {
        res.status(500).json({errorMessage: "The information could not be retrieved"})
    })
})
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id
    const deleted = users.find(user => user.id === id);
    let found = users.filter(user => user.id === id)
    if(found){
       users.filter(user => user.id !== id); 
       res.status(204).json(found);
    }else{
        res.status(404).json({message: "User not found"})
    }
    
})
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body;
    let found = users.filter(user => user.id === id);

    if(found){
        Object.assign(found, changes);
        res.status(200).json(found)
    } else {
        res.status(404).json({ message: "User not found"});
    }
    
    res.json(found);
})

const PORT = 5000; 
server.listen(PORT, () => {
    console.log('Server running on http://localhost:5000')
})
