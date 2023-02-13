import React, {useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {AppDispatch} from "../../../app/store";
import {getPacks} from "../packsReducer";
import {useSelector} from "react-redux";
import {PackItem} from "./PackItem";
import {
  selectPackName,
  selectPacksUserID,
  selectCardPacks,
  selectMin,
  selectMax,
  selectPageCount, selectPage
} from "../selectors";


export const PackList = () => {
  const dispatch = AppDispatch()
  const packs = useSelector(selectCardPacks)
  const packName = useSelector(selectPackName)
  const userID = useSelector(selectPacksUserID)
  const min = useSelector(selectMin)
  const max = useSelector(selectMax)
  const pageCount = useSelector(selectPageCount)
  const page = useSelector(selectPage)


  useEffect(() => {
    dispatch(getPacks())
  }, [packName, userID, min, max, pageCount, page])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Cards</TableCell>
            <TableCell align="right">Last Updated</TableCell>
            <TableCell align="right">Created by</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {packs.map((pack) => (
            <PackItem key={pack._id} pack={pack}/>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
}