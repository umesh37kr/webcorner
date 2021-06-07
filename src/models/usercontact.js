const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
    name:{
        type: 'string',
        required: true,
        minlength:3
    },
    email:{
        type: 'string',
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error("invalid email id");
            }
        }
    },
    phone:{
        type: Number,
        required: true,
        min:10
    },
    message:{
        type: 'string',
        required: true,
        minlength:3
    },
    date:{
        type: Date,
        default: Date.now
    }
})

// we need a collection
const ContactUs = mongoose.model('ContactUs',userSchema);

module.exports = ContactUs;