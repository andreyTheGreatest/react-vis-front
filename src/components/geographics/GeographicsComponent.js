import React from "react";
import DemographicsChart from "../demographics/DemographicsChart";
import { Select } from "antd";
const { Option } = Select;

let fakeData;

const GeographicsComponent = ({ personId }) => {
  const [selectedData, setSelectedData] = React.useState([]);
  const [option, setOption] = React.useState();

  React.useState(async () => {
    fakeData = await require("./geographics.json");
    handleChange("state");
    setOption("state");
  });

  function handleChange(option) {
    const dataPickOption = fakeData.map((personal) => personal[option]);
    const count = {};
    dataPickOption.forEach((item) => (count[item] = (count[item] || 0) + 1));
    setSelectedData(
      Object.keys(count).map((key) => {
        return { x: key.toString(), y: count[key] };
      })
    );
    setOption(option);
  }

  return (
    <div style={{ padding: 100 }}>
      <Select
        defaultValue="state"
        onChange={handleChange}
        style={{ width: 120, marginBottom: 100 }}
      >
        <Option value="country">Country</Option>
        <Option value="state">State</Option>
        <Option value="city">City</Option>
        <Option value="village">Village</Option>
      </Select>
      <br />
      {selectedData.length > 0 ? (
        <DemographicsChart
          selectedData={(() => {
            console.log(selectedData);
            return selectedData;
          })()}
          currOption={option}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default GeographicsComponent;
