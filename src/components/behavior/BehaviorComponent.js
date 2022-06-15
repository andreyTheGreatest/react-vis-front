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

const BehaviorComponent = () => {
  // const data = [
  //   { name: "Conscientiousness", angle: 0.16 },
  //   { name: "Extraversion", angle: 0.06 },
  //   { name: "Agreeableness", angle: 0.84 },
  //   { name: "Openness", angle: 0.83 },
  //   { name: "Neuroticism", angle: 0.27 },

  // ];
  const [data, setData] = React.useState(null);
  const [valueIndex, setValueIndex] = React.useState(null);
  const [subData, setSubData] = React.useState(null);

  const iteratee = (acc, curr, index) => {
    console.log(curr, index);
    const subTransformed = curr.child.map((c, i) => ({
      name: chars[index][i],
      angle: c,
    }));
    acc.push({ name: index, angle: curr.value, children: subTransformed });
  };

  React.useEffect(() => {
    if (!data) {
      const transformed = transform(fakeData, iteratee, []);
      setData(transformed);
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
          width: "100%",
          alignContent: "space-between",
        }}
      >
        {data &&
          data.map((each, i) => (
            <BehaviorChart each={each} i={i} setIndex={setValueIndex} />
          ))}
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          alignContent: "space-between",
        }}
      >
        {valueIndex !== null &&
          subData &&
          subData.map((each, i) => {
            return <BehaviorChart each={each} i={i} setIndex={setValueIndex} />;
          })}
      </div>
    </>
  );
};

export default BehaviorComponent;
