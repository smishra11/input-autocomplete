import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TagInput from '../components/TagInput';

const mockData = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  name: `Tag${i + 1}`,
}));

const setup = (selected = [], setSelected = jest.fn()) => {
  render(<TagInput selectedTag={selected} setSelectedTag={setSelected} />);
};

beforeEach(() => {
  jest.clearAllMocks();
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ data: mockData }),
    })
  );
});

test('renders input and shows empty tag list', async () => {
  setup();
  const input = await screen.findByPlaceholderText(/search/i);
  expect(input).toBeInTheDocument();
});

test('shows suggestions when typing input', async () => {
  setup();
  const input = await screen.findByPlaceholderText(/search/i);
  fireEvent.change(input, { target: { value: 'Tag1' } });

  await waitFor(() => {
    expect(screen.getByText('Tag1')).toBeInTheDocument();
  });
});

test('hides suggestions when input is cleared', async () => {
  setup();
  const input = await screen.findByPlaceholderText(/search/i);
  fireEvent.change(input, { target: { value: 'Tag1' } });

  await waitFor(() => screen.getByText('Tag1'));
  fireEvent.change(input, { target: { value: '' } });

  await waitFor(() => {
    expect(screen.queryByText('Tag1')).not.toBeInTheDocument();
  });
});

test('limits suggestions to 7 items', async () => {
  setup();
  const input = await screen.findByPlaceholderText(/search/i);
  fireEvent.change(input, { target: { value: 'Tag' } });

  await waitFor(() => {
    const items = screen.getAllByRole('option');
    expect(items.length).toBeLessThanOrEqual(7);
  });
});

test('adds tag on suggestion click', async () => {
  const setSelected = jest.fn();
  setup([], setSelected);
  const input = await screen.findByPlaceholderText(/search/i);
  fireEvent.change(input, { target: { value: 'Tag1' } });

  await waitFor(() => screen.getByText('Tag1'));
  fireEvent.click(screen.getByText('Tag1'));

  expect(setSelected).toHaveBeenCalledWith(
    expect.arrayContaining([{ id: 1, name: 'Tag1' }])
  );
});

test('adds tag on pressing Enter', async () => {
  const setSelected = jest.fn();
  setup([], setSelected);
  const input = await screen.findByPlaceholderText(/search/i);
  fireEvent.change(input, { target: { value: 'Tag2' } });

  await waitFor(() => screen.getByText('Tag2'));
  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

  expect(setSelected).toHaveBeenCalledWith(
    expect.arrayContaining([mockData[1]])
  );
});

test('does not add duplicate tags', async () => {
  const setSelected = jest.fn();
  setup([{ id: 1, name: 'Tag1' }], setSelected);
  const input = await screen.findByPlaceholderText(/search/i);
  fireEvent.change(input, { target: { value: 'Tag1' } });

  await waitFor(() => {
    expect(
      screen.queryByRole('option', { name: 'Tag1' })
    ).not.toBeInTheDocument();
  });
});

test('removes tag on backspace when input is empty', async () => {
  const setSelected = jest.fn();
  setup([{ id: 1, name: 'Tag1' }], setSelected);
  const input = await screen.findByPlaceholderText(/search/i);
  fireEvent.keyDown(input, { key: 'Backspace', code: 'Backspace' });

  expect(setSelected).toHaveBeenCalledWith([]);
});

test('navigates with arrow keys and selects with enter', async () => {
  const setSelected = jest.fn();
  setup([], setSelected);
  const input = await screen.findByPlaceholderText(/search/i);
  fireEvent.change(input, { target: { value: 'Tag' } });

  await waitFor(() => screen.getAllByRole('option'));
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  fireEvent.keyDown(input, { key: 'Enter' });

  expect(setSelected).toHaveBeenCalled();
});

test('closes suggestion list on Escape', async () => {
  setup();
  const input = await screen.findByPlaceholderText(/search/i);
  fireEvent.change(input, { target: { value: 'Tag' } });

  await waitFor(() => screen.getByText('Tag1'));
  fireEvent.keyDown(input, { key: 'Escape' });

  await waitFor(() => {
    expect(screen.queryByText('Tag1')).not.toBeInTheDocument();
  });
});

test('shows "No tag found" when no suggestions', async () => {
  const inputText = 'UnknownTag';
  setup();
  const input = await screen.findByPlaceholderText(/search/i);
  fireEvent.change(input, { target: { value: inputText } });

  await waitFor(() => {
    expect(screen.getByText('No tag found')).toBeInTheDocument();
  });
});

test('handles API failure gracefully', async () => {
  global.fetch = jest.fn(() => Promise.reject(new Error('API failed')));
  setup();

  await waitFor(() => {
    expect(screen.getByPlaceholderText('Loading tags...')).toBeInTheDocument();
  });
});
