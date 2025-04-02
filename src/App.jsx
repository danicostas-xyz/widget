import React, { useState } from 'react'
import './App.css'
import InputProvincia from './components/InputProvincia.jsx';
import InputPoblacion from './components/InputPoblacion.jsx';
import InputCalle from './components/InputCalle.jsx';
import InputNumero from './components/InputNumero.jsx';
import InputLetra from './components/InputLetra.jsx';
import InputCups from './components/InputCups.jsx';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark", // Activa el modo oscuro
  },
});

export default function App() {

  const [provincia, setProvincia] = useState("");
  const [poblacion, setPoblacion] =  useState("");
  const [calle, setCalle] = useState("");
  const [numeroCalle, setNumeroCalle] = useState("");
  const [letraCalle, setLetraCalle] = useState("");
  const [cups, setCups] = useState("");

  return (
    <ThemeProvider theme={darkTheme}>
      <div className='app'>
        <div>
          <h1 className="titulo">Búsqueda de dirección</h1>
          <div className="formulario">
          <InputProvincia
            setProvincia={setProvincia}
          />
          <InputPoblacion
            provincia={provincia}
            setPoblacion={setPoblacion}
          />
          <InputCalle
            provincia={provincia}
            poblacion={poblacion}
            setCalle={setCalle}
          />
          <InputNumero
            provincia={provincia}
            poblacion={poblacion}
            calle={calle}
            setNumeroCalle={setNumeroCalle}
          />
          <InputLetra
            provincia={provincia}
            poblacion={poblacion}
            calle={calle}
            numeroCalle={numeroCalle}
            setLetraCalle={setLetraCalle}
            letraCalle={letraCalle}
            setCups={setCups}
          />
          <InputCups
            cups={`Cups: ${cups}`}
          />
          </div>      
        </div>
      </div>
    </ThemeProvider>
  )
}

