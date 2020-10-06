const host = 'http://localhost:3333'

import superagent from 'superagent'

export function get (path) {
  try {
    const resp = await superagent.get(`${host}/${path}`)
    return resp.body
  } catch (err) {
    // ...
  }
}
