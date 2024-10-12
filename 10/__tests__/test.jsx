import '@testing-library/jest-dom';

import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'whatwg-fetch';
import nock from 'nock';

import uniqueId from 'lodash/uniqueId';
import App from '../src/components/App.jsx';
import store from '../src/services/index.js';

test('Work 1', async () => {
  const newTaskText = 'na-na';
  const items = [
    { text: 'test1', id: uniqueId() },
    { text: 'test2', id: uniqueId() },
  ];
  const newTask = { text: newTaskText, id: uniqueId() };
  nock('http://localhost').get('/api/tasks').reply(200, items);
  nock('http://localhost').post('/api/tasks').reply(201, newTask);
  nock('http://localhost').get('/api/tasks').reply(200, [...items, newTask]);
  nock('http://localhost').delete(`/api/tasks/${newTask.id}`).reply(204, newTask.id);
  nock('http://localhost').get('/api/tasks').reply(200, items);

  const vdom = (
    <Provider store={store}>
      <App />
    </Provider>
  );

  await render(vdom);
  await waitFor(async () => expect(await screen.findByText(items[0].text)).toBeInTheDocument());

  const newTaskInput = await screen.getByTestId('input');
  const newTaskSubmit = await screen.getByTestId('submit');

  await userEvent.type(newTaskInput, newTaskText);
  await userEvent.click(newTaskSubmit);

  expect(await screen.findByText(newTaskText)).toBeInTheDocument();
  expect(screen.queryByText('test1')).toBeInTheDocument();

  await userEvent.click(await screen.findByText(newTaskText));
  await waitFor(async () => expect(screen.queryByText(newTaskText)).not.toBeInTheDocument());
});
