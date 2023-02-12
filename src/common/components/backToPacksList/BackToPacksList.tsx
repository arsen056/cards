import s from './BackToPacksList.module.css'
import {Link} from "react-router-dom";
import React from "react";

export const BackToPacksList = () => {
  return (
			<Link to={'/packs'}>
					<button className={s.back}>Back to Packs List</button>
			</Link>
	)
}