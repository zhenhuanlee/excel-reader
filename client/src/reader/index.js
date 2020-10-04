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
    setBody(data)
    console.log('header', header)
    console.log('body', body)
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
        .send({ fruits: body })
      if (res.status === 200) {
        window.alert('success')
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
