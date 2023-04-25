import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { emptyMockRanking, mockRankingLocalStorage } from './mocks/localMock';


describe('Testar pagina ranking', () => {
  it('Testa se os botao, nome, score, imagem e Ranking estão presentes', async () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockRankingLocalStorage));
    const initialEntries = '/ranking';
    const initialState = { 
      player: {
        token: '53a7f58e97fbd0ca9c2f9c74d3a2896ddef50657af7061519cf86c50f7cf4a2b',
        name: 'asd',
        email: 'asd@email.com',
        score: 0,
      },
    }
    
    renderWithRouterAndRedux(<App />, initialState, initialEntries);

    const ranking = screen.getByTestId('ranking-title');
    const playerImg = screen.getByAltText(/player/i);
    const playerName = screen.getAllByTestId(/player-name-/);
    const playerScore = screen.getAllByTestId(/player-score-/);
    const btnPlayAgain = screen.getByTestId('btn-go-home');

    expect(ranking).toBeInTheDocument();
    expect(playerImg).toBeInTheDocument();
    expect(playerName[0]).toBeInTheDocument();
    expect(playerScore[0]).toBeInTheDocument();
    expect(btnPlayAgain).toBeInTheDocument();
  });
  it('Testa se o botao leva a pagina inicial e reseta os states', async () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockRankingLocalStorage));
    const initialEntries = '/ranking';
    const initialState = { 
      player: {
        token: '53a7f58e97fbd0ca9c2f9c74d3a2896ddef50657af7061519cf86c50f7cf4a2b',
        name: 'asd',
        email: 'asd@email.com',
        score: 0,
      },
    }

    const { history } = renderWithRouterAndRedux(<App />, initialState, initialEntries);

    const btnPlayAgain = await screen.getByTestId('btn-go-home');
    act(() => 
    userEvent.click(btnPlayAgain)
    );
    
    await waitFor(() => {
    expect(history.location.pathname).toBe('/');
    });
  });
  it('Testa a validação de ranking', async () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(emptyMockRanking));
    const initialEntries = '/ranking';
    const initialState = { 
      player: {
        token: '53a7f58e97fbd0ca9c2f9c74d3a2896ddef50657af7061519cf86c50f7cf4a2b',
        name: 'asd',
        email: 'asd@email.com',
        score: 0,
      },
    }

    renderWithRouterAndRedux(<App />, initialState, initialEntries);

    const playerName = screen.queryAllByTestId(/player-name-/);

    expect(playerName.length).toBe(0);
  });
});