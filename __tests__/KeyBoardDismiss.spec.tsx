import React from "react";
import renderer from "react-test-renderer";

import { KeyboardDismiss } from "../src/components/UtilComponents/KeyboardDismiss";

test("Renders snapshot as expected", () => {
  const tree = renderer.create(<KeyboardDismiss />).toJSON();
  expect(tree).toMatchSnapshot();
});
