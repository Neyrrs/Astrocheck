import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    NISN : {type: nNumber, required: true},
    Password : {type: String, required: true}
})

const Account = mongoose.model('Account', accountSchema)
export default Account;