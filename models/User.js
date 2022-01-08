const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')


const UserSchema = new mongoose.Schema({
    name:{type:String,require:[true,'please provide name'],minlength:3,maxlength:50},
    email:{type:String,require:[true,'please provide email'],match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'please provide valid email'],unique:true},
    password:{type:String,require:[true,'please provide password']},

})

UserSchema.pre('save',async function(next){ // it will run before inserting to db
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})


UserSchema.methods.getName = function() {  // we can also define methods here so that we can access user.getName()
    return this.name
}

UserSchema.methods.createJWT = function(){
    return jwt.sign( 
            {userId:this._id,name:this.name},
            process.env.SECRET_KEY,
            {expiresIn:process.env.JWT_LIFETIME}
        )

}

UserSchema.methods.comparePassword = async function(myPassword) {
    const isMatch = await bcrypt.compare(myPassword,this.password)
    return isMatch

}

module.exports = mongoose.model("User",UserSchema)