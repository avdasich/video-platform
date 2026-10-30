import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import api from './api';
import App from './App';

jest.mock('./api', () => ({
  __esModule: true,
  default: { get: jest.fn() }
}));

test('shows the video platform navigation', async () => {
  api.get.mockResolvedValue({ data: [] });

  render(<App />);

  expect(screen.getByText('YA BRO')).toBeInTheDocument();
  expect(screen.getByText('Вход')).toBeInTheDocument();
  expect(await screen.findByText('Выберите видео из списка')).toBeInTheDocument();
  expect(api.get).toHaveBeenCalledWith('videos/');
});
