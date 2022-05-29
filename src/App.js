import React, { useLayoutEffect, useState } from "react";
import { render } from "react-dom";
import "antd/dist/antd.css";
import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Breadcrumb } from "antd";
import DemographicsComponent from "./components/demographics/DemographicsComponent";
import TechnographicsComponent from "./components/technographics/TechnographicsComponent";
import BehaviorComponent from "./components/behavior/BehaviorComponent";
import GeographicsComponent from "./components/geographics/GeographicsComponent";

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

const App = () => {
  const [width, height] = useWindowSize();

  return (
    <BrowserRouter>
      <div className="main">
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="/technographics">Technographics</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/demographics">Demographics</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/geographics">Geographics</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/behavior">Behavior</a>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Routes>
        <Route path="technographics" element={<TechnographicsComponent />} />
        <Route path="behavior" element={<BehaviorComponent />} />
        <Route path="demographics" element={<DemographicsComponent />} />
        <Route path="geographics" element={<GeographicsComponent />} />
      </Routes>

      {/* <DynamicCrosshair /> */}
    </BrowserRouter>
  );
};

export default App;

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
