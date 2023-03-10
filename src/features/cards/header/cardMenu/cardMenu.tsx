import React, { useEffect, useRef, useState } from 'react'

import { Button } from '@mui/material'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import { useNavigate } from 'react-router-dom'

import { deletePackInCards, setCardsCards, updatePackNameTC } from '../../cardsReducer'

import style from './CardMenu.module.css'

import { AppDispatch } from 'app/store'
import cardMenu from 'assets/cardMenu.svg'
import learn from 'assets/learn.svg'
import s from 'common/components/header/avatar/Avatar.module.css'
import { PackModal } from 'common/components/modals/packModal/PackModal'

type CardMenuPropsType = {
  packID: string
  title: string
}

export const CardMenu = ({ packID, title }: CardMenuPropsType) => {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLButtonElement>(null)

  const dispatch = AppDispatch()

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  const prevOpen = useRef(open)

  useEffect(() => {
    if (prevOpen.current && !open) {
      anchorRef.current!.focus()
    }

    prevOpen.current = open
  }, [open])

  const editPack = (packName: string, statusPrivate: boolean) => {
    dispatch(updatePackNameTC(packName, packID, statusPrivate))
    setOpen(false)
  }
  const deletePack = () => {
    dispatch(deletePackInCards(packID))
  }

  const navigate = useNavigate()

  const learnPack = () => {
    dispatch(setCardsCards([]))
    navigate(`/learn/${packID}`)
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
        <div id="avatar" className={style.imgStyle}>
          <img src={cardMenu} alt="avatar" />
        </div>
      </Button>

      <Popper
        sx={{ zIndex: 5 }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
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
                  <MenuItem>
                    <PackModal
                      packModalFunctional={editPack}
                      typeButton={'editIcon'}
                      nameValue={title}
                      helpText={'Edit'}
                    />
                  </MenuItem>
                  <MenuItem>
                    <PackModal
                      packModalFunctional={deletePack}
                      typeButton={'deleteIcon'}
                      nameValue={title}
                      helpText={'Delete'}
                    />
                  </MenuItem>
                  <MenuItem onClick={learnPack} style={{ marginLeft: 5 }}>
                    <img src={learn} alt="learn icon" />
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
