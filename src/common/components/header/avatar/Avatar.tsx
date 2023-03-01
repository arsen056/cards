import React, { useEffect, useRef, useState } from 'react'

import { Button } from '@mui/material'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { selectAvatarFromState } from '../../../../features/auth/selectors'

import s from './Avatar.module.css'

import { AppDispatch } from 'app/store'
import avatar from 'assets/avatar.png'
import { selectName } from 'common/selectors'
import { logoutTC } from 'features/auth/signIn/loginReducer'

export const Avatar = () => {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLButtonElement>(null)

  const dispatch = AppDispatch()
  const name = useSelector(selectName)
  const userAvatar = useSelector(selectAvatarFromState)

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  const logOut = () => {
    dispatch(logoutTC())
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open)

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <div>
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
        <span className={s.name}>{name}</span>
        <div id="avatar" className={s.avatar}>
          <img src={userAvatar ? userAvatar : avatar} alt="avatar" />
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
                >
                  <Link to={'/profile'}>
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                  </Link>

                  <MenuItem onClick={logOut}>Log out</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}
