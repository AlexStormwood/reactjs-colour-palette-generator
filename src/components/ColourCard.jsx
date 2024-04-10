
export const ColourCard = (props) => {



	return (
		<section className="colourCard" style={{backgroundColor: props.colourValue}}>
			<h1>{props.colourName}</h1>
			<p>{props.colourValue}</p>
			<p>{props.isBaseColour ? "BASE COLOUR" : ""}</p>
		</section>
	)

}