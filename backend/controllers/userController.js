const User = require('../models/userModel');
const asyncHandler = require('../middleware/asyncHandler');
const generateToken = require('../utils/generateToken')
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && await user.matchPassword(password)) {

        generateToken(user._id, res)

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

const logoutUser = (req, res) => {
    res.cookie('jwt', '',
        {
            httpOnly: true,
            expires: new Date(0)

        }
    )

    res.status(200).send("Logged out successfully")

}

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    } else {
        const user = await User.create({ name, email, password })

        if (user) {
            generateToken(user._id, res)
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            })
        } else {
            res.status(400)
            throw new Error('Invalid user data')
        }
    }
}

)

const getUserProfile = asyncHandler(async (req, res) => {

    res.status(200).json({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        isAdmin: req.user.isAdmin
    })
})

const updateUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)

    if (user) {

        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }

})
module.exports = { authUser, getUserProfile, logoutUser, registerUser, updateUserProfile };
