const mongoose = require('mongoose')

/* User Schema */

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minLength: 8
    },
    contact: {
        type: Number,
        required: true,
        unique: true,
        maxLength: 10

    },

    message: {
        type: String,
        required: true
    }
});


const messagesend = mongoose.model('customerdata', UserSchema);

module.exports = messagesend;




// const signin_singup = new mongoose.Schema({
//     name: {
//         type: String,
//         trim: true,
//         required: true

//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true

//     },

//     hash_password: {
//         type: String
//     },
// });


// signin_singup.methods.comparePassword = function (password) {
//     return bcrypt.compareSync(password, this.hash_password);
// };



// const signin_singup_data = mongoose.model('profiledata', signin_singup);

// module.exports = signin_singup_data;


