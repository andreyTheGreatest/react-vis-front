import * as React from "react";
import { RadialChart } from "react-vis/dist";

const BehaviorChart = ({ each, i, setIndex }) => {
  return (
    <div
      style={{ width: 200 }}
      onClick={() => {
        console.log("click ", i);
        setIndex && setIndex(i);
      }}
    >
      <RadialChart
        colorType="literal"
        animation
        data={[
          { angle: 1 - each.angle, opacity: 0.2 },
          {
            ...each,
            color: "#" + Math.floor(Math.random() * 16777215).toString(16),
          },
        ]}
        width={200}
        height={150}
      />
      <h3 style={{ textAlign: "center" }}>{each.name}</h3>
      <h2 style={{ textAlign: "center" }}>{`${Math.round(
        each.angle * 100
      )}%`}</h2>
    </div>
  );
};

export default BehaviorChart;
