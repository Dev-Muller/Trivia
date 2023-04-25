import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
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
  it('Testa se o score muda acertando uma questão', async () => {
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
        assertions: 0,
        incorrectAnswers: 0,
      },
    }

    renderWithRouterAndRedux(<App />, initialState, initialEntries);

    const correctAwnser = await screen.findByTestId(/correct-answer/);

    const score = screen.getByTestId('header-score');

    act(() => {
      userEvent.click(correctAwnser);
    });
    
    await waitFor(() => {
      // expect(player.assertions).toBe(1);
      expect(score.innerHTML).toBe("40");
    }, {timeout: 0});

    const wrongAwnser = screen.queryByTestId(/wrong-answer-/);

    await waitFor(() => {
      expect(correctAwnser).toHaveStyle("border: 3px solid rgb(6, 240, 15)");
      expect(wrongAwnser).toHaveStyle("border: 3px solid red");
    }, {timeout: 1000});
  });
  it('Testa se o apos apertar o botao de proxima questao reseta o timer e renderiza proxima questao', async () => {
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
        assertions: 0,
        incorrectAnswers: 0,
      },
    }

    renderWithRouterAndRedux(<App />, initialState, initialEntries);

    const wrongAwnser = await screen.findByTestId(/wrong-answer/);

    act(() => {
      userEvent.click(wrongAwnser);
    });
    
    const nextBtn = screen.getByTestId('btn-next');

    act(() => {
      userEvent.click(nextBtn);
    });

    const timer = screen.getByTestId('question-timer');

    await waitFor(() => {
      expect(timer.innerHTML).toBe("30");
    }, {timeout: 0});
  });
  it('Testa se o apos acabar as questoes vai para a página de feedback', async () => {
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
        assertions: 0,
        incorrectAnswers: 0,
      },
    }

    const { history } = renderWithRouterAndRedux(<App />, initialState, initialEntries);

    // primeira questao
    userEvent.click(await screen.findByTestId(/correct-answer/));
    userEvent.click(await screen.findByTestId('btn-next'));

    // segunda questao
    userEvent.click(await screen.findByTestId(/correct-answer/));
    userEvent.click(await screen.findByTestId('btn-next'));


    // terceira questao
    userEvent.click(await screen.findByTestId(/correct-answer/));
    userEvent.click(await screen.findByTestId('btn-next'));


    // quarta questao
    userEvent.click(await screen.findByTestId(/correct-answer/));
    userEvent.click(await screen.findByTestId('btn-next'));

    // quinta quetao
    userEvent.click(await screen.findByTestId(/correct-answer/));
    userEvent.click(await screen.findByTestId('btn-next'));


    await screen.findByText('Ranking')
    expect(history.location.pathname).toBe('/feedback')

  });
  
  jest.setTimeout(32000)
  it('Testa se o apos apertar o botao de proxima questao reseta o timer e renderiza proxima questao', async () => {
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
        assertions: 0,
        incorrectAnswers: 0,
      },
    }

    renderWithRouterAndRedux(<App />, initialState, initialEntries);
    
    const timer = await screen.findByTestId('question-timer');
    
    await waitFor(() => {
      expect(timer.innerHTML).toBe('0');
    }, {timeout: 32000})

    const nextBtn = await screen.findByTestId('btn-next');
    expect(nextBtn).toBeInTheDocument();
  });
});
