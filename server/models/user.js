import mongoose, { Schema } from 'mongoose'

const userSchema = Schema({
	
    name: {
        type: String, unique: true, required: true 
    },
    password: {
        type: String, required: true
    },
    email: {
        type: String, unique: true, required: true
    },
    admin: {
        type: Boolean, required: true
    }
	
})

export default mongoose.model('User', userSchema)