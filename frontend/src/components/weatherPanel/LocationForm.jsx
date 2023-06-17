import { useState } from "react";

export default function LocationSelectionForm(props) {
  const [city, setCity] = useState("");

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(city);
  };

  return (
    <form className="card p-3 bg-info" onSubmit={handleSubmit}>
      <div className="row mb-3">
        <label htmlFor="cityName" className="col-sm-2 col-form-label">
          City Name:
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="cityName"
            value={city}
            onChange={handleCityChange}
          />
        </div>
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
}
