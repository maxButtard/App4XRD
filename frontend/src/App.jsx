import { useState } from "react"

import UploadPanel from "./components/UploadPanel"
import XRDPlot from "./components/XRDPlot"
import LatticeControls from "./components/LatticeControls"

import "./styles/main.css"

export default function App() {

  const [simData, setSimData] = useState(null)
  const [expData, setExpData] = useState(null)

  return (
    <div className="app">

      <div className="sidebar">

        <UploadPanel
          setSimData={setSimData}
          setExpData={setExpData}
        />

        <LatticeControls
          setSimData={setSimData}
        />

      </div>

      <div className="main">

        <XRDPlot
          simData={simData}
          expData={expData}
        />

      </div>

    </div>
  )
}