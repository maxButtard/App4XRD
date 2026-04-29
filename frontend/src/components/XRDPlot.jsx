import Plot from "react-plotly.js"

export default function XRDPlot({
  simData,
  expData
}) {

  const traces = []

  // ==========================================
  // SIMULATED XRD (vertical sticks)
  // ==========================================

  if (simData) {

    simData.x.forEach((theta, i) => {

      traces.push({

        x: [theta, theta],

        y: [0, simData.y[i]],

        type: "scatter",

        mode: "lines",

        line: {
          width: 2,
          color: "black"

        },

        name: i === 0 ? "Simulated" : "",

        showlegend: i === 0
      })
    })
  }

  // ==========================================
  // EXPERIMENTAL XRD
  // ==========================================

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

        xaxis: {
          title: "2θ (degrees)"
        },

        yaxis: {
          title: "Intensity"
        },

        autosize: true,

        hovermode: "closest"
      }}

      style={{
        width: "100%",
        height: "700px"
      }}

      config={{
        responsive: true
      }}
    />
  )
}