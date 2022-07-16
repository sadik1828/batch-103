const User = require("../Models/userModel");
const bcrypt = require("bcrypt");

exports.singUp = async (req, res) => {
    try {

        // SIGNUP
        // 1. check email exists
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ message: "email already exist" }).
                res.status(200).json({ message: "success" });
        }
        // 2. password === confirm password

        if (req.body.password != req.body.confirmPassword) {
            return res.status(400).json({ message: "password does not match" });
        }
        // 3. password.length >7
        if (req.body.password.length < 7) {
            return res.status(400).json({ message: "password less than seven" });
        }
        // 4. encrypt password
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        req.body.password = hashedPassword;
        await User.create(req.body);

        res.status(200).json({ message: "user is created" });

    } catch (e) {
        res.status(400).json({ message: "error" });
    }

}


exports.login = async (req, res) => {

    try {
        // 1. email exist
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).json({ message: "email or password is incorrect" });
        }
        // 2. password correct
        const compare = await bcrypt.compare(req.body.password, user.password);
        if (compare == false) {
            return res.status(400).json({ message: "email or password is incorrect" });
        }

        //3. loggin
        res.status(200).json({ message: "loggin success" });

    } catch (error) {
        res.status(400).json({ message: "error occured" });
    }

}



exports.changePassword = async (req, res) => {
    try {
        //1. find the user from DB
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(200).json({ message: "user if found" });
        }

        //2. oldpassword === hashed password inside db

        const compare = await bcrypt.compare(req.body.oldPassword, user.password);
        if (compare == false) {
            return res.status(400).json({ message: "oldpassword match hash password" });
        }


        //3. newPassword > 7 characters
      
        if (req.body.newPassword.length < 7) {
            return res.status(400).json({ message: "your password is less than seven" });
        }
        //4. newPassword == oldpassword

        const newcompare = await bcrypt.compare(req.body.newPassword, user.password);
        if (compare == true) {
            return res.status(400).json({ message: "oldpassword match hash password" });
        }


        //5. newPassword !== confirm password  
        if (req.body.newPassword !== req.body.confirmPassword) {
            return res.status(200).json({ message: "newpass and confirm pass does not matches" });
        }

        const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
        await User.findOneAndUpdate({email: req.body.email}, {password:hashedPassword});

        res.status(200).json({message: "Password Changed"});
    } catch (error) {
        res.status(400).json({ message: "error occured" });
    }

}

