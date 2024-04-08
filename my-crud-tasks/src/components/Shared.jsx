import React from 'react'
import Navebar from './Navebar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer';

export default function Shared() {
  return (
		<div>
			<Navebar />
			<Outlet />
			<Footer />
		</div>
	);
}
