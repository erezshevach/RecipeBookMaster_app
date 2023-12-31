import React, {useContext} from "react";
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
    GridCellEditStopReasons ,
} from '@mui/x-data-grid';

import {recipeDataGridTheme} from "../styles/themes/recipeDataGridTheme";
import {RecipeFormContext} from "../context/context";
import {createComponent, updateComponent} from "../actions/recipeProcesses";


const RecipeComponentsList = (props) => {
    const {components, isForm} = props
    const {processes, processesDispatch} = useContext(RecipeFormContext);

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
            flex: 1,
            editable: true,
        },
        {
            field: 'uom',
            headerName: 'Unit',
            valueGetter: (params) => params.row.uom.toLowerCase() ,
            flex: 1,
            editable: true,
            type: 'singleSelect',
            valueOptions: ['g', 'kg', 'unit'],
        },
        {
            field: 'ingredient',
            headerName: 'Ingredient',
            flex: 3,
            editable: true,
        },
        {
            field: 'state',
            headerName: 'State',
            flex: 3,
            editable: true,
        },
    ];

    const onCellEditStop = (params, event) => {
        //preventing ending edit by clicking outside cell
        // if (params.reason === GridCellEditStopReasons.cellFocusOut) {
        //     event.defaultMuiPrevented = true;
        // }
        if (event.target) {
            processesDispatch(updateComponent(params.row.componentPid, params.field, event.target.value))
        }
    }

    console.log(components);
    return (
        <div style={{width: '100%'}}>

                {//components.length > 1 &&
                    <ThemeProvider theme={recipeDataGridTheme}>
                    <DataGrid
                        //sx={{maxWidth: '50%'}}
                        rows={components}
                        columns={columns}
                        autoHeight={true}
                        getRowId={(row) => row.componentPid}
                        hideFooter={true}
                        columnHeaderHeight={0}
                        slots={{toolbar: EditToolbar}}
                        onCellEditStop={onCellEditStop}
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


export default RecipeComponentsList;