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
import LoginComponent from "./components/LoginComponent";

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

const fakeUsersList = {
  UserIds: [1, 12, 103],
};

const App = () => {
  const [personId, setPersonId] = React.useState(null);
  const [usersList, setUsersList] = React.useState([]);

  React.useEffect(() => {
    if (usersList.length === 0)
      fetch("http://127.0.0.1:5000/users")
        .then((response) => response.json())
        .then((data) => setUsersList(data.UserIds))
        .catch((_) => setUsersList(fakeUsersList.UserIds));
  });

  return (
    <BrowserRouter>
      <div className="main">
        <LoginComponent setPersonId={setPersonId} usersList={usersList} />
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
        <Route
          path="technographics"
          element={<TechnographicsComponent personId={personId} />}
        />
        <Route
          path="behavior"
          element={<BehaviorComponent personId={personId} />}
        />
        <Route
          path="demographics"
          element={<DemographicsComponent personId={personId} />}
        />
        <Route
          path="geographics"
          element={<GeographicsComponent personId={personId} />}
        />
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
