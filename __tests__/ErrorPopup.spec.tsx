import React from "react";
import renderer from "react-test-renderer";

import { ErrorPopup } from "../src/components/UtilComponents/ErrorPopup";

test("Renders snapshot as expected", () => {
  const tree = renderer.create(<ErrorPopup error={"error"} />).toJSON();
  expect(tree).toMatchSnapshot();
});
