import type { Chess, Color, Move, PieceSymbol, Square } from 'chess.js';
import type { MOVE_FLAGS } from './data/constants';

export type AlphaBetaReturn = [bestScore: number, bestMove: Move | null];

export type AlphaBeta = {
	game: Chess;
	alpha: number;
	beta: number;
	depth: number;
	maximizingPlayer: boolean;
};

export type playAudioParams = {
	chess: Chess;
	move: Move;
	lang: SupportedLang;
	isPlayer: boolean;
};

export enum SupportedLang {
	DE = 'de',
	EN = 'en',
	ES = 'es'
}

type AudioByMove = {
	[key in MOVE_FLAGS]?: string[];
	// Personalised audio by move type
	// [key in PieceSymbol]?: string;
};

interface IGameAudio extends AudioByMove {
	check: string;
	checkMate: string;
	move: string[];
}

export type AudioLangBased = {
	[key in SupportedLang]: IGameAudio;
};

export type Piece = {
	square: Square;
	type: PieceSymbol;
	color: Color;
} | null;
