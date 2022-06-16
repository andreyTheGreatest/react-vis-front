import { Select } from "antd";
import * as React from "react";

const LoginComponent = ({ setPersonId, usersList }) => {
  const inputRef = React.useRef();

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
        src={"avatar.png"}
      />
      <br />
      <Select placeholder="Select user..." onChange={setPersonId}>
        {usersList.map((user) => {
          console.log(user);
          return <Select.Option key={user}>{user}</Select.Option>;
        })}
      </Select>
    </div>
  );
};

export default LoginComponent;
