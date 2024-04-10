import {colorblender, extend} from "colorblender";
import mixExtension from 'colorblender/extensions/mix';
import nameExtension from 'colorblender/extensions/name';
import keywordExtension from 'colorblender/extensions/keyword';
import hwbExtension from 'colorblender/extensions/hwb';


import { paletten } from 'paletten';

extend([mixExtension, nameExtension, keywordExtension, hwbExtension]);

/**
 * Generate a colour palette of tones, based on a single colour.
 * eg. if you provide "red", the palette provides lighter and darker tones of red.
 * @date 4/10/2024 - 8:39:09 AM
 * @author BigfootDS
 *
 * @param baseColour A parse-able string of a colour value, such as #ff0000.
 * @returns string[] - Array of strings that are colour values.
 */
export function generateTones(baseColour, customColourName = ""){
	let colourName = customColourName.toLocaleLowerCase().replaceAll(' ','-') || colorblender(baseColour).name().toLocaleLowerCase().replaceAll(' ','-');
	let palettenOutput = paletten(baseColour);
	let colours = Object.keys(palettenOutput).map((key) => {
		return {
			level: key,
			hex: palettenOutput[key],
			name: `${colourName}-${key}`,
			baseColourName: colourName
		}
	})


	console.log(colours);
	return colours;
}