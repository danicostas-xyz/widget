import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function InputCups(props) {

    return (
        <TextField
            disabled
            placeholder='Cups'
            sx={{ width: 300 }}
            value={props.cups}
        />
    );
}
