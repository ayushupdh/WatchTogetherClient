import React from "react";
import renderer from "react-test-renderer";

import { Loading } from "../src/components/UtilComponents/Loading";

test("Renders snapshot as expected", () => {
  const tree = renderer.create(<Loading />).toJSON();
  expect(tree).toMatchSnapshot();
});
let findTextElement = function (tree: any, element: any) {
  tree.children.for;
  return true;
};
it("Find A", () => {
  let tree = renderer.create(<Loading />).toJSON();

  expect(findTextElement(tree, "ActivityIndicator")).toBeDefined();
});
