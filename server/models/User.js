const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            Unique: true
        }
    },
    {
        timestamps: true,
    }

)

const User = mongoose.model('User', UserSchema);
module.exports = User; 