import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testar pagina de login', () => {
  const initialEntries = '/';
  const initialState = { 
    player: {
      token: '',
      name: '',
      email: '',
    },
  }
  it('Testa se os inputs e botao estao presentes', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, initialEntries);

    expect(history.location.pathname).toBe('/');

    const email = screen.getByTestId('input-gravatar-email');
    const name = screen.getByTestId('input-player-name');
    const playBtn = screen.getByTestId('btn-play');
    const configBtn = screen.getByTestId('btn-settings');

    expect(email).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(playBtn).toBeInTheDocument();
    expect(configBtn).toBeInTheDocument();
  });

  it('Testa se apos preencher os inputs e clicar no botao de play leva ao jogo', async () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, initialEntries);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/');
    });

    const email = screen.getByTestId('input-gravatar-email');
    const name = screen.getByTestId('input-player-name');
    const playBtn = screen.getByTestId('btn-play');

    userEvent.type(email, 'email@email.com');
    userEvent.type(name, 'MeuNome');

    act(() => {
      userEvent.click(playBtn);
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/game');
    }, {timeout: 3000});
  });
  it('Testa se apos preencher os inputs e clicar no botao config leva as configuraçoes', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, initialEntries);

    expect(history.location.pathname).toBe('/');

    const email = screen.getByTestId('input-gravatar-email');
    const name = screen.getByTestId('input-player-name');
    const configBtn = screen.getByTestId('btn-settings');

    userEvent.type(email, 'email@email.com');
    userEvent.type(name, 'MeuNome');

    act(() => {
      userEvent.click(configBtn);
    });

    expect(history.location.pathname).toBe('/config');

    const settingsTitle = screen.getByTestId('settings-title');

    expect(settingsTitle).toBeInTheDocument();
  });
});
