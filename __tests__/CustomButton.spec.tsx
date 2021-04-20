import React from "react";
import renderer from "react-test-renderer";

import { CustomButton } from "../src/components/UtilComponents/CustomButton";

test("Renders snapshot as expected", () => {
  const tree = renderer.create(<CustomButton text={"Text"} />).toJSON();
  expect(tree).toMatchSnapshot();
});
