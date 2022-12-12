import { defensiveAudio, ofensiveAudio } from '$lib/data/audio-files';
import type { playAudioParams } from '$lib/types';
// import type { MOVE_FLAGS } from '$lib/data/constants';
import type { Chess, Move } from 'chess.js';
const flipACoin = () => Math.random() >= 0.4;

export async function playAudioOnMove({ lang, chess, move, isPlayer }: playAudioParams) {
	const audioData = isPlayer ? defensiveAudio : ofensiveAudio;

	// Personalised audio by move type
	// const piece = move.piece;
	// const flags = move.flags as MOVE_FLAGS;

	if (chess.isCheckmate()) {
		new Audio(audioData[lang].checkMate).play();
		return;
	}

	if (chess.isCheck()) {
		new Audio(audioData[lang].check).play();
		return;
	}

	if (move.captured && flipACoin()) {
		const randomIndex = Math.floor(Math.random() * audioData[lang].move.length);
		const audio = audioData[lang].move[randomIndex];
		new Audio(audio).play();
	}
}
