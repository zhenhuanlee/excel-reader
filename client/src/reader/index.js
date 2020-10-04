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
    console.log(data)
  }

  rABS
    ? reader.readAsBinaryString(file)
    : reader.readAsArrayBuffer(file)
}

export default function () {
  const [body, setBody] = useState([])
  const [header, setHeader] = useState([])

  function setData (data) {
    setHeader(data.shift())
    setBody(data)
    console.log(header)
    console.log(body)
  }

  function handleChange (e) {
    const files = e.target.files
		if (files && files[0]) {
      handleFile(files[0], setData)
    }
  }

  async function handleUpload () {
    if (!body) {
      window.alert('no data found')
    }
    try {
      return await superagent
        .post('http://localhost:3000/api/v1/upload')
        .send(body)
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
              { b && b.map((content, tdIndex) => (
                <td key={`td-${index}-${tdIndex}`}>{content}</td>
              )) }
            </tr>
          )) }
        </tbody>
      </table>

      <button onClick={handleUpload}>upload</button>
    </div>
  )
}
