import API from "../services/api"

export default function UploadPanel({
  setSimData,
  setExpData
}) {

  async function uploadCIF(event) {

    const file = event.target.files[0]

    const formData = new FormData()

    formData.append("file", file)

    const res = await API.post(
      "/xrd/upload-cif",
      formData
    )

    setSimData(res.data)
  }

  async function uploadXY(event) {

    const file = event.target.files[0]

    const formData = new FormData()

    formData.append("file", file)

    const res = await API.post(
      "/xrd/upload-xy",
      formData
    )

    setExpData(res.data)
  }

  return (
    <div>

      <h2>Upload Files</h2>

      <input
        type="file"
        accept=".cif"
        onChange={uploadCIF}
      />

      <br /><br />

      <input
        type="file"
        accept=".xy"
        onChange={uploadXY}
      />

    </div>
  )
}