import mongoose from "mongoose";
import uuidv4 from "uuid";
const { createHmac } = await import('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastname: {
        type: String,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    userinfo: {
        type: String,
        trim: true
    },
    encrypted_password: {
        type: String,
        required: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    purchases: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
});

//Schema Virtuals
userSchema.virtual("password")
    .set(function (password) {
        this._password = password;           //underscore is used to declare a private variable
        this.salt = uuidv4();
        this.encrypted_password = this.securePassword(password);
    })
    .get(function () {
        return this._password;
    })

//Schema Methods
userSchema.methods = {
    authenticate: function (plainPassword) {
        return this.securePassword(plainPassword) === this.encrypted_password;
    },
    securePassword: function (plainPassword) {
        if (!plainPassword) return "";
        try {
            return createHmac('sha256', this.salt)
                .update(plainPassword)
                .digest('hex');
        }
        catch (err) {
            return "";
        }
    }
}

export default mongoose.model("User", userSchema);