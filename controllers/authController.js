const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
exports.register = async (req, res) => {
    try {
        const { full_name, email, password, role } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await db.query(
            "INSERT INTO users(full_name,email,password,role) VALUES($1,$2,$3,$4) RETURNING *",
            [full_name, email, hashedPassword, role]
        );

        res.json({
            message: "User Registered Successfully",
            user: result.rows[0]
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


// Login User
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await db.query(
            "SELECT * FROM users WHERE email=$1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }

        const user = result.rows[0];

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            "hospital_secret_key",
            {
                expiresIn: "1d"
            }
        );

        res.json({
            message: "Login Successful",
            token,
user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role
    }


        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
