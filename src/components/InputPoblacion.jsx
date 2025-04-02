import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import { debounce } from '@mui/material/utils';
import axios from 'axios';
import { fetchZohoData } from '../functions';

// URL de tu API
const apiUrl = 'https://creator.zoho.com/api/v2/pinout1/portal-de-propiedades/'; 

async function fetchPoblaciones({inputValue, provincia}) {
    try {
        const url = `${apiUrl}report/datos_cups_Report?provincia=${provincia}&criteria=poblacion.contains("${inputValue}")&max_limit=1000`;
        const response = await fetchZohoData(url)
        // const response = await axios.get(`${apiUrl}api/poblaciones?poblacion=${inputValue}&provincia=${provincia}`);
        return response.data.data || [];
    } catch (error) {
        console.error("Error al obtener poblaciones:", error);
        return [];
    }
}

const fetch = debounce(async (request, callback) => {
    try {
        const suggestions = await fetchPoblaciones(request);

        // Eliminar duplicados usando Map
        const suggestionsDistinct = [...new Map(suggestions.map(s => [s.poblacion, s])).values()];

        callback(
            suggestionsDistinct.map((suggestion) => ({
                description: suggestion.poblacion,
                structured_formatting: {
                    main_text: suggestion.poblacion,
                    secondary_text: "España"
                }
            }))
        );
    } catch (err) {
        console.error("Error en fetch:", err);
        callback([]);
    }
}, 250);


export default function InputPoblacion(props) {
    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState([]);

    React.useEffect(() => {
        if (!props.provincia) return; // Si no hay provincia, no hacer nada

        let active = true;
        fetch({ inputValue: inputValue || "*", provincia: props.provincia }, (results) => {
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
    }, [value, inputValue, props.provincia]);

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
                props.setPoblacion(newInputValue)
            }}
            renderInput={(params) => <TextField {...params} label="Busca una población" fullWidth />}
            renderOption={(props, option) => (
                <li {...props}>
                    <Typography>{option.structured_formatting?.main_text || option.description}</Typography>
                </li>
            )}
        />
    );
}
