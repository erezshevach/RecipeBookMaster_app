import React from "react";
import RecipeComponentListItem from './RecipeComponentListItem';
import { v4 as uuid } from 'uuid';
import {ThemeProvider} from "@mui/material/styles";
import {Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
// import {
//     randomCreatedDate,
//     randomTraderName,
//     randomId,
//     randomArrayItem,
// } from '@mui/x-data-grid-generator';

import {recipeDataGridTheme} from "../styles/themes/recipeDataGridTheme";


const RecipeComponentsList_view = (props) => {
    const {components, isForm} = props

    function EditToolbar(props) {
        const { setRows, setRowModesModel } = props;

        const handleClick = () => {
            const id = uuid();
            setRows((oldRows) => [...oldRows, { id, quantity: 0, uom: '', ingredient: '', state: '', isNew: true }]);
            setRowModesModel((oldModel) => ({
                ...oldModel,
                [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
            }));
        };

        return (
            <GridToolbarContainer>
                <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                    Add component
                </Button>
            </GridToolbarContainer>
        );
    }
    const columns = [
        {
            field: 'quantity',
            headerName: 'Quantity',
            valueGetter: (params) => `${params.row.quantity} ${params.row.uom.toLowerCase()}` ,
            flex: 1,
        },
        {
            field: 'uom',
            headerName: 'Unit',
            valueGetter: (params) => `${params.row.quantity} ${params.row.uom.toLowerCase()}` ,
            flex: 1,
        },
        {
            field: 'ingredient',
            headerName: 'Ingredient',
            valueGetter: (params) => `${params.row.ingredient} ${params.row.state ? `(${params.row.state})` : ''}`,
            flex: 3,
        },
    ];

    return (
        <div style={{width: '100%'}}>

                {components.length > 1 &&
                    <ThemeProvider theme={recipeDataGridTheme}>
                    <DataGrid
                        //sx={{maxWidth: '50%'}}
                        rows={components}
                        columns={columns}
                        autoHeight={true}
                        getRowId={(row) => row.componentPid}
                        hideFooter={true}
                        columnHeaderHeight={0}
                        slots={isForm ? {
                            toolbar: EditToolbar,
                        } : {}}
                    />
                </ThemeProvider>}

            {/*<ul>*/}
            {/*    {*/}
            {/*        components.length === 0 ? (*/}
            {/*            isForm && <p>No components yet</p>*/}
            {/*        ) : (*/}
            {/*            components.map(component => (*/}
            {/*                <li key={component.componentPid}>*/}
            {/*                    <RecipeComponentListItem isForm={isForm} component={component}/>*/}
            {/*                </li>)*/}
            {/*            )*/}
            {/*        )*/}

            {/*    }*/}
            {/*</ul>*/}
        </div>
    );
}


export default RecipeComponentsList_view;