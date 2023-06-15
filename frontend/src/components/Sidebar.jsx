import DataInfoPanel from "./DataInfoPanel";
import SelectionPanel from "./SelectionPanel";
import { useState } from "react";
import axios from "axios";

export default function Navbar(props) {
  const [dataInfo, setDataInfo] = useState(null);

  async function setChartData(city, beginDate, endDate) {
    setDataInfo(null);
    const beginDateArr = beginDate
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split("/");
    const endDateArr = endDate
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split("/");
    const response = await axios.get("http://localhost:8080/api/data", {
      params: {
        stationId: city,
        beginDate: beginDateArr[2] + beginDateArr[1] + beginDateArr[0] + "00",
        endDate: endDateArr[2] + endDateArr[1] + endDateArr[0] + "25",
      },
    });
    const data = response.data;
    console.log(data.length);
    props.onReciveData(data);
    if (data.length == 0) return;

    let tempDataInfo = [];
    for (let key in data[0]) {
      if (key !== "dateId" && key !== "stationId") {
        const keyData = data.map((el) => el[key]);
        const newOption = {
          label: key,
          average: keyData.reduce((a, b) => a + b) / keyData.length,
          min: keyData.reduce((a, b) => (a < b ? a : b)),
          max: keyData.reduce((a, b) => (a > b ? a : b)),
        };
        tempDataInfo.push(newOption);
      }
    }
    setDataInfo(tempDataInfo);
  }

  return (
    <div
      style={{
        backgroundColor: "grey",
        hight: "100%",
        width: "400px",
        backgroundColor: "lightblue",
      }}
    >
      <SelectionPanel name="kraków" onSubmit={setChartData} />
      {dataInfo && <DataInfoPanel data={dataInfo} />}
    </div>
  );
}
