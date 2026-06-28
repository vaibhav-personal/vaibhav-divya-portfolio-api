require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

mongoose.connect(
  process.env.MONGO_URI
);


async function createAdmin() {

  try {

    const hashedPassword =
      await bcrypt.hash(
        "Apache@2642",
        10
      );

    const admin =
      new Admin({

        name: "Vaibhav",

        email:
          "vaibhav.divya2202@gmail.com",

        password:
          hashedPassword,
      });

    await admin.save();

    console.log(
      "Admin Created"
    );

    process.exit();

  } catch (error) {

    console.log(error);

    process.exit();
  }
}


createAdmin();