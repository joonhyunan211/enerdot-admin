import React, {useEffect, useState} from 'react';
import {Admin} from "react-admin";
import './App.css';
import { withStyles, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from "axios";

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
            const {data : apiData = []} = await axios.get('https://2z2sf35li4.execute-api.ap-northeast-2.amazonaws.com/develop/inverter-latest/');
            console.log(apiData)
            const result = apiData?.map((res=>{
                return {
                    ...res,
                    errInfo : JSON.stringify(res.errInfo)
                }
            }))
            setProduct(result)

            // const {data : apiData2 = []} = await axios.get('http://localhost:10001/inveter/list');
            // console.log(apiData2)
            // const result2 = apiData2?.map((res=>{
            //     return {
            //         ...res,
            //         err_info : JSON.stringify(res.err_info)
            //     }
            // }))
            // setProduct(result2)
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() =>{ getInverterData();
    }, [])

    return (
        <div className="App">
            <div className='title'>Enerdot Inverter Latest List </div>
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
                            <StyledTableCell align="right">plant_id</StyledTableCell>
                            <StyledTableCell align="right">plant_key</StyledTableCell>
                            <StyledTableCell align="right">data_time_stamp</StyledTableCell>
                            <StyledTableCell align="right">oper_status</StyledTableCell>
                            <StyledTableCell align="right">power_total_ac</StyledTableCell>
                            <StyledTableCell align="right">energy_today_total</StyledTableCell>
                            <StyledTableCell align="right">energy_total</StyledTableCell>
                            <StyledTableCell align="right">freq</StyledTableCell>
                            <StyledTableCell align="right">voltage</StyledTableCell>
                            <StyledTableCell align="right">current</StyledTableCell>
                            <StyledTableCell align="right">err_info</StyledTableCell>
                            <StyledTableCell align="right">created_at</StyledTableCell>
                            <StyledTableCell align="right">created_by</StyledTableCell>
                            <StyledTableCell align="right">modified_at</StyledTableCell>
                            <StyledTableCell align="right">modified_by</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {product.filter((item) => {
                            if (search === ''){
                                return item;
                            } else if (item.inverterKey.toLowerCase().includes(search.toLowerCase())){
                                return item;
                            }
                            return false;
                        }).map((item) => {
                            return (<StyledTableRow key={item.id} >
                                <StyledTableCell component="th" scope="row">
                                    {item.id}
                                </StyledTableCell>
                                <StyledTableCell align="right">{item.inverterKey}</StyledTableCell>
                                <StyledTableCell align="right">{item.plantId}</StyledTableCell>
                                <StyledTableCell align="right">{item.plantKey}</StyledTableCell>
                                <StyledTableCell align="right">{item.dataTimeStamp}</StyledTableCell>
                                <StyledTableCell align="right">{item.operStatus}</StyledTableCell>
                                <StyledTableCell align="right">{item.powerTotalAc}</StyledTableCell>
                                <StyledTableCell align="right">{item.energyTodayTotal}</StyledTableCell>
                                <StyledTableCell align="right">{item.energyTotal}</StyledTableCell>
                                <StyledTableCell align="right">{item.freq}</StyledTableCell>
                                <StyledTableCell align="right">{item.voltage}</StyledTableCell>
                                <StyledTableCell align="right">{item.current}</StyledTableCell>
                                <StyledTableCell align="right">{item.errInfo}</StyledTableCell>
                                <StyledTableCell align="right">{item.createdAt}</StyledTableCell>
                                <StyledTableCell align="right">{item.createdBy}</StyledTableCell>
                                <StyledTableCell align="right">{item.modifiedAt}</StyledTableCell>
                                <StyledTableCell align="right">{item.modifiedBy}</StyledTableCell>
                            </StyledTableRow>);
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    );
}

export default App;
