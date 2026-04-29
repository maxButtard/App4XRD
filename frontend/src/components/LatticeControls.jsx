import { useEffect, useState } from "react"

import API from "../services/api"

export default function LatticeControls({
  simData,
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

  const [initialParams, setInitialParams] = useState(null)

  // ==========================================
  // UPDATE FROM CIF
  // ==========================================

  useEffect(() => {

    if (simData?.lattice) {

      setParams(simData.lattice)

      setInitialParams(simData.lattice)
    }

  }, [simData])

  // ==========================================
  // SLIDER CHANGE
  // ==========================================

  function handleSliderChange(event) {

    setParams({

      ...params,

      [event.target.name]: parseFloat(event.target.value)
    })
  }

  // ==========================================
  // DIRECT INPUT
  // ==========================================

  function handleInputChange(event) {

    setParams({

      ...params,

      [event.target.name]: parseFloat(event.target.value)
    })
  }

  // ==========================================
  // UPDATE BACKEND
  // ==========================================

  async function updateLattice() {

    const response = await API.post(
      "/xrd/update-lattice",
      params
    )

    setSimData(response.data)
  }

  // ==========================================
  // DYNAMIC SLIDER LIMITS
  // ==========================================

  function getSliderLimits(key) {

    if (!initialParams) {

      return {
        min: 1,
        max: 20
      }
    }

    const value = initialParams[key]

    // Angles

    if (
      key === "alpha" ||
      key === "beta" ||
      key === "gamma"
    ) {

      return {

        min: Math.max(30, value - 10),

        max: Math.min(150, value + 10)
      }
    }

    // Lattice constants

    return {

      min: Math.max(0.1, value * 0.8),

      max: value * 1.2
    }
  }

  return (

    <div className="panel">

      <h2>Lattice Parameters</h2>

      {
        Object.keys(params).map(key => {

          const limits = getSliderLimits(key)

          return (

            <div
              key={key}
              className="slider-group"
            >

              <label>{key}</label>

              {/* SLIDER */}

              <input

                type="range"

                min={limits.min}

                max={limits.max}

                step="0.001"

                name={key}

                value={params[key]}

                onChange={handleSliderChange}
              />

              {/* DIRECT EDIT */}

              <input

                type="number"

                step="0.001"

                name={key}

                value={params[key]}

                onChange={handleInputChange}

                className="value-input"
              />

            </div>
          )
        })
      }

      <button onClick={updateLattice}>
        Update Lattice
      </button>

    </div>
  )
}