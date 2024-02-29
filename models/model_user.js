const mongoose = require('mongoose')

/* User Schema */

const signin_singup = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true

    },
    email: {
        type: String,
        required: true,
        unique: true

    },

    password: {
        type: String,
        required: true
    },

    nowdate:{
        type: Date,
        default: Date.now
   
    }
});


// signin_singup.methods.comparePassword = function (password) {
//     return bcrypt.compareSync(password, this.hash_password);
// };

const signin_singup_data = mongoose.model('profiledata', signin_singup);
module.exports = signin_singup_data;
