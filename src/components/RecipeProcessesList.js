import React, {useContext} from "react";

import {RecipeFormContext} from '../context/context'
import RecipeProcessListItem from './RecipeProcessListItem';
import {ThemeProvider} from "@mui/material/styles";
import {recipeDataGridTheme} from "../styles/themes/recipeDataGridTheme";
import {DataGrid, GridRowModes, GridToolbarContainer} from "@mui/x-data-grid";
import RecipeComponentsList from "./RecipeComponentsList";
import {v4 as uuid} from "uuid";
import {Button} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const RecipeProcessesList = () => {
    const {processes, processesDispatch} = useContext(RecipeFormContext);

    const columns = [
        {
            field: 'description',
            headerName: 'Description',
            editable: true,
            valueGetter: (params) => `${params.row.sequence}: ${params.row.description}` ,
            flex: 1,
        },
        {
            field: 'components',
            headerName: 'Components',
            renderCell: (params) =>  <RecipeComponentsList
                                        id='components'
                                        isForm={true}
                                        components={params.value}
                                        style={{width: '50%'}}
                                        />,
            flex: 3,
        },

    ];

    function EditToolbar(props) {
        const { setRows, setRowModesModel } = props;

        const handleClick = () => {
            const id = uuid();
            setRows((oldRows) => [...oldRows, { id, sequence: '', description: '', components: [], isNew: true }]);
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
    return (

                <ThemeProvider theme={recipeDataGridTheme}>
                    <DataGrid
                        //sx={{maxWidth: '50%'}}
                        rows={processes}
                        columns={columns}
                        getRowHeight={() => 'auto'}
                        getRowId={(row) => row.processPid}
                        hideFooter={true}
                        slots={{
                            toolbar: EditToolbar,
                        }}
                    />
                </ThemeProvider>

        // <div>
        //     <ul>
        //         {
        //             processes.length === 0 ? (
        //                 <p>No processes yet</p>
        //                 ) : (
        //                 processes.map(process => (
        //                     <li key={process.processPid}>
        //                         <RecipeProcessListItem process={process}/>
        //                     </li>)
        //                 )
        //             )
        //
        //         }
        //     </ul>
        // </div>
    );
}


export default RecipeProcessesList;
