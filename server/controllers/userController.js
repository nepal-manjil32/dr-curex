import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import transporter from '../config/nodemailer.js';
import userModel from '../models/userModel.js';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const getUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id, 'name email city stateAddress gender bloodGroup age');
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        if (user) {
            res.status(200).json({ success: true, userData: { _id: user._id, name: user.name, email: user.email, city:user.city, stateAddress:user.stateAddress, gender:user.gender, bloodGroup:user.bloodGroup, age:user.age } });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//Controller for student login
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist!" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Incorrect password!" })
        }

        //JWT token
        const token = createToken(user._id);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 60 * 60 * 1000, // 1 hour
        })

        //Sending welcome email
        // const mailOptions = {
        //     from: process.env.SENDER_EMAIL,
        //     to: email,
        //     subject: "Welcome to Trackify",
        //     text: "Thank you for registering with Trackify. We are glad to have you on board!",
        // };

        // await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: "User logged in successfully!", token })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

//Controller for student registration
const registerUser = async (req, res) => {
    try {

        const { name, age, gender, bloodGroup, city, stateAddress, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userExists = await userModel.findOne({ email });

        if (userExists) {
            return res.status(400).json({ success: false, message: "User already exists!" })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" })
        }
        if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
            return res.status(400).json({ success: false, message: "Please enter a strong password with at least 8 characters, 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol" })
        }

        const newUser = new userModel({
            name,
            age, 
            gender, 
            bloodGroup, 
            city, 
            stateAddress,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();

        const token = createToken(user._id);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 60 * 60 * 1000, // 1 hour
        })

        //Sending welcome email
        const mailOptions = {
            from: "nepalmanjil@gmail.com",
            to: email,
            subject: "Welcome to DrCureX – Your Health Companion",
            text: `
            
        Hi there,

        Thank you for signing up with DrCureX – your trusted AI-powered health assistant. We're excited to have you on board!

        With DrCureX, you can get intelligent insights, reliable health information, and 24/7 support – all tailored to your well-being.

        Stay healthy,
        The DrCureX Team`,
        };
        await transporter.sendMail(mailOptions);


        res.status(201).json({ success: true, message: "User registered successfully!", token })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

//Controller for user logout
const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })

        return res.status(200).json({ success: true, message: "User logged out successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

//Controller to verify email
// const verifyEmail = async (req, res) => {
//     const { userId, otp } = req.body;

//     if (!userId || !otp) {
//         return res.status(400).json({ success: false, message: "Please provide User ID and OTP" });
//     }
//     try {

//         const user = await userModel.findById(userId);
//         if (!user) {
//             return res.status(400).json({ success: false, message: "User does not exist!" });
//         }

//         if (user.isAccountVerified) {
//             return res.status(400).json({ success: false, message: "Account already verified!" });
//         }

//         if (user.verifyOtp === '' || user.verifyOtp !== otp) {
//             return res.status(400).json({ success: false, message: "Invalid OTP!" });
//         }

//         if (Date.now() > user.verifyOtpExpireAt) {
//             return res.status(400).json({ success: false, message: "OTP expired!" });
//         }

//         user.isAccountVerified = true;
//         user.verifyOtp = '';
//         user.verifyOtpExpireAt = 0;
//         await user.save();

//         const mailOption = {
//             from: process.env.SENDER_EMAIL,
//             to: user.email,
//             subject: "Account Verified",
//             text: `Your account has been verified successfully!`
//         }

//         await transporter.sendMail(mailOption);

//         res.status(200).json({ success: true, message: "Account verified successfully!" });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// }

//Connection to check if user is authenticated or not
// const isAuthenticated = async (req, res) => {
//     try {
//         return res.status(200).json({ success: true, message: "User is authenticated!" });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// }

export {getUser, loginUser, registerUser, logout };