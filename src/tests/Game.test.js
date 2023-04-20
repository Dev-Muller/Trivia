import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testar pagina de game', () => {
  it('Testa se os botoes, pergunta, header e qual categoria estao presentes', () => {
    const initialState = {
      email: '',
      name: '',
    }
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/game');

    expect(history.location.pathname).toBe('/game');

    // const email = screen.getByTestId('input-gravatar-email');
    // const name = screen.getByTestId('input-player-name');
    const typeQuestion = screen.getByTestId('question-category');
    const questionText = screen.getByTestId('question-text');
    const questionOptions = screen.getByTestId('answer-options');

    expect(typeQuestion).toBeInTheDocument();
    expect(questionText).toBeInTheDocument();
    expect(questionOptions.length).toBe(4);
    // expect(configBtn).toBeInTheDocument();
  });

  // it('Testa se apos preencher os inputs e clicar no botao de play leva ao jogo', async () => {
  //   const { history } = renderWithRouterAndRedux(<App />);

  //   expect(history.location.pathname).toBe('/');

  //   const email = screen.getByTestId('input-gravatar-email');
  //   const name = screen.getByTestId('input-player-name');
  //   const playBtn = screen.getByTestId('btn-play');

  //   userEvent.type(email, 'email@email.com');
  //   userEvent.type(name, 'MeuNome');

  //   act(() => {
  //     userEvent.click(playBtn);
  //   });

  //   await waitFor(() => {
  //     expect(history.location.pathname).toBe('/game');
  //   });
  // });
  // it('Testa se apos preencher os inputs e clicar no botao config leva as configuraçoes', () => {
  //   const { history } = renderWithRouterAndRedux(<App />);

  //   expect(history.location.pathname).toBe('/');

  //   const email = screen.getByTestId('input-gravatar-email');
  //   const name = screen.getByTestId('input-player-name');
  //   const configBtn = screen.getByTestId('btn-settings');

  //   userEvent.type(email, 'email@email.com');
  //   userEvent.type(name, 'MeuNome');

  //   act(() => {
  //     userEvent.click(configBtn);
  //   });

  //   expect(history.location.pathname).toBe('/config');

  //   const settingsTitle = screen.getByTestId('settings-title');

  //   expect(settingsTitle).toBeInTheDocument();
  // });
});