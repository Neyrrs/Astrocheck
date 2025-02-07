import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    Username : {type: String, required: true},
    Password : {type: String, required: true}
})

const Account = mongoose.model('Account', accountSchema)
export default Account;