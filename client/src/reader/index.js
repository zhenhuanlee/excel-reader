import React, { useState } from 'react'
import XLSX from 'xlsx'
import superagent from 'superagent'

function handleFile (file, setData) {
  const reader = new FileReader()
  const rABS = !!reader.readAsBinaryString
  reader.onload = (e) => {
    const bstr = e.target.result
    const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array'})
    const wsname = wb.SheetNames[0]
    const ws = wb.Sheets[wsname]
    const data = XLSX.utils.sheet_to_json(ws, {header:1})
    setData(data)
  }

  rABS
    ? reader.readAsBinaryString(file)
    : reader.readAsArrayBuffer(file)
}

export default function () {
  const [body, setBody] = useState([])
  const [header, setHeader] = useState([])

  function setData (data) {
    const tableName = data.shift()
    setHeader(data.shift())
    const fruits = []
    for (let row of data) {
      if (row.length > 0) {
        fruits.push({ id: row[0], name: row[1], description: row[2] })
      }
    }
    console.log(fruits)
    setBody(fruits)
  }

  function handleChange (e) {
    const files = e.target.files
		if (files && files[0]) {
      handleFile(files[0], setData)
    }
  }

  async function handleUpload () {
    console.log(header)
    console.log(body)
    if (body.length === 0) {
      window.alert('no data found')
    }
    try {
      const res = await superagent
        .post('http://localhost:3333/api/v1/fruits')
        .send(body)
      if (res.status === 200) {
        window.alert('success')
        window.location.reload()
      }
    } catch (err) {
      console.log(err)
      window.alert(err.message)
    }
  }

  return (
    <div>
      <input type='file' onChange={ handleChange } />

      <table>
        <thead>
          <tr>
            { header && header.map((h, index) => (
              <td key={`header-${index}`}>{h}</td>
            )) }
          </tr>
        </thead>

        <tbody>
          { body && body.map((b, index) => (
            <tr key={`tr-${index}`}>
              <td key={`td-${index}-id`}>{b.id}</td>
              <td key={`td-${index}-name`}>{b.name}</td>
              <td key={`td-${index}-desc`}>{b.description}</td>
            </tr>
          )) }
        </tbody>
      </table>

      <button onClick={handleUpload}>upload</button>
    </div>
  )
}
