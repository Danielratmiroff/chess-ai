import type { Chess } from 'chess.js';

export function checkStatus(game: Chess, color: string) {
	let status: string = '';
	if (game.isCheckmate()) {
		status = `Checkmate! ${color} lost.`;
	} else if (game.isInsufficientMaterial()) {
		status = `Draw! (Insufficient Material)`;
	} else if (game.isThreefoldRepetition()) {
		status = `Draw! (Threefold Repetition)`;
	} else if (game.isStalemate()) {
		status = `Draw! (Stalemate)`;
	} else if (game.isDraw()) {
		status = `Draw! (50-move Rule)`;
	} else if (game.inCheck()) {
		status = `Check... ${color} in is check`;
		return { status, ended: false };
	} else {
		return { status, ended: false };
	}
	return { status, ended: true };
}
