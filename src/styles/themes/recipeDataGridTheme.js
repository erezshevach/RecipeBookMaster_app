import React from 'react';

import { createTheme } from '@mui/material/styles';


// Colors
const dark_grey = '#333';
const grey = '#666';
const blue = '#1c88bf';
const dark_blue = '#364051';
const off_white = '#f7f7f7';
const light_grey = '#dedede';

// Spacing
const xs_spacing = '0.8rem';
const s_spacing = '1.2rem';
const m_spacing = '1.6rem';
const l_spacing = '3.2rem';
const xl_spacing = '4.8rem';

// Font Size
const s_font = '1.4rem';
const m_font = '1.6rem';
const l_font = '1.8rem';


const recipeDataGridTheme = createTheme({
    // palette: {
    //     primary: {
    //         main: '#1976d2',
    //         light: '#42a5f5',
    //         dark: '#1565c0',
    //         contrastText: '#fff',
    //     },
    // },
    typography: {
        fontSize: 26
    },
    components: {
        MuiDataGrid : {
            styleOverrides: {
                root: {
                    // 'border': `1px solid ${light_grey}`,
                    // 'border-top': `none`,
                    // 'align-items': `center`,
                    // 'padding': `${m_spacing}`,
                },
                columnHeaderRow: {
                  background: off_white
                },
                columnHeaderTitle: {
                    fontSize: 16
                }
                //TODO - add margin bottom to the body of the grid
            },
        },
    },
});

const recipeDG_column_bool = {
    flex: 1,
    type: 'boolean',
}

const recipeDG_column_name = {
    maxWidth: 700,
    minWidth: 300,
    flex: 4,
}

export {recipeDataGridTheme, recipeDG_column_bool, recipeDG_column_name};
