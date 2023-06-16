const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength: [2,'Username too short'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        minLength: [10,'Invalid email'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [4,'Password too short'],
    },
});

userSchema.pre('save', async function(){
    const hash = await bcrypt.hash(this.password,10);

    this.password = hash;
})

const User = mongoose.model('User', userSchema);

module.exports = User;