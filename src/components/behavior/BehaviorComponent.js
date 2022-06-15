import { transform } from "lodash";
import React from "react";
import BehaviorChart from "./BehaviorChart";

const fakeData = {
  O: {
    value: 0.12,
    child: [0.13, 0.42, 0.55, 0.64, 0.5],
  },

  C: {
    value: 0.12,
    child: [0.13, 0.42, 0.55, 0.64, 0.5],
  },

  E: {
    value: 0.36,
    child: [0.13, 0.42, 0.55, 0.64, 0.5],
  },

  A: {
    value: 0.12,
    child: [0.13, 0.42, 0.55, 0.64, 0.5],
  },

  N: {
    value: 0.12,
    child: [0.13, 0.42, 0.55, 0.64, 0.5],
  },
};

const chars = {
  O: [
    "Ideas(curiious)",
    "Fantasy(imaginative)",
    "Aesthetic(artistic)",
    "Actions(wide interests)",
    "Feelings(excitable)",
    "Values(unconventional)",
  ],
  C: [
    "Competence(efficient)",
    "Order(organized)",
    "Dutifulness(not careless)",
    "Achievement striving(thorough)",
    "Self-discipline (not lazy)",
    "Deliberation(not impulsive)",
  ],
  E: [
    "Gregariousness(sociable)",
    "Assertiveness(forceful)",
    "Activity(energetic)",
    "Excitement-seeking(adventurous)",
    "Positive emotions (enthusiastic)",
    "Warmth(outgoing)",
  ],
  A: [
    "Trust(forgiving)",
    "Straightforwardness(not demanding)",
    "Altruism (warm)",
    "Compliance(not stubborn)",
    "Modesty(not show-off)",
    "Tender-mindedness(sympathetic)",
  ],
  N: [
    "Anxiety(tense)",
    "Angry hostility(irritable)",
    "Depression(not contented)",
    "Self-consciousness(shy)",
    "Impulsiveness(moody)",
    "Vulnerability(not self-confident)",
  ],
};

const ocean = {
  O: "Openness",
  C: "Conscientiousness",
  E: "Extraversion",
  A: "Agreeableness",
  N: "Neuroticism",
};

const BehaviorComponent = () => {
  const [data, setData] = React.useState(null);
  const [valueIndex, setValueIndex] = React.useState(null);
  const [subData, setSubData] = React.useState(null);

  const iteratee = (acc, curr, index) => {
    console.log(curr, index);
    const subTransformed = curr.child.map((c, i) => ({
      name: chars[index][i],
      angle: c,
    }));
    acc.push({ name: ocean[index], angle: curr.value, children: subTransformed });
  };

  React.useEffect(() => {
    if (!data) {
      fetch("http://127.0.0.1:5000/users/portrait/103")
        .then((response) => response.json())
        .then((acqiuredData) => {
          const transformed = transform(acqiuredData, iteratee, []);
          setData(transformed);
        });
    }
  });

  React.useEffect(() => {
    if (valueIndex !== null) setSubData(data[valueIndex].children);
  }, [valueIndex]);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignContent: "space-between",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        {data &&
          data.map((each, i) => (
            <BehaviorChart each={each} i={i} setIndex={setValueIndex} />
          ))}
      </div>
      {valueIndex !== null && data && (
        <div style={{ width: "100%", textAlign: "center" }}>
          <h3 style={{ textAlign: "center" }}>
            {ocean[data[valueIndex].name]}
          </h3>

          <div
            style={{
              display: "inline-flex",
              alignContent: "space-between",
              border: "1px dotted",
            }}
          >
            {valueIndex !== null &&
              subData &&
              subData.map((each, i) => {
                return (
                  <BehaviorChart each={each} i={i} setIndex={setValueIndex} />
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default BehaviorComponent;
