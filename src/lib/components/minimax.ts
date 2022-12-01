import type { Chess, Move } from 'chess.js';
import { evaluateBoard } from './evaluateBoard';

// Alpha = best value for MAX
// Beta = best value for MIN
// Depth = depth of search
// Player = current player
// Return value = best move for current player
function minimax(
	game: Chess,
	alpha: number,
	beta: number,
	depth: number,
	maximizingPlayer: boolean
) {
	if (depth === 0) {
		return evaluateBoard(game);
	}

	let bestMove = null;

	const possibleMoves = game.moves({ verbose: true }) as Move[];

	// Sort moves randomly, so the same move isn't always picked on ties
	possibleMoves.sort(() => 0.5 - Math.random());

	for (let move of possibleMoves) {
		game.move(move);
		const value = minimax(game, alpha, beta, depth - 1, !maximizingPlayer);
		game.undo();

		if (maximizingPlayer) {
			if (value > alpha) {
				alpha = value;
				bestMove = move;
			}
		} else {
			if (value < beta) {
				beta = value;
				bestMove = move;
			}
		}

		if (alpha >= beta) {
			break;
		}
	}

	return maximizingPlayer ? alpha : beta;
}

export default minimax;
