/* eslint-disable react/prop-types */
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import { debounce } from '@mui/material/utils';
import axios from 'axios';
import { fetchZohoData } from '../functions';

// URL de tu API
const apiUrl = 'http://localhost:3000/'

//const apiUrl = 'https://creator.zoho.com/api/v2/pinout1/portal-de-propiedades/'; 

async function fetchPoblaciones({inputValue, provincia, poblacion}) {
    try {
        const url = `${apiUrl}report/datos_cups_Report?provincia=${provincia}&poblacion=${poblacion}&criteria=calle.contains("${inputValue}")`;
        //const response = await fetchZohoData(url)
        const response = await axios.get(`${apiUrl}api/calles?calle=${inputValue}&provincia=${provincia}&poblacion=${poblacion}`);
        return response.data.data || [];
    } catch (error) {
        console.error("Error al obtener calles:", error);
        return [];
    }
}

const fetch = debounce(async (request, callback) => {
    try {
        const suggestions = await fetchPoblaciones(request);

        // Eliminar duplicados usando Map
        const suggestionsDistinct = [...new Map(suggestions.map(s => [s.calle, s])).values()];

        callback(
            suggestionsDistinct.map((suggestion) => ({
                description: suggestion.calle,
                structured_formatting: {
                    main_text: suggestion.calle,
                    secondary_text: "España"
                }
            }))
        );
    } catch (err) {
        console.error("Error en fetch:", err);
        callback([]);
    }
}, 250);


export default function InputCalle(props) {
    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState([]);

    React.useEffect(() => {
        if (!props.poblacion) return; // Si no hay poblacion, no hacer nada


        let active = true;
        fetch({inputValue: inputValue || "*", // calle
            poblacion: props.poblacion,
            provincia: props.provincia
        }, (results) => {
            if (active) {
                let newOptions = results || [];
                if (value) {
                    newOptions = [value, ...newOptions.filter((r) => r.description !== value.description)];
                }
                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue]);

    return (
        <Autocomplete
            sx={{ width: 300 }}
            options={options}
            getOptionLabel={(option) => option.description}
            filterOptions={(x) => x}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            noOptionsText="No hay resultados"
            onChange={(event, newValue) => setValue(newValue)}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue)
                props.setCalle(newInputValue)
            }}
            renderInput={(params) => <TextField {...params} label="Calle" fullWidth />}
            renderOption={(props, option) => (
                <li {...props}>
                    <Typography>{option.structured_formatting?.main_text || option.description}</Typography>
                </li>
            )}
        />
    );
}
