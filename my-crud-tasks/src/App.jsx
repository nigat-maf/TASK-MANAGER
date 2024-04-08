import React from "react";
import "./css/main.css";
import CustomForm from "./components/CustomForm";
import { Route, Routes } from "react-router-dom";
import TodoList from "./components/TodoList";
import Shared from "./components/Shared";
import Home from "./components/Home";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Shared />}>
				<Route path="/form" element={<CustomForm />} />
				<Route path="/" element={<Home />} />
				<Route path="/TodoList/" element={<TodoList />} />
				<Route path="/TodoList/:id" element={<TodoList />} />
			</Route>
		</Routes>
	);
}

export default App;
