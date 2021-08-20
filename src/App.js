import React, {useEffect, useState} from 'react';
import './App.css';
import Amplify  from 'aws-amplify'
import { withStyles, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import awsExports from "./aws-exports";
import axios from "axios";
Amplify.configure(awsExports);
const StyledTableCell = withStyles((theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }),
)(TableCell);

const StyledTableRow = withStyles((theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }),
)(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});


const App = () => {

    const classes = useStyles();
    const [product , setProduct] = useState([])
    const [search, setSearch] = useState('')

    const getInverterData = async () => {
        try {
            const data = await axios.get('http://localhost:3000/inveter/list');
            console.log(data.data)
            setProduct(data.data)
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() =>{ getInverterData();
    }, [])

    return (
        <div className="App">
            <input type='text' placeholder='Search here' onChange={(e) => {
                setSearch(e.target.value)
            }}
            />

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>id</StyledTableCell>
                            <StyledTableCell align="right">inverter_key</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {product.filter((item) => {
                            if (search === ''){
                                return item;
                            } else if (item.inverter_key.toLowerCase().includes(search.toLowerCase())){
                                return item;
                            }
                            return false;
                        }).map((item) => {
                            return (<StyledTableRow key={item.id} >
                                <StyledTableCell component="th" scope="row">
                                    {item.id}
                                </StyledTableCell>
                                <StyledTableCell align="right">{item.inverter_key}</StyledTableCell>
                            </StyledTableRow>);
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    );
}

export default App;
