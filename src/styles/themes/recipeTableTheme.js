import React from 'react';
import '../base/_settings.scss';

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


const recipeTableTheme = createTheme({
    components: {
        MuiTableRow : {
            styleOverrides: {
                root: {
                    'border': `1px solid ${light_grey}`,
                    'border-top': `none`,
                    'align-items': `center`,
                    'padding': `${m_spacing}`,
                },
                head: {
                    'background': off_white,
                    'border': `1px solid ${light_grey}`,
                },
                hover: {
                    'background': off_white,
                    'border': `2px solid ${light_grey}`,
                },
            },
        },
        MuiTableCell : {
            styleOverrides: {
                body: {
                    'color': dark_grey,
                    'font-size': m_font,
                    'text-decoration': 'none',
                    'word-break': 'break-all',
                },
                head: {
                    'color': grey,
                    'font-size': l_font,
                    'word-break': 'break-all'
                },
            },
        },
    },
});

export {recipeTableTheme as default};
