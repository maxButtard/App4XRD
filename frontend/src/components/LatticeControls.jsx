import { useState } from "react"

import API from "../services/api"

export default function LatticeControls({
  setSimData
}) {

  const [params, setParams] = useState({
    a: 5,
    b: 5,
    c: 5,
    alpha: 90,
    beta: 90,
    gamma: 90
  })

  function handleChange(e) {

    setParams({
      ...params,
      [e.target.name]: parseFloat(e.target.value)
    })
  }

  async function updateLattice() {

    const res = await API.post(
      "/xrd/update-lattice",
      params
    )

    setSimData(res.data)
  }

  return (
    <div>

      <h2>Lattice Parameters</h2>

      {Object.keys(params).map(key => (

        <div key={key}>

          <label>{key}</label>

          <input
            type="range"
            min="1"
            max="20"
            step="0.01"
            name={key}
            value={params[key]}
            onChange={handleChange}
          />

        </div>
      ))}

      <button onClick={updateLattice}>
        Update
      </button>

    </div>
  )
}