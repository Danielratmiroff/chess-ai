import { MOVE_FLAGS, PIECES, PST_OPPONENT, PST_SELF, WEIGHTS } from '$lib/data/constants';
import type { Move } from 'chess.js';

/**
 * Evaluates a move and returns the scoreboard
 * Used by our Minimax algorithm to determine the best posible move
 */
export function evaluateBoard(move: Move, prevScore: any, color: any) {
	// todo: prob remove 'a'charcode thingy bc I don't understand it
	let newScore = prevScore;
	console.log(move);
	const from = [8 - parseInt(move.from.charAt(1)), move.from.charCodeAt(0) - 'a'.charCodeAt(0)];
	const to = [8 - parseInt(move.to.charAt(1)), move.to.charCodeAt(0) - 'a'.charCodeAt(0)];

	if (move.captured !== undefined) {
		// Opponent piece was captured
		if (move.color === color) {
			newScore += WEIGHTS[move.captured] + PST_OPPONENT[move.color][move.captured][to[0]][to[1]];
		}
		// Our piece was captured
		else {
			newScore -= WEIGHTS[move.captured] + PST_SELF[move.color][move.captured][to[0]][to[1]];
		}
	}

	if (move.flags.includes(MOVE_FLAGS.PROMOTION)) {
		// NOTE: promote to queen for simplicity
		move.promotion = PIECES.QUEEN;

		// Our piece was promoted
		if (move.color === color) {
			newScore -= WEIGHTS[move.piece] + PST_SELF[move.color][move.piece][from[0]][from[1]];
			newScore += WEIGHTS[move.promotion] + PST_SELF[move.color][move.promotion][to[0]][to[1]];
		}
		// Opponent piece was promoted
		else {
			newScore += WEIGHTS[move.piece] + PST_SELF[move.color][move.piece][from[0]][from[1]];
			newScore -= WEIGHTS[move.promotion] + PST_SELF[move.color][move.promotion][to[0]][to[1]];
		}
	}

	if (move.color !== color) {
		newScore += PST_SELF[move.color][move.piece][from[0]][from[1]];
		newScore -= PST_SELF[move.color][move.piece][to[0]][to[1]];
	} else {
		// substract starting position
		newScore -= PST_SELF[move.color][move.piece][from[0]][from[1]];
		// add ending position
		newScore += PST_SELF[move.color][move.piece][to[0]][to[1]];
	}

	return newScore;
}
