import React, {FC} from 'react';
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {PackType} from "../PacksAPI";
import {Link} from "react-router-dom";

type PackItemPropsType = {
  pack: PackType
}

export const PackItem:FC<PackItemPropsType> = ({pack}) => {
  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >

      <TableCell component="th" scope="row">
        <Link to={pack._id}>
          {pack.name}
        </Link>
      </TableCell>
      <TableCell align="right">{pack.cardsCount}</TableCell>
      <TableCell align="right">{pack.updated}</TableCell>
      <TableCell align="right">{pack.created}</TableCell>
      <TableCell align="right">CRUD</TableCell>

    </TableRow>
  );
};
