const User = require('../models/userModel'); // ✅ Correct model
const asyncHandler = require('../middleware/asyncHandler');

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && await user.matchPassword(password)) { // ✅ Instance method
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

module.exports = { authUser };
