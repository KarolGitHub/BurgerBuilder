import React from "react";
import { shallow } from "enzyme";

import BurgerBuilder from "../BurgerBuilder";
import BuildControls from "../../../components/Burger/BuildControls/BuildControls";

describe("<BurgerBuilder />", () => {
  describe("Unit tests", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<BurgerBuilder onIngredientSet={() => {}} />);
    });

    it("should render <BuildControls /> when receiving ingredients", () => {
      wrapper.setProps({ ings: { salad: 0 } });
      expect(wrapper.find(BuildControls)).toBe({});
    });
  });
});
