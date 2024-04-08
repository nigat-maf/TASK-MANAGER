import React from "react";
import { Link } from "react-router-dom";

function Home() {
	return (
		<div className="text-center wrapper">
			<h3>WELCOME TO TASK MANAGER</h3>
			<p className="text-center col-lg-8 mx-auto ">
				Welcome to my versatile web application designed for seamless CRUD
				operations! Built with React, Node.js, and Express, this dynamic
				platform empowers users to effortlessly Create, Read, Update, and Delete
				data from MySQL databases. Featuring intuitive routes and user-friendly
				interfaces, this application streamlines data management tasks, offering
				a hassle-free experience for developers and users alike. Explore the
				power of efficient data handling with this innovative solution today!
			</p>
			<button className="btn1">
				<Link className="btnLink" to="/form">click here to start</Link>
			</button>
		</div>
	);
}

export default Home;
