import React, { useEffect, useState } from "react";
// import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CustomForm() {
	const [tasks, setTasks] = useState([]);
	const [isLoading, setisLoading] = useState(false);
	const [addedTask, setaddedTask] = useState([]);
	const [notification, setnotification] = useState({
		message: "",
		status: true,
	});

	async function postTask(event) {
		event.preventDefault();
		try {
			if (!addedTask) {
				validation("name is required", false);
				return;
			}
			await axios.post("https://task-manager-wb9g.onrender.com/task/create", {
				task_name: addedTask,
			});
			setaddedTask("");
			fetchData();
			validation("task is added successfully", true);
		} catch (error) {
			console.log(error);
		}
	}
	async function fetchData() {
		try {
			// setisLoading(true);
			const { data } = await axios(
				"https://task-manager-wb9g.onrender.com/task"
			);
			console.log(data);
			setTasks(data);

			setisLoading(false);
		} catch (error) {
			console.log(error);
		}
	}
	function validation(msg, sta) {
		setnotification({ message: msg, status: sta });
		setTimeout(() => {
			setnotification({ message: "", status: true });
		}, 1000);
		return;
	}
	async function handleDelete(id) {
		try {
			const responde = await axios.delete(
				"https://task-manager-wb9g.onrender.com/task/" + id
			);
			console.log(responde.data);
			fetchData();
			validation("task is deleted successfully", true);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		fetchData();
	}, []);

	console.log(tasks);
	return (
		<>
			<form className="task-form " onSubmit={postTask}>
				<h4>task manager</h4>
				<div className="form-control">
					<input
						value={addedTask}
						type="text"
						name="name"
						className="task-input"
						placeholder="e.g. learn nodejs"
						onChange={(event) => {
							setaddedTask(event.target.value);
						}}
					/>
					<button type="submit" className="btn submit-btn ">
						Add
					</button>
				</div>

				<div
					className={`form-alert ${
						notification.status ? "alert-success" : "alert-danger"
					}`}
				>
					{notification.message}
				</div>
			</form>

			<section className="tasks-container">
				{isLoading ? (
					<p className=" loading"></p>
				) : (
					<div className="tasks">
						{tasks?.map((eachTask, i) => {
							let displayTasks = (
								<div className key={i}>
									<div
										className={`single-task ${
											eachTask.completed && "task-completed"
										}`}
									>
										<h5>
											<span>
												<i className="far fa-check-circle"></i>
											</span>
											{eachTask.task_name}
										</h5>

										<div className="task-links">
											{/* <!-- edit link --> */}
											<Link
												to={`/TodoList/${eachTask.id}`}
												className="edit-link"
											>
												<i className="fas fa-edit"></i>
											</Link>

											<button
												onClick={() => {
													handleDelete(eachTask.id);
												}}
												type="button"
												className="delete-btn"
											>
												<i className="fas fa-trash"></i>
											</button>
										</div>
									</div>
								</div>
							);

							return displayTasks;
						})}
					</div>
				)}
			</section>
		</>
	);
}
