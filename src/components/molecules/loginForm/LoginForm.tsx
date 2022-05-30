import React from "react";

import Input from "../../atoms/input/Input";
import Button from "../../atoms/button/Button";

const Form: React.FC = () => {
  return (
    <form>
      <Input id={""} name={"username"} type={"text"} placeholder={"Username"} />
      <Input
        id={""}
        name={"password"}
        type={"password"}
        placeholder={"Password"}
      />
      <Button />
    </form>
  );
};

export default Form;
