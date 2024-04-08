import React from "react";
import { Link } from "react-router-dom";

export default function Navebar() {
	return (
		<>
			
				<header className="container1">
					<div>
						<img src="../../images/c3.png" alt="" />
					</div>
					<nav className="navbar">
						
						<div className="inner-container ">
							<Link className="navbar-brand" to="/">
								Home
							</Link>
						</div>
						<div className="inner-container ">
							<Link className="navbar-brand" to="/form">
								form
							</Link>
						</div>
						<div className=" inner-container">
							<Link className="navbar-brand" to="/TodoList">
								TodoList
							</Link>
						</div>
					</nav>
				</header>
		
			
			
		</>
	);
}
