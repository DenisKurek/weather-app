import { useState } from "react";

export default function DataInfoPanel(props) {
  const [selectedData, setSelectedDAta] = useState(null);

  function getInfo(label) {
    if (label == null) return;
    const dataInfo = [];
    for (let [key, value] of Object.entries(
      props.data.filter((data) => data.label === label)[0]
    )) {
      if (key !== "label") {
        dataInfo.push([key, value]);
      }
    }
    console.log(label);
    return dataInfo;
  }
  return (
    <div
      className="d-flex flex-wrap border m-1"
      style={{
        flexGrow: 1,
        backgroundColor: "lightblue",
        flexDirection: "column",
      }}
    >
      <select
        name="data"
        id="cities"
        onChange={(e) => setSelectedDAta(e.target.value)}
      >
        <option value={null}>{"select data"}</option>
        {props.data.map((data) => (
          <option value={data.label}>{data.label}</option>
        ))}
      </select>
      {selectedData &&
        getInfo(selectedData).map((data) => {
          return (
            <table className="table table-bordered table-striped table-fixed">
              <tbody>
                <tr>
                  <td className="fw-bold" style={{ width: "50%" }}>
                    {data[0]}:
                  </td>
                  <td style={{ width: "50%" }}>{data[1].toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          );
        })}
    </div>
  );
}
