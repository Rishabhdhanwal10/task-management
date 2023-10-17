const User = require("../models/user");
const bcrypt = require("bcrypt");

// User SignUp
module.exports.register = async (req, res) => {

    const { username, email, password, confirm_password } = req.body;

    if (!username || !email || !password || !confirm_password) {
        return res.status(422).json({ error: "Plz Filled The Field Properly" })
    }

    try {

        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "Email Already Exist" });
        } else if (password != confirm_password) {
            return res.status(422).json({ error: "Password are not matching" });
        } else {

            const user = new User({ username, email, password});

            await user.save();

            return res.status(201).json({ message: "User Registered Successfully" })

        }

    }

    catch (error) {
        console.log(error);
    }
}


// User SignIn
module.exports.signIn = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Plz Filled The Data" });
        }

        const userLogin = await User.findOne({ email: email });

        if (userLogin) {

            const isMatch = await bcrypt.compare(password, userLogin.password);

            if (isMatch) {

                const token = await userLogin.generateAuthToken();

                res.json({ message: "User Signin Successfully", jwtToken: token });

            } else {
                res.status(400).json({ message: "Invalid Credentials" });
            }

        } else {
            res.status(400).json({ message: "User Not Exist" });
        }

    } catch (error) {
        console.log(error)
    }

};


// User logout
module.exports.logout = (req, res) => {
    res.status(200).send({message: "User Logout"});
} 