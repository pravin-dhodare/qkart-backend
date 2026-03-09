const router = require("express").Router();
const { User } = require("../../models");

router.get('/all', async(req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

router.get('/:email', async(req, res) => {
    const { email } = req.params;
    try {
        const user = await User.findOne({ email });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

// Test - Fetch user by email or id - /users {id: 1} or /users {email: "abc@d.com}
router.get('/', async(req, res) => {
    const { email, id } = req.query;
    if (id) {
        try {
            const user = await User.findById(id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch user' });
        }
        return;
    }
    try {
        const user = await User.findOne({ email });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

module.exports = router;
