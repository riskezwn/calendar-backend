const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CON);
    console.log("db online");
  } catch (error) {
    console.log(error);
    throw new Error("Error in db");
  }
};

module.exports = {
  dbConnection,
};
