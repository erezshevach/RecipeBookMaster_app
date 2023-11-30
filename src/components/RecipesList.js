import React from "react";
import {useNavigate} from "react-router-dom";

import { DataGrid } from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckIcon from '@mui/icons-material/Check';
import {ThemeProvider} from '@mui/material/styles';

import {getVisibleRecipes} from "../selectors/recipes";
import recipeTableTheme from "../styles/themes/recipeTableTheme";
import {recipeDataGridTheme, recipeDG_column_bool, recipeDG_column_name} from "../styles/themes/recipeDataGridTheme";


const RecipesList = (props) => {
    let {recipes, filters} = props;
    const navigate = useNavigate();

    const columns = [
        {
            field: 'name',
            headerName: 'Recipe name',
            ...recipeDG_column_name
        },
        {
            field: 'gluten',
            headerName: 'Gluten free',
            valueGetter: (params) => !params.row.containsGluten ,
            ...recipeDG_column_bool
        },
        {
            field: 'dairy',
            headerName: 'Dairy free',
            valueGetter: (params) => !params.row.containsDairy ,
            ...recipeDG_column_bool
        },
        {
            field: 'nuts',
            headerName: 'Nuts free',
            valueGetter: (params) => !params.row.containsNuts ,
            ...recipeDG_column_bool
        },
        {
            field: 'peanuts',
            headerName: 'Peanuts free',
            valueGetter: (params) => !params.row.containsPeanuts ,
            ...recipeDG_column_bool
        },
        {
            field: 'vegan',
            headerName: 'Vegan',
            ...recipeDG_column_bool
        },

    ];

    console.log('loading list. recipes: ', recipes);
    return (
        <div>


            <div >
                <ThemeProvider theme={recipeDataGridTheme}>
                <DataGrid
                    rows={recipes}
                    columns={columns}
                    autoHeight={true}
                    getRowId={(row) => row.recipePid}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 20 },
                        },
                    }}
                    onRowClick={(params) => {navigate(`/view/${params.row.recipePid}`)}}
                    pageSizeOptions={[20, 25, 30]}
                />
                </ThemeProvider>
            </div>


            {/*<ThemeProvider theme={recipeTableTheme}>*/}
            {/*    <TableContainer component={Paper}>*/}
            {/*        <Table sx={{minWidth: 650}} aria-label="simple table" padding="normal">*/}
            {/*            <TableHead>*/}
            {/*                <TableRow>*/}
            {/*                    <TableCell>Recipe name</TableCell>*/}
            {/*                    <TableCell align="center">Gluten free</TableCell>*/}
            {/*                    <TableCell align="center">Dairy free</TableCell>*/}
            {/*                    <TableCell align="center">Nuts free</TableCell>*/}
            {/*                    <TableCell align="center">Peanuts free</TableCell>*/}
            {/*                    <TableCell align="center">vegan</TableCell>*/}
            {/*                </TableRow>*/}
            {/*            </TableHead>*/}
            {/*            <TableBody>*/}
            {/*                {getVisibleRecipes(recipes, filters).map((recipe) => (*/}
            {/*                    <TableRow*/}
            {/*                        key={recipe.name}*/}
            {/*                        sx={{'&:last-child td, &:last-child th': {border: 0}}}*/}
            {/*                        onClick={() => navigate(`/view/${recipe.recipePid}`)}*/}
            {/*                        hover={true}*/}
            {/*                    >*/}
            {/*                        <TableCell component="th" scope="row">{recipe.name}</TableCell>*/}
            {/*                        <TableCell align="center">{recipe.containsGluten ? '' : <CheckIcon/>}</TableCell>*/}
            {/*                        <TableCell align="center">{recipe.containsDairy ? '' : <CheckIcon/>}</TableCell>*/}
            {/*                        <TableCell align="center">{recipe.containsNuts ? '' : <CheckIcon/>}</TableCell>*/}
            {/*                        <TableCell align="center">{recipe.containsPeanuts ? '' :*/}
            {/*                            <CheckIcon/>}</TableCell>*/}
            {/*                        <TableCell align="center">{recipe.vegan ? <CheckIcon/> : ''}</TableCell>*/}
            {/*                    </TableRow>*/}
            {/*                ))}*/}
            {/*            </TableBody>*/}
            {/*        </Table>*/}
            {/*    </TableContainer>*/}
            {/*</ThemeProvider>*/}
        </div>

    );
}


export {RecipesList as default};