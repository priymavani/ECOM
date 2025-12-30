const { error } = require("console");
const fs = require("fs");

exports.signup = (req, res) => {
  try {
    const { name, email, password } = req.body;

    
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    
    const data = fs.readFileSync("./users.json", "utf-8");
    const users = data ? JSON.parse(data) : [];

    
    const isUserExist = users.find(user => user.email === email);
    if (isUserExist) {
      return res.status(409).json({ message: "User already exists" });
    }

    
    const newUser = {
      id: Date.now(),
      name,
      email,
      password
    };

    
    users.push(newUser);
    fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));

    res.status(201).json({
      message: "Signup successful",
      user: { id: newUser.id, name, email }
    });

  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.login = (req, res) => {
  try {
    const { email, password } = req.body;

   
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    
    const data = fs.readFileSync("./users.json", "utf-8");
    const users = data ? JSON.parse(data) : [];

    
    const user = users.find( user => user.email === email && user.password === password );

    
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

   
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const fs = require("fs");

exports.forgotPassword = (req, res) => {
  try {
    const { email, newPassword } = req.body;

    
    if (!email || !newPassword) {
      return res.status(400).json({ message: "Missing Detail" });
    }

    
    const data = fs.readFileSync("./users.json", "utf8");
    const users = data ? JSON.parse(data) : [];

    
    const findUser = users.find(user => user.email === email);

    if (!findUser) {
      return res.status(404).json({ message: "User Not Found" });
    }

    
    findUser.password = newPassword;

    
    fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));

    res.status(200).json({ message: "Updated Successfully" });

  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};
