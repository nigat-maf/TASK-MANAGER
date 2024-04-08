import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function TodoList() {
	const { id } = useParams();
	const [todos, setTodos] = useState("");

	const [notification, setnotification] = useState({
		message: "",
		status: true,
	});
	function validation(msg, sta) {
		setnotification({ message: msg, status: sta });
		setTimeout(() => {
			setnotification({ message: "", status: true });
		}, 2000);
		return;
	}
	const pDOM = useRef();
	const inputDOM = useRef();
	const checkDOM = useRef();

	async function fetchSingleData() {
		try {
			const { data } = await axios.get(
				"https://task-manager-wb9g.onrender.com/task/" + id
			);
			console.log(data);
			if (!Array.isArray(data)) {
				validation("No task selected", false);
			}
			pDOM.current.textContent = data[0].id;
			inputDOM.current.value = data[0].task_name;
			checkDOM.current.checked = data[0].completed;
		} catch (error) {
			console.log(error);
			validation("something went wrong", false);
		}
	}

	async function updater() {
		try {
			await axios.patch("https://task-manager-wb9g.onrender.com/task/" + id, {
				task_name: inputDOM.current.value,
				completed: checkDOM.current.checked,
			});
			fetchSingleData();
			validation("Task edited successfully", true);
		} catch (error) {
			console.error(error);
			validation("something went wrong", false);
		}
	}
	useEffect(() => {
		fetchSingleData();
	}, []);
	return (
		<>
			<div className="container">
				<form className="single-task-form" onSubmit={updater}>
					<div
						className={`form-alert ${
							notification.status ? "alert-success" : "alert-danger"
						}`}
					>
						{notification.message}
					</div>
					<h4>Edit Task</h4>
					<div className="form-control">
						<label>Task ID</label>
						<p ref={pDOM} className="task-edit-id"></p>
					</div>
					<div className="form-control">
						<label>task_name</label>
						<input
							ref={inputDOM}
							type="text"
							name="task_name"
							className="task-edit-name"
						/>
					</div>
					<div className="form-control">
						<label>completed</label>
						<input
							ref={checkDOM}
							type="checkbox"
							name="completed"
							className="task-edit-completed"
						/>
					</div>
					<button type="submit" className="block btn task-edit-btn">
						edit
					</button>
				</form>
				<br />
				<button className="btn2">
					<Link to="/form" className="btnlink">
						back to tasks
					</Link>
				</button>
			</div>
		</>
	);
}
