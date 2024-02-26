import {model, models, Schema} from "mongoose";

const UserSchema = new Schema({
  name: {type: String},
  email: {type: String, required: true, unique: true},
  password: {type: String},
  phone: {type: String},
  department: {type: String},
  sem: {type: String},
  college: {type: String},
  prn: {type: String},
}); {timestamps: true}

UserSchema.post('validate', function (user) {
    
})

export const User = models?.User || model('User', UserSchema);