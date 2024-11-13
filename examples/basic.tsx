import React from "react";
import { Frame } from "../lib";

const Hello = Frame("90vw", "90vh")
  .bg("yellow")
  .fg("black")
  .border(10, { color: "blue" })
  .text(48)
  .element();

export const App = ({ message }: { message: string }) => {
  return <Hello>{message || "Hello World"}</Hello>;
};
