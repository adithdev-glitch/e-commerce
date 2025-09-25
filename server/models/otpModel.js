import mongoose from 'mongoose';
const otpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 30, 
    }
});
const otpModel = mongoose.model('otpModel', otpSchema);
export default otpModel;