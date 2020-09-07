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
    if(!newUser.name || !newUser.bio){
        res.status(40).json({errorMessage: "please include name and bio"})
    }else{
        newUser.id = shortid.generate();
        users.push(newUser);
        res.json(users)
        .then(worked => {
            res.status(201)
        })
        .catch(error =>{
            res.status(500).json({errorMessage: "There was an error while saving the user to the database."})
        })
    }

})

server.get('/api/users', (req, res) => {
    res.json(users)
    .then(users => {
        res.status(200);
    })
    .catch(error => {
        res.status(500).json({
            errorMessage: "The users information could not be retrieved."
        });
    });
});

server.get('/api/users/:id', (req, res) => {
    id = req.params.id
    let found = users.filter(user => user.id === id)
    
    if(found.length === 1) {
        res.status(200).json(found)
        .then(user => {
            
        })
        .catch(error => {
            res.status(500).json({errorMessage: "The information could not be retrieved"})
        })
    } else {
        res.status(404).json({errorMessage: 'User not found'})
    }
    })
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id
    const deleted = users.filter(user => user.id === id);
    let found = users.filter(user => user.id === id)
    if(found.length === 1){

       res.status(200).json(users.filter(user => user.id !== id))

       .then(
       )
       .catch(error => {
           res.status(500).json({errorMessage: "The user could not be removed."})
       })
    }else{
        res.status(404).json({message: "User not found"})
        res.json(found)
    }
    
})
// server.put('/api/users/:id', (req, res) => {
//     const id = req.params.id
//     const changes = req.body;
//     let found = users.filter(user => user.id === id);

//     if(found){
//         Object.assign(found, changes);
//         res.status(200).json(found)
//     } else {
//         res.status(404).json({ message: "User not found"});
//     }
    
//     res.json(found);
// })

server.put('/api/users/:id', (req, res) => {
    id = req.params.id
    const updateUser = req.body
    let found = users.filter(user => user.id === id)
    const changes = req.body

    if(!updateUser.name || !updateUser.bio){
        res.status(400).json({errorMessage: "please include name and bio"})
    } else if(found.length !== 1){
        res.status(404).json({errorMessage: "The user with the specified ID does not exist."})
    }else {
        Object.assign(found, changes);
        res.json(users)
        .then(worked => {
            res.status(200)
        })
        .catch(error => {
            res.status(500).json({errorMessage: "The user information could not be modified."})
        })
    }
    
})

const PORT = 5000; 
server.listen(PORT, () => {
    console.log('Server running on http://localhost:5000')
})
