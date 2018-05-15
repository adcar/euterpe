import React from 'react'
import CardWrapper from './CardWrapper'
import { shallow, mount, render } from 'enzyme'
import toJson from 'enzyme-to-json'

test('CardWrapper renders correctly', () => {
	const wrapper = shallow(<CardWrapper>Test Page!</CardWrapper>)
	expect(toJson(wrapper)).toMatchSnapshot()
})
