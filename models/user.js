var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var roles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not a valid role'
}

var userSchema = new Schema({
    name: { type: String, required: [true, 'The name is required'] },
    email: { type: String, unique: true, required: [true, 'The eamil is required'] },
    password: { type: String, required: [true, 'The pass is required'] },
    img: { type: String, required: false },
    role: { type: String, required: true, default: 'USER_ROLE', enum: roles },
});

userSchema.plugin(uniqueValidator, { message: '{PATH} should be unique' });
module.exports = mongoose.model('User', userSchema);