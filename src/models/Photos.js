const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true,'Photo title is required'],
        minLength: [2,'Name is too short'],
    },
    image: {
        type:String,
        required: [true,'Image is required'],
        match: [/((https?:\/\/)|(\/)|(..\/))(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?/,'Invalid image Url'],
    },
    age: {
        type: Number,
        required: [true,'Age is required'],
        minLength: [1,'Invalid age'],
        maxLength: [100,'Invalid age'],
    },
    description: {
        type:String,
        required: [true,'Description is required'],
        minLength: [5,'Invalid description'],
        maxLength: [50,'Invalid description'],
    },
    location: {
        type:String,
        required: [true,'Location is required'],
        minLength: [5,'Invalid location'],
        maxLength: [50,'Invalid location'],
    },
    commentList: [{
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        comment:String,
    }],
    owner:{
        type:mongoose.Types.ObjectId,
        ref:'User',
    }
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;