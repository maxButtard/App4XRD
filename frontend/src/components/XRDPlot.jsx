import Plot from "react-plotly.js"

export default function XRDPlot({ simData, expData }) {

  const traces = []

  if (simData) {
    traces.push({
      x: simData.x,
      y: simData.y,
      type: "scatter",
      mode: "lines",
      name: "Simulated"
    })
  }

  if (expData) {
    traces.push({
      x: expData.x,
      y: expData.y,
      type: "scatter",
      mode: "lines",
      name: "Experimental"
    })
  }

  return (
    <Plot
      data={traces}
      layout={{
        title: "XRD Pattern",
        xaxis: { title: "2θ" },
        yaxis: { title: "Intensity" },
        autosize: true
      }}
      style={{
        width: "100%",
        height: "700px"
      }}
    />
  )
}