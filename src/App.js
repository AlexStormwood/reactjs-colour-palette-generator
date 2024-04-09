import { useEffect, useState } from 'react';
import './styles/App.css';
import { ColourCard } from './components/ColourCard';

import {colorblender, extend} from "colorblender";
import mixExtension from 'colorblender/extensions/mix';
import nameExtension from 'colorblender/extensions/name';
import keywordExtension from 'colorblender/extensions/keyword';

extend([mixExtension, nameExtension, keywordExtension]);


function App() {

  let [baseColour, setBaseColour] = useState("#ff0000");
  let [baseColourName, setBaseColourName] = useState("");
  let [colourPalette, setColourPalette] = useState([]);
  let [colourCards, setColourCards] = useState([]);

  const createColourPalette = () => {
    let newPalette = colorblender(baseColour).tones(10).map((newColour) => {return newColour.hex()});
    setBaseColourName(colorblender(newPalette[0]).name());
    setColourPalette(newPalette);
  }

  useEffect(() => {
    let newColourCards = colourPalette.map((hexColour, index) => {
      return <ColourCard colourValue={hexColour} colourName={(baseColourName + "-" + (index + 1) + "00").replaceAll(' ', '-')} />
    });

    setColourCards(newColourCards);
  }, [colourPalette, baseColourName]);

  return (
    <div className="App">
      <section className='baseColourPicker'>
        <label htmlFor="baseColor" >
          Choose a colour:
        </label>
        <input 
          type='color' 
          id="baseColor" 
          name="baseColor" 
          value={baseColour} 
          onChange={(event) => {
            setBaseColour(event.target.value);
          }} 
        />
        <button onClick={createColourPalette} >
          Generate palette
        </button>
      </section>
      <section className='colourCardContainer'>
          {colourCards}
      </section>
      
    </div>
  );
}

export default App;
