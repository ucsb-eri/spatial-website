require('dotenv').config()
const AdminProfile = require("../models/AdminProfile")
// const bcrypt = require("bcrypt")

const adminEmail = process.env.ADMIN_EMAIL
const adminPassword = process.env.ADMIN_PASSWORD

async function createAdminAccount() {
    try {
        const adminExists = await AdminProfile.findOne({ email: adminEmail})
        if (!adminExists) {
            const admin = await AdminProfile.create({
                email: adminEmail,
                password: adminPassword
            })
            console.log("new admin in town", admin)
        } else {
            console.log("admin account exists")
        }
       
    } catch (err) {
        console.error("Error creating admin account: ", err)
    }
}

module.exports = createAdminAccount;