import React, { useState } from "react";
import LineChart from "./components/LineChart";
import Navbar from "./components/Navbar";
function App() {
  const [data, setData] = useState([]);
  return (
    <div className="d-flex" style={{ flexGrow: 1 }}>
      <Navbar onReciveData={setData} />
      <LineChart data={data} />
    </div>
  );
}

export default App;
