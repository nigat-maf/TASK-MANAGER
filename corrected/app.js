const express = require("express");
require("dotenv").config();
const app = express();
const mysql = require("mysql");
const cors = require("cors");
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
	password: process.env.DB_PASS,
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
});

connection.connect((err) => {
	if (err) {
		console.log(err.message);
	} else {
		console.log("connection established");
	}
});

// middleware
app.use(express.json());
app.use(cors());

app.get("/creat", (req, res) => {
	const taskTable = `  CREATE TABLE Task (
	id INT NOT NULL AUTO_INCREMENT,
	task_name VARCHAR(255),
	completed BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
)  `;
	connection.query(taskTable, (err, results, fields) => {
		if (err) {
			res.send(err.message);
		} else {
			res.send("table created");
		}
	});
});

// create task
app.post("/task/create", (req, res) => {
	const name = req.body.task_name;

	if (!name) {
		return res.send("Name is required!");
	}
	const createTask = `INSERT INTO Task (task_name) VALUES ('${name}')`;
	connection.query(createTask, (err, result) => {
		if (err) {
			return res.send(err.message);
		} else {
			return res.send("Task created");
		}
	});
});

// real all tasks
app.get("/task", (req, res) => {
	const readAllTasks = `SELECT * FROM Task ORDER BY id DESC`;

	connection.query(readAllTasks, (err, result) => {
		if (err) {
			return res.send(err.message);
		} else {
			return res.json(result);
		}
	});
});

// read single task
app.get("/task/:id", (req, res) => {
	const id = req.params.id;

	const readTask = `SELECT * FROM Task WHERE id = '${id}'`;

	connection.query(readTask, (err, result) => {
		if (err) {
			return res.send(err.message);
		} else if (result.length == 0) {
			return res.send(`No task with id ${id}`);
		} else {
			return res.json(result);
		}
	});
});

// update single task
app.patch("/task/:id", (req, res) => {
	const id = req.params.id;
	const name = req.body.task_name;
	let completed = req.body.completed;

	if (!name) {
		return res.send("Name is required!");
	}

	if (completed) {
		completed = 1;
	} else {
		completed = 0;
	}

	const updateTask = ` UPDATE Task
	SET task_name = "${name}",
		completed = ${completed}
		WHERE id=${id} `;

	connection.query(updateTask, (err, result) => {
		if (err) {
			return res.send(err.message);
		} else if (result.affectedRows == 0) {
			return res.send(`No task with id ${id}`);
		} else {
			return res.send("Task updated ");
		}
	});
});

// Delete single task
app.delete("/task/:id", (req, res) => {
	const id = req.params.id;

	const deleteTask = `DELETE FROM Task WHERE id = ${id} `;

	connection.query(deleteTask, (err, result) => {
		if (err) {
			return res.send(err.message);
		} else if (result.affectedRows == 0) {
			return res.send(`No task with id ${id}`);
		} else {
			return res.send("Task deleted");
		}
	});
});

app.listen(3000, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log("app listening on port 3000...");
	}
});
