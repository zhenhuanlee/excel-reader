import React, { useState } from 'react'
import Reader from './reader'
import Fruit from './fruits'

function App() {
  const [current, setCurrent] = useState('reader')

  return (
    <div className="App">
      <Reader current={current} />
      <hr />
      <Fruit current={current} />
    </div>
  )
}

export default App;
