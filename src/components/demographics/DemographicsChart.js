import React from "react";
import { XYPlot, VerticalBarSeries, YAxis, Hint, XAxis } from "react-vis";

const DemographicsChart = ({ selectedData, currOption }) => {
  const [hint, setHint] = React.useState(null);

  const dataWithColor = selectedData.map((d, i) => ({
    ...d,
    color: Number(hint && i !== hint.index),
  }));

  return dataWithColor ? (
    <XYPlot width={1200} height={500} animation xType="ordinal">
      <VerticalBarSeries
        data={dataWithColor}
        onNearestX={(value, { index }) => setHint({ value, index })}
      />

      <YAxis />
      <XAxis marginTop={40} style={{fontWeight: 'bold'}} title={currOption} />
      {hint ? (
        <Hint
          value={hint.value}
          align={{ vertical: "top" }}
          style={{ marginBottom: 150, marginLeft: 25 }}
        >
          <div
            style={{
              background: "lightblue",
              paddingLeft: 5,
              paddingRight: 5,
              borderRadius: 5,
              opacity: 0.8
            }}
          >
            <h3>x: {hint.value.x}</h3>
            <p>y: {hint.value.y}</p>
          </div>
        </Hint>
      ) : null}
    </XYPlot>
  ) : (
    ""
  );
};

export default DemographicsChart;
