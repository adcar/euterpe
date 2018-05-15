import React from 'react'
import PageLabel from './PageLabel'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'
test('CardWrapper renders correctly', () => {
	const wrapper = shallow(<PageLabel>Test Page!</PageLabel>)
	expect(toJson(wrapper)).toMatchSnapshot()
})
