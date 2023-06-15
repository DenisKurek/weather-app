import { useState } from "react";
import Sidevar from "./../components/Sidebar";
import LineChart from "./../components/LineChart";

export default function ArchiveDataPage(props) {
  const [data, setData] = useState([]);
  return (
    <div className="d-flex" style={{ flexGrow: 1 }}>
      <Sidevar onReciveData={setData} />
      <LineChart data={data} />
    </div>
  );
}
