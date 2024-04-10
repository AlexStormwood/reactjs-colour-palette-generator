# ReactJS Colour Palette Generator

Building up a free alternative to cool colour palette generator websites.

Generating convenient lists of colour values shouldn't cost you anything. That's silly.

## Deployed Website

Here: 

- https://reactjs-colour-palette-generator.netlify.app/


## Usage

This site is in active development, this documentation may be out of date.

Pick a colour using the colour picker input on the top of the screen.

You can optionally provide a colour name, and this will be used in the output of the palette generator.

When you're ready to see your palette, press "Generate palette".

When you've generated a palette, a new button will appear: "Export as CSS variables". 
Clicking this will show a code snippet that you can copy and use in your code.
The code snippet also provides a handy lil button to paste the generated code to your clipboard.



## Development

When making additional colour palette generators, keep in mind that the minimum output must be an array of objects.

Each object must have at least these keys:

```js
{
	hex: "#ff0000",
	name: "some descriptive name of the colour and where it sits in the palette, eg. red-500",
	baseColourName: "some descriptive name of the base colour of this palette, eg. red."
}
```

Any custom generators you'd like to implement should be implemented via this array of objects within the `App.js` file:

```js
import { generateTones } from './functions/paletteGenerators';
import { coolCustomGenerator } from "./whatever/File/You/Made/To/Store/Your/Generator";

const generatorList = [
  {
    id: "tones",
    name: "Colour Tones",
    generatorFunction: generateTones
  },
  {
    id: "tonesAlt",
    name: "Test Tones Please Ignore",
    generatorFunction: (baseColour, customColourName) => {
      console.log("Alternate option selected! Woo!");
      return generateTones(baseColour, customColourName);
    }
  },
  {
	id: "yourCustomGeneratorId",
	name: "Your Custom Generator Human-Readable Name",
	generatorFunction: coolCustomGenerator
  }
];
```