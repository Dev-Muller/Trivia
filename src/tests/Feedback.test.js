import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { mockRankingLocalStorage } from './mocks/localMock';


describe('Testar pagina feedback', () => {
  it('Testa se os botoes, nome, score, numero de acertos e imagem estão presentes', async () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockRankingLocalStorage));
    const initialEntries = '/feedback';
    const initialState = { 
      player: {
        token: '53a7f58e97fbd0ca9c2f9c74d3a2896ddef50657af7061519cf86c50f7cf4a2b',
        name: 'asd',
        email: 'asd@email.com',
        score: 0,
      },
    }
    
    renderWithRouterAndRedux(<App />, initialState, initialEntries);

    const rankingBtn = screen.getByTestId('btn-ranking');
    const playerImg = screen.getByAltText(/profile/i);
    const playerEmail = screen.getByRole('heading', {
      name: /asd@email\.com/i,
    });
    const totalQuestions = screen.getByTestId('btn-ranking');
    const headerScore = screen.getByTestId('header-score');
    const btnPlayAgain = screen.getByTestId('btn-play-again');
    const motivacional = screen.getByText(/could be better\.\.\./i);

    expect(rankingBtn).toBeInTheDocument();
    expect(playerImg).toBeInTheDocument();
    expect(playerEmail).toBeInTheDocument();
    expect(totalQuestions).toBeInTheDocument();
    expect(headerScore).toBeInTheDocument();
    expect(btnPlayAgain).toBeInTheDocument();
    expect(motivacional).toBeInTheDocument();
  });
  it('Testa se o botao leva a pagina inicial e reseta os states', async () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockRankingLocalStorage));
    const initialEntries = '/feedback';
    const initialState = { 
      player: {
        token: '53a7f58e97fbd0ca9c2f9c74d3a2896ddef50657af7061519cf86c50f7cf4a2b',
        name: 'asd',
        email: 'asd@email.com',
        score: 0,
      },
    }

    const { history } = renderWithRouterAndRedux(<App />, initialState, initialEntries);

    const btnPlayAgain = await screen.getByTestId('btn-play-again');
    act(() => 
      userEvent.click(btnPlayAgain)
    );
    
    await waitFor(() => {
      expect(history.location.pathname).toBe('/');
    });
  });
  // it('Testa se o botao leva a pagina ranking', async () => {
  //   Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockRankingLocalStorage));
  //   const initialEntries = '/feedback';
  //   const initialState = { 
  //     player: {
  //       token: '53a7f58e97fbd0ca9c2f9c74d3a2896ddef50657af7061519cf86c50f7cf4a2b',
  //       name: 'asd',
  //       email: 'asd@email.com',
  //       score: 0,
  //     },
  //   }

  //   const { history } = renderWithRouterAndRedux(<App />, initialState, initialEntries);

  //   const btnRanking = await screen.getByTestId('btn-ranking');
  //   act(() => 
  //     userEvent.click(btnRanking)
  //   );
    
  //   await waitFor(() => {
  //     expect(history.location.pathname).toBe('/ranking');
  //   });
  // });
});