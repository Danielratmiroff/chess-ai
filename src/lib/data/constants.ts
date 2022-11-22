import { PST_BLACK, PST_WHITE } from './table-scores';

export enum MOVE_FLAGS {
	NON_CAPTURE = 'n',
	PAWN_TWO_SQ = 'b',
	EN_PASSANT_CAPTURE = 'e',
	CAPTURE = 'c',
	PROMOTION = 'p',
	KING_CASTLING = 'k',
	QUEEN_CASTLING = 'q'
}

export enum WEIGHTS {
	p = 100,
	n = 280,
	b = 320,
	r = 479,
	q = 929,
	k = 60000,
	k_e = 60000
}

export const PST_OPPONENT = { w: PST_BLACK, b: PST_WHITE };
export const PST_SELF = { w: PST_WHITE, b: PST_BLACK };
