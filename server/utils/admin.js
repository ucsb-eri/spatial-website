require('dotenv').config()
const AdminProfile = require("../models/AdminProfile")
// const bcrypt = require("bcrypt")

const adminEmail = process.env.ADMIN_EMAIL
const adminPassword = process.env.ADMIN_PASSWORD

async function createAdminAccount() {
    try {
        if (!adminEmail || !adminPassword) {
            console.log("Admin credentials not configured - skipping admin creation")
            return
        }
        
        const adminExists = await AdminProfile.findOne({ email: adminEmail })
        if (!adminExists) {
            const admin = await AdminProfile.create({
                email: adminEmail,
                password: adminPassword
            })
            console.log("✓ Admin account created:", adminEmail)
        } else {
            console.log("✓ Admin account already exists")
        }
       
    } catch (err) {
        // Only log if it's not a duplicate key error (admin already exists)
        if (err.code !== 11000) {
            console.error("Error creating admin account:", err.message)
        } else {
            console.log("✓ Admin account already exists")
        }
    }
}

module.exports = createAdminAccount;