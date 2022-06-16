import React from "react";
import { RadialChart, Hint } from "react-vis";

const TechnographicsComponent = ({ personId }) => {
  const [hovered, setHovered] = React.useState();
  const [data, _] = React.useState([
    { angle: 69, label: "69%", name: "Web", radius: 1 },
    { angle: 31, label: "31%", name: "Mobile", radius: 1 },
  ]);

  return data ? (
    <>
      <RadialChart
        getLabel={(d) => d.label}
        getRadius={(d) => d.radius}
        innerRadius={200}
        showLabels
        radius={300}
        data={data}
        labelsRadiusMultiplier={0.9}
        labelsStyle={{ fontSize: 24, fill: "#222", fontWeight: "bold" }}
        onValueMouseOver={(value) => {
          value.radius = 2;
          setHovered(value);
        }}
        onValueMouseOut={(value) => {
          value.radius = 1;
        }}
        animation="gentle"
        width={1500}
        height={750}
      >
        {hovered && (
          <Hint value={hovered} align={{ vertical: "top", horizontal: "left" }}>
            <div
              style={{
                background: "lightblue",
                paddingLeft: 5,
                paddingRight: 5,
                borderRadius: 5,
                opacity: 0.8,
              }}
            >
              <h3>{hovered.name}</h3>
            </div>
          </Hint>
        )}
      </RadialChart>
    </>
  ) : (
    ""
  );
};

export default TechnographicsComponent;
