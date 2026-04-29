import { useEffect, useState } from "react"

import API from "./services/api"

import UploadPanel from "./components/UploadPanel"
import XRDPlot from "./components/XRDPlot"
import LatticeControls from "./components/LatticeControls"

import "./styles/main.css"

export default function App() {

  const [simData, setSimData] = useState(null)

  const [expData, setExpData] = useState(null)

  const [backendReady, setBackendReady] = useState(false)

  const [loadingBackend, setLoadingBackend] = useState(true)

  // ==========================================
  // WAKE UP BACKEND
  // ==========================================

  useEffect(() => {

    async function wakeBackend() {

      try {

        await API.get("/")

        setBackendReady(true)

      } catch (error) {

        console.log("Backend waking up...")
      }

      setLoadingBackend(false)
    }

    wakeBackend()

  }, [])

  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (loadingBackend) {

    return (

      <div className="loading-screen">

        <h1>App4XRD</h1>

        <p>Starting backend server...</p>

      </div>
    )
  }

  // ==========================================
  // BACKEND ERROR
  // ==========================================

  if (!backendReady) {

    return (

      <div className="loading-screen">

        <h1>Backend Offline</h1>

        <p>Please wait and refresh.</p>

      </div>
    )
  }

  // ==========================================
  // NORMAL APP
  // ==========================================

  return (

    <div className="app">

      <div className="sidebar">

        <h1>App4XRD</h1>

        <UploadPanel
          setSimData={setSimData}
          setExpData={setExpData}
        />

        <LatticeControls
          simData={simData}
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