import React, {FC} from 'react';
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {PackType, UpdatePackType} from "../PacksAPI";
import {Link} from "react-router-dom";
import {PackListCrud} from "./PackListCRUD";
import {AppDispatch} from "../../../app/store";
import {deletePackTC, updatePackTC} from "../packsReducer";
import {useSelector} from "react-redux";
import {selectIsDisabled} from "../selectors/selectIsDisabled";

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
            <TableCell align="right">{pack.updated}</TableCell>
            <TableCell align="right">{pack.created}</TableCell>
            <TableCell align="right">
                <PackListCrud id={pack._id}
                              cardsCount={pack.cardsCount}
                              userId={pack.user_id}
                              educationsAction={() => {
                              }}
                              editAction={updatePack}
                              deleteAction={deletePack}
                />
            </TableCell>

        </TableRow>
    );
};
