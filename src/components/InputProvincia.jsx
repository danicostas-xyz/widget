/* eslint-disable react/prop-types */
import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import provincias from '../provincias';

export default function InputProvincia(props) {

    return (
        <Autocomplete
            disablePortal
            options={provincias}
            sx={{ width: 300 }}
            onInputChange={(event, newInputValue) => props.setProvincia(newInputValue)}
            renderInput={(params) => <TextField {...params} label="Provincia" />}
        />
    );
  }
