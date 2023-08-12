import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useUser } from 'next-firebase-auth'
import { ReactElement, useState, MouseEvent } from 'react'

export function UserAvatar(): ReactElement {
  const { displayName, photoURL, signOut } = useUser()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box>
      <Button onClick={handleClick}>
        <Avatar src={photoURL as string}></Avatar>
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={signOut}> Sign Out </MenuItem>
      </Menu>
    </Box>
  )
}
