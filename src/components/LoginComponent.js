import { Select } from "antd";
import * as React from "react";

const LoginComponent = ({ setPersonId, usersList }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 150,
        position: "absolute",
        right: 10,
        top: 10,
        textAlign: "center",
      }}
    >
      <img
        style={{ width: 50, height: 50, alignSelf: "center" }}
        src={"../avatar.png"}
      />
      <br />
        <Select
          placeholder="Select user..."
          onChange={function (val) {
            window.location = val;
          }}
        >
          {usersList.map((user) => {
            const path = `/behavior/${user}`;
            return (
              <Select.Option value={path} key={user}>
                {user}
              </Select.Option>
            );
          })}
        </Select>
    </div>
  );
};

export default LoginComponent;
