const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const PORT = 5000;
const cors = require("cors")


app.use(cors({
    origin:'https://todo-shahzad.vercel.app'
}));

app.use(express.json());
//db connection

mongoose.connect('mongodb://127.0.0.1:27017/mearnstack_crud').then(() => {
    console.log("db connection successfully")
}).catch((error) => {
    console.log(error)
});


//user Sehema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true }
);


const User = mongoose.model("User", userSchema)

// Create User

app.post("/createuser", async (req, res) => {
    try {
        const bodyData = req.body;
        const user = new User(bodyData);
        const userData = await user.save();
        res.send(userData);
    } catch (error) {
        res.send(error);
    }
});

//read all users

app.get("/readalluser", async (req, res) => {
    try {
        const userData = await User.find({});
        res.send(userData)
    } catch (error) {
        res.send(error);
    }
});


app.get("/read/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user =await User.findById({ _id: id });
        res.send(user);
    } catch (error) {
        res.send(error);
    }
});

//User Update

app.put("/updateuser/:id", async(req,res) => {
   try {
    const id = req.params.id;
    const user =await User.findByIdAndUpdate({_id: id},req.body,{new:true});
    res.send(user); 
   } catch (error) {
    res.send(error)
   } 
});

// delete user

app.delete("/delete/:id", async(req,res)=>{
try {
    const id = req.params.id;
    const user=await User.findByIdAndDelete({_id: id});
    res.send(error);
} catch (error) {
    res.send(error);
}
});

app.listen(PORT, () => {
    console.log(`server is running is on ${PORT}`);
});