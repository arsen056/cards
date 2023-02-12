type TitleCardsPropsType = {
		title: string
}

export const TitleCards = ({title}: TitleCardsPropsType) => {
		return (
				<div>
						<h1>{title}</h1>
				</div>
		)
}