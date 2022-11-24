import { MOVE_FLAGS, PST_OPPONENT, PST_SELF, WEIGHTS } from '$lib/data/constants';
import { PST_BLACK, PST_WHITE } from '$lib/data/table-scores';
import type { Color, Move, PieceSymbol, Square } from 'chess.js';
import { COLOR } from './cm-chessboard/Chessboard';

/**
 * Evaluates a move and returns the scoreboard
 * Used by our Minimax algorithm to determine the best posible move
 */
type Piece = {
	square: Square;
	type: PieceSymbol;
	color: Color;
};

export function evaluateBoard(chessGame: any) {
	const board = chessGame.board();
	var totalEvaluation = 0;
	// TODO: need to introduce
	// captures and promotions in eval function
	for (var row = 0; row < 8; row++) {
		for (var col = 0; col < 8; col++) {
			totalEvaluation += getPieceValue(board[row][col], row, col);
		}
	}
	return totalEvaluation;
}

function getPieceValue(piece: Piece, x: number, y: number) {
	if (piece === null) {
		return 0;
	}

	const PSTByColor = piece.color === COLOR.white ? PST_WHITE : PST_BLACK;

	var absoluteValue = getAbsoluteValue(piece, x, y, PSTByColor);

	// maybe refactor this
	if (piece.color === COLOR.white) {
		return -absoluteValue;
	} else {
		return absoluteValue;
	}
}

var getAbsoluteValue = function (piece: Piece, x: number, y: number, PSTByColor: any) {
	return WEIGHTS[piece.type] + PSTByColor[piece.type][y][x];
};

// }
// export function evaluateBoard(move: Move, prevScore: any, color: any) {
// 	// todo: prob remove 'a'charcode thingy bc I don't understand it
// 	let newScore = prevScore;
// 	const from = [8 - parseInt(move.from.charAt(1)), move.from.charCodeAt(0) - 'a'.charCodeAt(0)];
// 	const to = [8 - parseInt(move.to.charAt(1)), move.to.charCodeAt(0) - 'a'.charCodeAt(0)];

// 	if (move.captured !== undefined) {
// 		// Opponent piece was captured
// 		if (move.color === color) {
// 			newScore += WEIGHTS[move.captured] + PST_OPPONENT[move.color][move.captured][to[0]][to[1]];
// 		}
// 		// Our piece was captured
// 		else {
// 			newScore -= WEIGHTS[move.captured] + PST_SELF[move.color][move.captured][to[0]][to[1]];
// 		}
// 	}

// 	if (move.flags.includes(MOVE_FLAGS.PROMOTION)) {
// 		// NOTE: promote to queen for simplicity
// 		move.promotion = PIECES.QUEEN;

// 		// Our piece was promoted
// 		if (move.color === color) {
// 			newScore -= WEIGHTS[move.piece] + PST_SELF[move.color][move.piece][from[0]][from[1]];
// 			newScore += WEIGHTS[move.promotion] + PST_SELF[move.color][move.promotion][to[0]][to[1]];
// 		}
// 		// Opponent piece was promoted
// 		else {
// 			newScore += WEIGHTS[move.piece] + PST_SELF[move.color][move.piece][from[0]][from[1]];
// 			newScore -= WEIGHTS[move.promotion] + PST_SELF[move.color][move.promotion][to[0]][to[1]];
// 		}
// 	}

// 	if (move.color !== color) {
// 		newScore += PST_SELF[move.color][move.piece][from[0]][from[1]];
// 		newScore -= PST_SELF[move.color][move.piece][to[0]][to[1]];
// 	} else {
// 		// substract starting position
// 		newScore -= PST_SELF[move.color][move.piece][from[0]][from[1]];
// 		// add ending position
// 		newScore += PST_SELF[move.color][move.piece][to[0]][to[1]];
// 	}

// 	return newScore;
// }
