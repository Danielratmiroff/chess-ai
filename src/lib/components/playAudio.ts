import { defensiveAudio, ofensiveAudio } from '$lib/data/audio-files';
import type { MOVE_FLAGS } from '$lib/data/constants';
import type { Chess, Move } from 'chess.js';

type playAudioParams = {
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

export async function playAudioOnMove({ lang, chess, move, isPlayer }: playAudioParams) {
	const audioData = isPlayer ? defensiveAudio : ofensiveAudio;

	// Personalised audio by move type
	// const piece = move.piece;
	// const flags = move.flags as MOVE_FLAGS;

	if (chess.isCheckmate()) {
		const audio = new Audio(audioData[lang].check);
		await playAudio(audio);
		return;
	}

	if (chess.isCheck()) {
		const audio = new Audio(audioData[lang].check);
		await playAudio(audio);
		return;
	}

	if (move.captured) {
		const randomIndex = Math.floor(Math.random() * audioData[lang].move.length);
		const audio = audioData[lang].move[randomIndex];
		await playAudio(new Audio(audio));
	}
}

function playAudio(audio: HTMLAudioElement) {
	return new Promise((res) => {
		audio.play();
		audio.onended = res;
	});
}
