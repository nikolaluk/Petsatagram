const User = require('../models/User');

const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const {SECRET} = require('../config/constants');

const register = async(username,email, password, repeatPassword) => {

    if(password != repeatPassword){
        throw new Error('Password and repeat password must match!');
    }

    const allUsers = await User.find().lean();
    if (allUsers.filter(user => user.username === username).length > 0) {
        throw new Error('Username already taken!');
    }
    if(allUsers.filter(user => user.email === email).length > 0){
        throw new Error('Email already taken!');
    }

    const user = new User({username ,email , password});

    return user.save();
}

const login = async(username,password) => {
    if(!username){
        throw new Error('Username is required!');
    }

    if(!password){
        throw new Error('Password is required!');
    }

    const user = await User.findOne({username}).lean();

    if(!user){
        throw new Error('Username or password is incorrect!');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if(!isValid){
        throw new Error('Username or password is incorrect!');
    }

    const payload = {
        _id: user._id,
        username: user.username,
    }

    const token = await jwt.sign(payload, SECRET, { expiresIn: '2d' })

    return token;
}

exports.register = register;
exports.login = login;