import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    profileImage: {
        type: String,
        default: ""
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    additionalFields: {
        type: Map,
        of: String,
        default: {}
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
