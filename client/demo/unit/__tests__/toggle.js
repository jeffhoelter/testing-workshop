import {mount, render} from 'enzyme'
import React from 'React'
import Toggle from '../toggle'

const renderToggle = (props = {}) => {
  const propsToUse = Object.assign(
    {
      onToggle() {},
      children: 'I am child',
    },
    props,
  )
  return render(<Toggle {...propsToUse} />)
}

const mountToggle = (props = {}) => {
  const propsToUse = Object.assign(
    {
      onToggle() {},
      children: 'I am child',
    },
    props,
  )
  return mount(<Toggle {...propsToUse} />)
}

test('the component renders with defaults', () => {
  const wrapper = renderToggle()
  expect(wrapper).toMatchSnapshotWithGlamor(
    'X. component renders with defaults',
  )
  // console.log(wrapper.text())
  // expect(wrapper.text()).toEqual('hi I am a child')
  // console.log(wrapper.html())
})

test('the onToggle function is called when the button is clicked', () => {
  const onToggle = jest.fn()
  const wrapper = mountToggle({onToggle})
  const button = wrapper.find('[data-test="button"]')
  expect(wrapper).toMatchSnapshotWithGlamor('1. Before Toggle')
  button.simulate('click')
  expect(wrapper).toMatchSnapshotWithGlamor('2. After Toggle')
  expect(onToggle).toHaveBeenCalledTimes(1)
  expect(onToggle).toHaveBeenCalledWith(true)
})
