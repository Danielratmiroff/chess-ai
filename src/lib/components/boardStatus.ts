import type { Chess } from 'chess.js';

export function checkStatus(game: Chess, color: string) {
	let playerColor: string | undefined;
	let playerColorInCheck: string | undefined;
	if (color === 'w') {
		playerColor = 'white';
		playerColorInCheck = 'black';
	} else {
		playerColor = 'black';
		playerColorInCheck = 'white';
	}
	let status: string = '';
	if (game.isCheckmate()) {
		status = `Checkmate! ${playerColor} lost.`;
	} else if (game.isInsufficientMaterial()) {
		status = `Draw! (Insufficient Material)`;
	} else if (game.isThreefoldRepetition()) {
		status = `Draw! (Threefold Repetition)`;
	} else if (game.isStalemate()) {
		status = `Draw! (Stalemate)`;
	} else if (game.isDraw()) {
		status = `Draw! (50-move Rule)`;
	} else if (game.inCheck()) {
		status = `Check! *${playerColor}* in is check`;
		return { status, ended: false };
	} else {
		return { status, ended: false };
	}
	return { status, ended: true };
}
