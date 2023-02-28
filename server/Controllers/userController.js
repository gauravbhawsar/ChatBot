const User = require("../Schemas/User_Schema");
const generateToken = require("../Config/generateToken");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const registerUser = async (req, res) => {
  console.log("agya");
  const { firstName, lastName, gender, address, email, password, mobileNo } =
    req.body;
  console.log(req.body);
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
  }
  let hpassword = bcrypt.hashSync(password, saltRounds);
  const user = await User.create({
    firstName,
    lastName,
    gender,
    address,
    email,
    password: hpassword,
    mobileNo,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      email: user.email,
    });
  } else {
    res.status(400);
  }
};
const authUser = async (req, res) => {
  let hashbcrypt = false;

  const { email, password } = req.body;

  await User.findOne({ email }, (err, data) => {
    if (err) {
      res.json({ error: "1", msg: "user not found" });
    } else {
      hashbcrypt = bcrypt.compareSync(password, data.password);
      if (hashbcrypt) {
        res.json({
          token: generateToken(data),
        });
      } else {
        res.json({ error: "incorect password" });
      }
    }
  });
};
module.exports = { registerUser, authUser };
