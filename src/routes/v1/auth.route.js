const { User } = require("../../models");
const router = require("express").Router();

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const newUserBody = { name, email, password }; 
    console.log('User', User);   
    try {
        const newUser = await User.create(newUserBody);
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user' });
    }
    
});

router.post('/login', (req, res) => {
    res.status(200).json({ message: 'Login endpoint hit successfully', users: [] });
});

module.exports = router;
