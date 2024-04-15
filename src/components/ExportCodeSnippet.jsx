import SyntaxHighlighter from 'react-syntax-highlighter';


export const ExportCodeSnippet = (props) => {



	const codeStringBuilder = () => {
		let codeAsString = "";
		codeAsString += `:root {\n`;
		props.palette.forEach(colourObj => {
			codeAsString += `\t--${colourObj.name}: ${colourObj.hex};\n`;
		});
		codeAsString += "}";
		return codeAsString;
	}

	return(
		<section id="exportCodeSnippet">

			<SyntaxHighlighter language="css">
				{codeStringBuilder()}
			</SyntaxHighlighter>
			<button onClick={() => {
				navigator.clipboard.writeText(codeStringBuilder());
			}}>
				Copy code to clipboard
			</button>
		</section>
	)
}
