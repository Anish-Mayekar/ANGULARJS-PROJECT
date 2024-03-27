const express = require('express'); 
// const hello = require('S:/Code/expressjs/CRUD/templates/hello.html')
const app = express(); 
const PORT = 3002; 
const path = require('path');
const mongoose = require("mongoose")
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));





mongoose
.connect('mongodb://127.0.0.1:27017/Task_manage')
.then(()=> console.log("Mongo connected"))
.catch((err)=> console.log("Mongo not connected"));



const user_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true 
    },
    age: {
        type: Number,
        required: true
    },
    developerRole: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('admin', user_schema);



const task_schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
   assigned_by: {
        type: String,
        required: true,
    },    
    emp_name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    desp: {
        type: String,
        required: true
    }    
});

const Task = mongoose.model('task', task_schema);


const employee_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true 
    },
    age: {
        type: Number,
        required: true
    },
    developerRole: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const Emp = mongoose.model('employee', employee_schema);


app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.get('/', (req, res)=>{ 
	res.render('welcome')
}); 

app.get('/admin_login', (req, res)=>{ 
	res.render('admin-login')
}); 

app.get('/employee_login', (req, res)=>{ 
	res.render('employee-login')
}); 

app.get('/admin/:name', async(req, res)=>{ 
    const employees = await Emp.find()
    const tasks = await Task.find({['assigned_by']:req.params.name})
    const userData = {
        username: req.params.name
    };
	res.render('admin',{userData,'employees':employees})
}); 

app.get('/employee/:name', async (req, res)=>{ 
    //console.log(req.params)
    const employees = await Task.find({['emp_name']:req.params.name})
    console.log(req.params.name)
    const userData = {
        username: req.params.name
    };
	res.render('employee',{userData,'employees':employees})
}); 


app.post('/send_data', async (req, res) => {
    try {
        // Create a new user instance from form data
        const newUser = new User({
            name: req.body.user_name,
            age: req.body.age,
            developerRole: req.body.dev_role,
            password: req.body.password
        });
        console.log(newUser)

        // Save the new user to the database
        await newUser.save();

        // Respond with success message
        
        res.json({ message: 'User created successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
	
});

app.post('/add_task', async (req, res) => {
    try {
        //const user_name= req.params.user_name;
        //onsole.log(req)
        // Create a new user instance from form data
        console.log(req)
        const newTask = new Task({
            title: req.body.task_title,
            assigned_by:req.body.user_name,
            emp_name: req.body.emp_name,
            role: req.body.role,
            status: req.body.status,
            desp: req.body.task_desp,
            
        });
        

        // Save the new user to the database
        await newTask.save();

        // Respond with success message
        
        res.json({ message: 'Task created successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
	
});





app.get('/get_data', async (req, res) => {
    try {
        const users = await testing_1.find({['firstName']:req.query.name})

        // Respond with success message
        res.status(200).json(users);
    } catch (error) {
        // Handle errors
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
	
});


// app.post('/update_data/:name', async (req, res) => {
//     try {
// 		const filter = { firstName: req.body.name }; // Filter criteria
//         const update = { $set: { age: req.body.age } }; // Update data

//         // Update the document based on the specified filter and update
//         const updatedDoc = await testing_1.findOneAndUpdate(
//             filter,
//             update,
//             { new: true } // Options: return updated document
//         );

//         // Respond with success message
//         res.status(200).json(updatedDoc);
//     } catch (error) {
//         // Handle errors
//         console.log(error)
//     }
	
// });

//for authentication
// Your login route handler
app.post('/admin_login', async (req, res) => {
    const user_name= req.body.user_name;
    const password= req.body.password;
    try {
      // Find user by username
      const user = await User.findOne({name:user_name});
  
      if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
  
      // Compare the password directly
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
  
      // Authentication successful
      return res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.post('/employee_login', async (req, res) => {
    const user_name= req.body.user_name;
    const password= req.body.password;
    try {
      // Find user by username
      const user = await Emp.findOne({name:user_name});
  
      if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
  
      // Compare the password directly
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
  
      // Authentication successful
      return res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });



app.put('/update_data/:name', async (req, res) => {
    try {
        const name = req.params.name;
        const newAge = req.body.age;

        // Update the document based on the provided name
        const updatedDoc = await testing_1.findOneAndUpdate(
            { firstName: name },
            { age: newAge },
            { new: true }
        );

        // Check if the document exists
        if (!updatedDoc) {
            return res.status(404).json({ error: 'Document not found' });
        }

        // Respond with success message
        res.status(200).json({ message: 'Document updated successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.delete('/task_done', async (req, res) => {
    console.log('hi')
    try {
        const title = req.body.title;
        const assigned_by = req.body.assigned_by;
        const emp_name = req.body.emp_name;
        const role = req.body.role;
        const status = req.body.status;
        const desp = req.body.desp;

        // Delete the document based on the provided name
        const deletedDoc = await Task.findOneAndDelete({ title:title, 
        assigned_by:assigned_by,
    emp_name: emp_name,
        role: role,
        status:status,
        desp: desp,
});

        // Check if the document exists
        if (!deletedDoc) {
            return res.status(404).json({ error: 'Document not found' });
        }

        // Respond with success message
        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});











app.listen(PORT, (error) =>{ 
	if(!error) 
		console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
	else
		console.log("Error occurred, server can't start", error); 
	} 
); 
