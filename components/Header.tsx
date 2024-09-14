import React from "react";
import { Logo } from "./Logo";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <div className="  p-3  flex justify-between ">
      <Logo />
      <Button className=" text-sm" size={"sm"}>
        Sign in
      </Button>
    </div>
  );
};
