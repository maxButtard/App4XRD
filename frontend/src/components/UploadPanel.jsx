import API from "../services/api"

export default function UploadPanel({
  setSimData,
  setExpData
}) {

  async function uploadCIF(event) {

    const file = event.target.files[0]

    const formData = new FormData()

    formData.append("file", file)

    const response = await API.post(
      "/xrd/upload-cif",
      formData
    )

    setSimData(response.data)
  }

  async function uploadXY(event) {

    const file = event.target.files[0]

    const formData = new FormData()

    formData.append("file", file)

    const response = await API.post(
      "/xrd/upload-xy",
      formData
    )

    setExpData(response.data)
  }

  return (
    <div className="panel">

      <h2>Upload Files</h2>

      <div className="input-group">

        <label>CIF File</label>

        <input
          type="file"
          accept=".cif"
          onChange={uploadCIF}
        />

      </div>

      <div className="input-group">

        <label>XY File</label>

        <input
          type="file"
          accept=".xy"
          onChange={uploadXY}
        />

      </div>

    </div>
  )
}