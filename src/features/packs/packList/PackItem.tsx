import React, {FC} from 'react';
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {PackType, UpdatePackType} from "../PacksAPI";
import {Link} from "react-router-dom";
import {PackListCrud} from "./PackListCRUD";
import {AppDispatch} from "../../../app/store";
import {isoToDate} from "../../../common/utils/time";
import {deletePackTC, updatePackTC} from "../packsReducer";

type PackItemPropsType = {
  pack: PackType
}

export const PackItem: FC<PackItemPropsType> = ({pack}) => {

  const dispatch = AppDispatch()

  const updatePack = (data: UpdatePackType) => {
    dispatch(updatePackTC(data))
  }

  const deletePack = (id: string) => {
    dispatch(deletePackTC(id))
  }

  const date = isoToDate(pack.updated)

  return (
    <TableRow
      sx={{'&:last-child td, &:last-child th': {border: 0}}}
    >

      <TableCell component="th" scope="row">
        <Link to={pack._id}>
          {pack.name}
        </Link>
      </TableCell>
      <TableCell align="right">{pack.cardsCount}</TableCell>
      <TableCell align="right">{date}</TableCell>
      <TableCell align="right">{pack.user_name}</TableCell>
      <TableCell align="right">
        <PackListCrud id={pack._id}
                      cardsCount={pack.cardsCount}
                      userId={pack.user_id}
                      educationsAction={() => {
                      }}
                      packName={pack.name}
                      editAction={updatePack}
                      deleteAction={deletePack}/>
      </TableCell>

    </TableRow>
  );
};
