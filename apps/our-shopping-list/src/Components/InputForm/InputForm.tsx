import TextField from '@mui/material/TextField'
import { FormEvent, ReactElement, useState } from 'react'

export function InputForm(): ReactElement {
  const [listItem, setListItem] = useState('')
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(listItem) //do something with the list item
    setListItem('')
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <TextField
        label='Enter Item'
        id='input-form-field'
        variant='filled'
        autoFocus
        onChange={(e) => setListItem(e.target.value)}
        value={listItem}
      />
    </form>
  )
}
