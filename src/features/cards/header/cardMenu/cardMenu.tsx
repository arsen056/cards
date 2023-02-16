import {Button} from "@mui/material";
import s from "../../../../common/components/header/avatar/Avatar.module.css";
import cardMenu from "../../../../assets/cardMenu.svg";
import Popper from "@mui/material/Popper";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import {AppDispatch} from "../../../../app/store";
import edit from "../../../../assets/edit.svg";
import deleteIcon from "../../../../assets/delete.svg";
import learn from "../../../../assets/learn.svg";
import style from "./CardMenu.module.css"
import {useSelector} from "react-redux";
import {selectCardPacks} from "../../../packs/selectors";
import {deletePackInCards, updatePackNameTC} from "../../cardsReducer";

type CardMenuPropsType = {
		packID: string
}

export const CardMenu = ({packID}: CardMenuPropsType) => {
		const packs = useSelector(selectCardPacks)
		const [open, setOpen] = React.useState(false);
		const anchorRef = React.useRef<HTMLButtonElement>(null);

		const dispatch = AppDispatch();

		const handleToggle = () => {
				setOpen((prevOpen) => !prevOpen);
		};

		const handleClose = (event: Event | React.SyntheticEvent) => {
				if (
						anchorRef.current &&
						anchorRef.current.contains(event.target as HTMLElement)
				) {
						return;
				}

				setOpen(false);
		};

		function handleListKeyDown(event: React.KeyboardEvent) {
				if (event.key === 'Tab') {
						event.preventDefault();
						setOpen(false);
				} else if (event.key === 'Escape') {
						setOpen(false);
				}
		}

		const prevOpen = React.useRef(open);
		React.useEffect(() => {
				if (prevOpen.current && !open) {
						anchorRef.current!.focus();
				}

				prevOpen.current = open;
		}, [open]);

		const editPack = () => {
				dispatch(updatePackNameTC('Edited pack', packID))
		}
		const deletePack = () => {
				dispatch(deletePackInCards(packID))
		}

		return (
				<div className={style.menu}>
						<Button
								disableRipple
								className={s.avatarWrapper}
								onClick={handleToggle}
								ref={anchorRef}
								id="composition-button"
								aria-controls={open ? 'composition-menu' : undefined}
								aria-expanded={open ? 'true' : undefined}
								aria-haspopup="true"
						>
								<div id='avatar' className={`${s.avatar}`}>
										<img src={cardMenu} alt="avatar"/>
								</div>
						</Button>

						<Popper
								sx={{zIndex: 5}}
								open={open}
								anchorEl={anchorRef.current}
								role={undefined}
								placement="bottom-start"
								transition
								disablePortal
						>
								{({TransitionProps, placement}) => (
										<Grow
												{...TransitionProps}
												style={{
														transformOrigin:
																placement === 'bottom-start' ? 'left top' : 'left bottom',
												}}
										>
												<Paper>
														<ClickAwayListener onClickAway={handleClose}>
																<MenuList
																		autoFocusItem={open}
																		id="composition-menu"
																		aria-labelledby="composition-button"
																		onKeyDown={handleListKeyDown}
																		className={style.imgStyle}
																>
																		<MenuItem onClick={editPack}>
                                      <img src={edit} alt="edit icon"/>
                                      Edit
                                    </MenuItem>

																		<MenuItem onClick={deletePack}>
                                      <img src={deleteIcon} alt="delete icon"/>
                                      Delete
                                    </MenuItem>

																		<MenuItem onClick={() => {}}>
																			<img src={learn} alt="learn icon"/>
																			Learn
																		</MenuItem>
																</MenuList>
														</ClickAwayListener>
												</Paper>
										</Grow>
								)}
						</Popper>
				</div>
		)
}