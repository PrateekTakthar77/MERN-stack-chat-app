const User = require('../models/User')
const { generateJwtToken } = require("../helpers/JWT.Verify");
const jwt = require('jsonwebtoken');

const registerUser = asyncHandler(async (req, res) => {
    try {
        const { error } = registerUserSchema.validate(req.body);

        if (error) {
            console.error(error);
            return res.status(400).json({
                payload: null,
                message:
                    error.details[0].message || "An error occurred during validation",
            });
        }


        const { username, password, role } = req.body;
        const userExistsWithUsername = await User.findOne({ username });
        if (userExistsWithUsername) {
            return res.status(409).json({
                payload: null,
                message: "Username already Exists.",
            });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD,
            },
        });

        const mailOptions = {
            from: {
                name: 'Jewellery Bliss',
                address: process.env.USER
            }, // sender address
            to: email, // list of receivers
            subject: "Welcome to jewellery Bliss", // Subject line
            text: "Welcome to jewellery Bliss your Registration has been sucessfull, enjoy your time on our APP", // plain text body
            // html: "<b>Hello world?</b>", // html body
        };

        const sendMail = async (transporter, mailOptions) => {
            try {
                await transporter.sendMail(mailOptions)
                console.log("Mail Sent succesfully")
            } catch (error) {
                console.log(error);
            }
        }

        sendMail(transporter, mailOptions)
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            password: hashedPassword,
            role,
            userCount: ((await User.find({}))?.length ?? 0) + 1,
        });

        const payload = {
            username: newUser.username,
            userCount: newUser.userCount,
        };
        const token = generateJwtToken(payload);
        return res.cookie('tokken', token).status(201).json({
            message: "User created successfully",
            payload,
            userId: newUser.id,
            token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            payload: null,
            message: error.message || "An error occurred",
        });
    }
});

module.exports = registerUser;
