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
    const newUser = req.body; // needs express.json middleware

    newUser.id = shortid.generate();
    users.push(newUser);
    res.json(newUser);
})
server.get('/api/users', (req, res) => {
    res.json(users);
})
server.get('/api/users/:id', (req, res) => {
    res.json(users)
})
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id
    const deleted = users.find(user => user.id === id);
    
    users.filter(user => user.id !== id);
    res.json(deleted);
    
})
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body;
    const index = users.findIndex(user => user.id === id);

    if(index !== -1){

    } else {
        res.status(404).json({ message: "User not found"});
    }
    
    users.filter(user => user.id !== id);
    res.json(deleted);
})

const PORT = 5000; 
server.listen(PORT, () => {
    console.log('Server running on http://localhost:5000')
})
