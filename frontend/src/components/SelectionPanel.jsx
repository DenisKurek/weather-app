import React, { useState, useRef, useEffect } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";
import axiosInstance from "../utils/authInterceptor";
import DateIdConverter from "../utils/DateIdConverter";

export default function City(props) {
  const selectedCity = useRef();
  const [datesSelected, setDatesSelected] = useState(false);
  const [cities, setCities] = useState([]);
  const [beginDate, setBeginDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    async function getCities() {
      try {
        const response = await axiosInstance.get(
          "http://localhost:8080/api/citiesForDateRange",
          {
            params: {
              beginDate: DateIdConverter(beginDate) + "00",
              endDate: DateIdConverter(endDate) + "25",
            },
          }
        );
        const data = response.data;
        setCities(data);
      } catch (error) {
        props.onError("Server is not responding");
      }
    }
    if (beginDate !== "" && endDate !== "") {
      getCities();
    }
  }, [beginDate, endDate]);

  return (
    <form
      className="d-flex flex-wrap bg-info p-4"
      style={{
        flexDirection: "column",
      }}
      onSubmit={(ev) => {
        ev.preventDefault();
        props.onSubmit(selectedCity.current.value, beginDate, endDate);
      }}
    >
      <div className="mb-3">
        <label htmlFor="DatePicker" className="form-label">
          Select Date:
        </label>
        <Flatpickr
          id="DatePicker"
          options={{ mode: "range" }}
          onChange={(selectedDates) => {
            console.log(selectedDates);
            if (selectedDates.length === 2) {
              setBeginDate(selectedDates[0]);
              setEndDate(selectedDates[1]);
              setDatesSelected(true);
            }
          }}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="cities" className="form-label">
          City:
        </label>
        <select
          name="cities"
          id="cities"
          ref={selectedCity}
          className="form-select"
        >
          {cities.map((city) => (
            <option value={city.idArchive} key={city.idArchive}>
              {city.city}
            </option>
          ))}
        </select>
      </div>

      {datesSelected && (
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      )}
    </form>
  );
}
