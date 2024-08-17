const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const PORT = 5000;
const cors = require("cors")


app.use(cors({
    origin:['https://todo-shahzad.vercel.app','http://localhost:3000'],
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials:true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//db connection

const connection = async ()=>{
   try {
    const connect = await mongoose.connect('mongodb+srv://ahsanmureed00:ahsan@cluster0.yz3vc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('db connected');
    
   } catch (error) {
    
   }
    
}
connection();

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