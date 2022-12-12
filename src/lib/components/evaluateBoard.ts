import { WEIGHTS } from '$lib/data/constants';
import { PST_BLACK, PST_WHITE } from '$lib/data/table-scores';
import type { Piece } from '$lib/types';
import type { Chess } from 'chess.js';
import { COLOR } from './cm-chessboard/Chessboard';

export function evaluateBoard(game: Chess) {
	if (game.isCheckmate()) {
		return 0;
	}

	if (game.isDraw() || game.isThreefoldRepetition() || game.isStalemate()) {
		return 0;
	}

	const board = game.board();
	let totalEvaluation = 0;
	for (let row = 0; row < 8; row++) {
		for (let col = 0; col < 8; col++) {
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

	const absoluteValue = getAbsoluteValue(piece, x, y, PSTByColor);

	if (piece.color === COLOR.white) {
		return -absoluteValue;
	} else {
		return absoluteValue;
	}
}

const getAbsoluteValue = function (
	piece: Piece,
	x: number,
	y: number,
	PSTByColor: typeof PST_WHITE | typeof PST_BLACK
) {
	if (piece === null) {
		return 0;
	}

	return WEIGHTS[piece.type] + PSTByColor[piece.type][y][x];
};
