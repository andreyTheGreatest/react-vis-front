import React from "react";
import DemographicsChart from "./DemographicsChart";
import { Select } from "antd";
const { Option } = Select;

let fakeData;

const DemographicsComponent = ({ personId }) => {
  const [selectedData, setSelectedData] = React.useState([]);
  const [option, setOption] = React.useState();

  React.useState(async () => {
    fakeData = await require("./demographics.json");
    handleChange("gender");
    setOption("gender");
  });

  function handleChange(option) {
    const dataPickOption = fakeData.map((personal) => personal[option]);
    const count = {};
    let flag = true;
    dataPickOption.forEach((item) => {
      count[item] = (count[item] || 0) + 1;
      if (count[item] >= 10 || !isNaN(item)) flag = false;
    });
    console.log(flag);
    if (flag) {
      let min = +Infinity;
      let max = -Infinity;
      let currency = "$";
      const sortedKeys = Object.keys(count).sort((a, b) => {
        currency = a[0];
        const numA = +a.replace(a[0], "");
        const numB = +b.replace(b[0], "");
        const condition = numA - numB;
        min = Math.min(numA, numB, min);
        max = Math.max(numA, numB, max);
        return condition;
      });
      const step = (max - min) / 10;
      const buckets = [...Array(10).keys()].map(
        (i) => `${Math.floor(min)}-${Math.ceil(min + i * step)}`
      );
      const bucketsCount = {};
      console.log(buckets);
      sortedKeys.forEach((key) => {
        const keyNum = +key.replace(key[0], "");
        const pos = Math.floor((keyNum - min) / step);
        bucketsCount[pos] = (bucketsCount[pos] || 0) + 1;
      });
      setSelectedData(
        buckets.map((val, i) => {
          return { x: val, y: bucketsCount[i] };
        })
      );
    } else
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
        defaultValue="gender"
        onChange={handleChange}
        style={{ width: 120, marginBottom: 100 }}
      >
        <Option value="gender">Gender</Option>
        <Option value="age">Age</Option>
        <Option value="occupation">Occupation</Option>
        <Option value="income">Income</Option>
        <Option value="religion">Religion</Option>
        <Option value="marital status">Marital status</Option>
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

export default DemographicsComponent;
