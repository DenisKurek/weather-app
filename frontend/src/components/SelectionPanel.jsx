import React, { useState, useRef, useEffect } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";
import axios from "axios";
import DateIdConverter from "../utils/DateIdConverter";

export default function City(props) {
  const selectedCity = useRef();
  const [datesSelected, setDatesSelected] = useState(false);
  const [cities, setCities] = useState([]);
  const [beginDate, setBeginDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    async function getCities() {
      const response = await axios.get(
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
    }
    if (beginDate !== "" && endDate !== "") {
      getCities();
    }
  }, [beginDate, endDate]);

  return (
    <form
      className="d-flex flex-wrap border m-1"
      style={{
        backgroundColor: "lightblue",
        flexDirection: "column",
      }}
      onSubmit={(ev) => {
        ev.preventDefault();
        props.onSubmit(selectedCity.current.value, beginDate, endDate);
      }}
    >
      <div>
        <label htmlFor="DatePicker">Select Date: </label>
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
        />
      </div>

      <div>
        <label city="cities">City:</label>
        <select name="cities" id="cities" ref={selectedCity}>
          {cities.map((city) => (
            <option value={city.idArchive}>{city.city}</option>
          ))}
        </select>
      </div>

      {datesSelected && <button type="submit">Submit</button>}
    </form>
  );
}
