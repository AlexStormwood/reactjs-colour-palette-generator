import { useEffect, useState } from 'react';
import './styles/App.css';
import { ColourCard } from './components/ColourCard';

import {colorblender, extend} from "colorblender";
import mixExtension from 'colorblender/extensions/mix';
import nameExtension from 'colorblender/extensions/name';
import keywordExtension from 'colorblender/extensions/keyword';


import { generateTones } from './functions/paletteGenerators';

import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import { ExportCodeSnippet } from './components/ExportCodeSnippet';

extend([mixExtension, nameExtension, keywordExtension]);

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
  }
]

function App() {

  let [baseColour, setBaseColour] = useState("#ff0000");
  let [baseColourName, setBaseColourName] = useState("");
  let [customColourName, setCustomColourName] = useState("");
  let [colourPalette, setColourPalette] = useState([]);
  let [colourCards, setColourCards] = useState([]);
  let [selectedPaletteMode, setSelectedPaletteMode] = useState("tones");

  const [modal, setModal] = useState(false);


  const createColourPalette = (paletteModeId = "tones") => {
    let newPalette = generatorList.find((generator) => generator.id === paletteModeId).generatorFunction(baseColour, customColourName);

    setBaseColourName(colorblender(newPalette[0]).baseColourNamename);
    setColourPalette(newPalette);
  }

  useEffect(() => {
    let newColourCards = colourPalette.map((colourObj, index) => {
      return <ColourCard key={colourObj.name} isBaseColour={colorblender(baseColour).hex() === colorblender(colourObj.hex).hex()} colourValue={colourObj.hex} colourName={colourObj.name} />
    });

    setColourCards(newColourCards);
  }, [colourPalette, baseColourName, baseColour]);

  return (
    <div className="App">
      <PureModal
        header={colourPalette.length > 0 ? `${colourPalette[0].baseColourName} CSS Variables` : "CSS Variables"}
        className='codeExportModal'
        isOpen={modal}
        closeButton="close"
        closeButtonPosition="bottom"
        onClose={() => {
          setModal(false);
          return true;
        }}
      >
        <p>Your code:</p>
        <ExportCodeSnippet palette={colourPalette} />
      </PureModal>
      <section className='baseColourPicker'>
        <div id="colourPickerInputGroup">
          <label htmlFor="baseColor" >
            Choose a colour:
          </label>
          <input 
            type='color' 
            id="baseColor" 
            name="baseColor" 
            value={baseColour} 
            onChange={(event) => {
              if (event.target.value){
                setBaseColour(event.target.value);
              }
            }} 
          />
        </div>
        <div id="colourNameInputGroup">
            <label htmlFor="colourName">
              Customise the colour's name:
            </label>
            <input 
              type="text"
              id="colourName"
              name="colourName"
              value={customColourName}
              onChange={((event) => {
                if (event.target.value){
                  setCustomColourName(event.target.value);
                }
              })}
            />
        </div>

        
        <div id="generatorSelector">
          <label htmlFor="chosenGenerator">Choose your palette generator:</label>
          <select 
            name="chosenGenerator" 
            id="chosenGenerator" 
            defaultValue={"tones"} 
            value={selectedPaletteMode}
            onChange={(event) => setSelectedPaletteMode(event.target.value)}
          >
              {generatorList.map((generator) => {
                return <option key={generator.name} value={generator.id}>
                  {generator.name}
                </option>
              })}
          </select>
        </div>
        
        <button onClick={() => createColourPalette(selectedPaletteMode)} >
          Generate palette
        </button>

        {colourPalette.length > 0 && 
        <div>
          <button className="modalButton button" onClick={() => setModal(true)}>Export as CSS variables</button>
        </div>
        }
      </section>
      <section className='colourCardContainer'>
          {colourCards}
      </section>
      
    </div>
  );
}

export default App;
