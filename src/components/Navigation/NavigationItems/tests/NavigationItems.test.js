import React from 'react';
import { shallow } from 'enzyme';

import NavigationItems from '../NavigationItems';
import NavigationItem from '../NavigationItem/NavigationItem';


const testComponent = <NavigationItems />;

describe('<NavigationItems />', () => {

    describe('Unit tests', () => {
		let wrapper;
		beforeEach(() => {
			wrapper = shallow(testComponent);
		});

		it('should render two <NavigationItem/> elements if not authenticated', () => {
			expect(wrapper.find(NavigationItem)).toHaveLength(2);
		});

		it('should render three <NavigationItem/> elements if authenticated', () => {
			wrapper.setProps({ isAuth: true });
			expect(wrapper.find(NavigationItem)).toHaveLength(3);

		});

		it('should render three <NavigationItem/> elements if authenticated', () => {
			wrapper.setProps({ isAuth: true });
			expect(wrapper.contains(<NavigationItem link='/logout'>Log Out</NavigationItem>)).toEqual(true);

		});

		it('snapshot match', () => {
			expect(wrapper).toMatchSnapshot();
		});	
		
	});
});

