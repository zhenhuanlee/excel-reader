import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import superagent from 'superagent'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

export default function (params) {
  const [names, setNames] = useState([])
  const [name, setName] = useState(null)
  const [fruits, setFruits] = useState([])

  useEffect(() => {
    async function retrieveNames () {
      const resp = await superagent.get('http://localhost:3333/api/v1/fruits/names')
      setNames(resp.body)
    }
    retrieveNames()
  }, [])

  useEffect(() => {
    async function retrieveFruits () {
      const resp = await superagent
        .get('http://localhost:3333/api/v1/fruits')
        .query({ name })
      setFruits(resp.body)
    }
    retrieveFruits()
  }, [name])

  function handleChange (event, selected) {
    console.log(selected)
    setName((selected || null))
  }

  return (
    <div>
      <div>
        <Autocomplete
          options={names}
          getOptionLabel={option => option}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
          onChange={handleChange}
        />
      </div>

      <div>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">NAME</TableCell>
                <TableCell align="right">DESCRIPTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fruits.map((fruit) => (
                <TableRow key={fruit.id}>
                  <TableCell component="th" scope="row"> {fruit.id} </TableCell>
                  <TableCell align="right">{fruit.name}</TableCell>
                  <TableCell align="right">{fruit.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}
