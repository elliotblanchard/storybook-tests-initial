// reference: https://testing-library.com/docs/react-testing-library/setup#custom-render
import React from 'react';
import { render } from '@testing-library/react';
import { StylesProvider } from '@material-ui/styles';

const generateClassName = (rule, styleSheet) => `${styleSheet.options.classNamePrefix}-${rule.key}`;

const AllTheProviders = ({ children }) => (
  <StylesProvider generateClassName={generateClassName}>{children}</StylesProvider>
);

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
