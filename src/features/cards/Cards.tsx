import {CardsList} from "./cardsList/CardsList";
import {HeaderCards} from "./header/HeaderCards";
import React from "react";
import {BackToPacksList} from "../../common/components/backToPacksList/BackToPacksList";

export const Cards = () => {
		return (
				<div className={'container pading-vertical'}>
						<BackToPacksList/>
						<HeaderCards/>
						<CardsList/>
				</div>
		)
}