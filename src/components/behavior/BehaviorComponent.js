import React from "react";
import { RadialChart } from "react-vis/dist";

const BehaviorComponent = () => {
  const data = [
    { name: "Conscientiousness", angle: 0.16 },
    { name: "Extraversion", angle: 0.06 },
    { name: "Agreeableness", angle: 0.84 },
    { name: "Openness", angle: 0.83 },
    { name: "Neuroticism", angle: 0.27 },
  ];
  return (
    <div
      style={{ display: "flex", width: "100%", alignContent: "space-between" }}
    >
      {data.map((each, i) => (
        <div style={{ width: 200 }}>
          <RadialChart
            colorType='literal'
            animation
            data={[
              { angle: 1 - each.angle, opacity: 0.2 },
              { ...each, color: '#' + Math.floor(Math.random()*16777215).toString(16) },
            ]}
            width={200}
            height={150}
          />
          <h3 style={{ textAlign: "center" }}>{each.name}</h3>
          <h2 style={{ textAlign: "center" }}>{`${each.angle * 100}%`}</h2>
        </div>
      ))}
    </div>
  );
};

export default BehaviorComponent;
