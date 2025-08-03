const jwt = require("jsonwebtoken");

const generateToken = (id, res)=>{
    // ✅ Create JWT token
        const token = jwt.sign(
            { userIdentity: id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: 'Strict', // ✅ Must be a valid string: 'Strict' | 'Lax' | 'None'
            maxAge: 30 * 24 * 60 * 60 * 1000, // ✅ Corrected duration (30 days)
        });
}

module.exports = generateToken