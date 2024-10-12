import '@testing-library/jest-dom';

import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import nock from 'nock';

import uniqueId from 'lodash/uniqueId';
import App from '../src/components/App.jsx';
import store from '../src/slices/index.js';

test('Work 1', async () => {
  const newTaskText = 'na-na';
  const items = [
    { name: 'test1', id: uniqueId() },
    { name: 'test2', id: uniqueId() },
  ];
  nock('http://localhost').get('/api/tasks').reply(200, { items });
  nock('http://localhost').post('/api/tasks').reply(201, { name: newTaskText, id: uniqueId() });
  nock('http://localhost').delete(`/api/tasks/${items[0].id}`).reply(204, items[0].id);

  const vdom = (
    <Provider store={store}>
      <App />
    </Provider>
  );

  render(vdom);
  items.forEach(async (item) => expect(await screen.findByText(item.name)).toBeInTheDocument());

  const newTaskInput = await screen.getByTestId('input');
  const newTaskSubmit = await screen.getByTestId('submit');

  await userEvent.type(newTaskInput, newTaskText);
  await userEvent.click(newTaskSubmit);

  expect(await screen.findByText(newTaskText)).toBeInTheDocument();
  expect(screen.queryByText('test1')).toBeInTheDocument();

  const closeButtons = await screen.findAllByText('×');
  await userEvent.click(closeButtons[0]);
  await waitFor(async () => {
    await expect(screen.queryByText('test1')).not.toBeInTheDocument();
  }, { timeout: 5000 });
});
