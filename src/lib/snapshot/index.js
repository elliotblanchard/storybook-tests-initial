import { render } from '../testing/testing-library';

const snapshot = Component => {
  const { asFragment } = render(Component);
  expect(asFragment()).toMatchSnapshot();
};

export default snapshot;
