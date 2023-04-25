import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { questionsResponse, invalidTokenQuestionsResponse } from '../../cypress/mocks/questions';


describe('Testar pagina de game', () => {
  it('Testa se os botoes, pergunta, header e qual categoria estao presentes', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve(
        questionsResponse,
      ),
    });
    const initialEntries = '/game';
    const initialState = { 
      player: {
        token: '53a7f58e97fbd0ca9c2f9c74d3a2896ddef50657af7061519cf86c50f7cf4a2b',
        name: 'asd',
        email: 'asd@email.com',
        score: 0,
      },
    }

    renderWithRouterAndRedux(<App />, initialState, initialEntries);

    const typeQuestion = await screen.findByTestId('question-category');
    const questionText = screen.getByTestId('question-text');
    const teste = await screen.findAllByTestId(/-answer/);
    const score = screen.getByTestId('header-score');

    expect(typeQuestion).toBeInTheDocument();
    expect(questionText).toBeInTheDocument();
    await waitFor(() => {
      // console.log(questionOptions);
    });
    expect(teste.length).toBeGreaterThanOrEqual(2);
    // expect(questionOptions.length).toBe(4);
    expect(score).toBeInTheDocument();
  });
  it('Testa se o token invalido volta para a Home', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve(
        invalidTokenQuestionsResponse,
      ),
    });
    const initialEntries = '/game';
    const initialState = { 
      player: {
        token: '53a7f58e97fbd0ca9c2f9c74d3a2896ddef50657af7061519cf86c50f7cf4a2b',
        name: 'asd',
        email: 'asd@email.com',
        score: 0,
      },
    }

  const { history } = renderWithRouterAndRedux(<App />, initialState, initialEntries);
  
  await waitFor(() => {
    expect(history.location.pathname).toBe('/');
  });
  });
});