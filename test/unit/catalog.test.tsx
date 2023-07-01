import React from 'react';
import { ExampleApi, CartApi } from '../../src/client/api';
import { initStore } from '../../src/client/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { container } from 'webpack';
import { Application } from '../../src/client/Application';
import { render, fireEvent, screen, within, waitFor, waitForElementToBeRemoved, queryByText, act, getAllByTestId } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Catalog } from '../../src/client/pages/Catalog';
import {server} from '../../src/mocks/server'
import { handlers } from '../../src/mocks/handlers';

describe('тесты страницы Catalog', () => {
  it('проверяет правильность ссылок', async () => {
    const basename = '/hw/store';
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);
    server.use(handlers[0])
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Catalog />
        </BrowserRouter>
      </Provider>
    );

    await waitForElementToBeRemoved(() => queryByText(container, 'LOADING'));

    const productItems = await screen.queryAllByTestId(/data-testid\d+/);

    productItems.forEach((productItem) => {
      const linkElement = productItem.querySelector('a');
      const href = linkElement?.getAttribute('href');
      const dataTestId = linkElement?.getAttribute('data-testid');
      expect(href).toMatch(`/hw/store/catalog/2${dataTestId}`);
    });
  });
});