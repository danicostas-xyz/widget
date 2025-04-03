import React, { useState } from 'react'
import './App.css'
import InputProvincia from './components/InputProvincia.jsx';
import InputPoblacion from './components/InputPoblacion.jsx';
import InputCalle from './components/InputCalle.jsx';
import InputNumero from './components/InputNumero.jsx';
import InputLetra from './components/InputLetra.jsx';
import InputCups from './components/InputCups.jsx';
import { TextField } from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from '@mui/material/Button';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';


const darkTheme = createTheme({
  palette: {
    mode: "dark", // Activa el modo oscuro
  },
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  color: 'white',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function App() {

  const [nombre, setNombre] = useState("");
  const [provincia, setProvincia] = useState("");
  const [poblacion, setPoblacion] =  useState("");
  const [calle, setCalle] = useState("");
  const [numeroCalle, setNumeroCalle] = useState("");
  const [letraCalle, setLetraCalle] = useState("");
  const [cups, setCups] = useState("");
  const [btDisabled, setBtDisabled] = useState(true);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [titulo , setTitulo] = useState("")
  const [descripcion , setDescripcion] = useState("")

  async function handlerSubmit(){
    const apiUrl = 'http://localhost:3000/'
    try {
      const response = await axios.post(`${apiUrl}api/submit?provincia=${provincia}&poblacion=${poblacion}&calle=${calle}&numero=${numeroCalle}&letra=${letraCalle}&cups=${cups}&nombre=${nombre}`)
        
      console.log(response.data.code)
      
      if (response.data.code === 3000) {
          setTitulo("Enviado correctamente")
          setDescripcion("Su petición se ha registrado correctamente.")
          handleOpen();
        } else if (response.data.code !== 3000) { // TODO: no funciona si hay error
          setTitulo("Ha ocurrido un error")
          setDescripcion("Su petición no se ha podido registrar. Inténtelo de nuevo más tarde.")
          handleOpen();
        }
      
      return response.data.data;
        
    } catch (e) {
        console.error("Error:", e)
        return
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <div className='app'>
        <div>
          <h1 className="titulo">Búsqueda de dirección</h1>
          <div className="formulario">
          <TextField
            placeholder='Nombre'
            onChange={(ev) => setNombre(ev.target.value)}
          />
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
            setBtDisabled={setBtDisabled}
          />
          <InputCups
            cups={`Cups: ${cups}`}
          />
          <Button 
          variant="contained"
          disabled={btDisabled}
          onClick={handlerSubmit}
          >Enviar</Button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 100,
              },
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                  {titulo}
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  {descripcion}
                </Typography>
              </Box>
            </Fade>
          </Modal>
          </div>      
        </div>
      </div>
    </ThemeProvider>
  )
}

