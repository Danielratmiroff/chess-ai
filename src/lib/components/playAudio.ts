import { defensiveAudio, ofensiveAudio } from '$lib/data/audio-files';
import type { Chess, Move } from 'chess.js';
import type { MOVE_FLAGS } from '$lib/data/constants';

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
	const flags = move.flags as MOVE_FLAGS;
	const audioData = isPlayer ? defensiveAudio : ofensiveAudio;
	const piece = move.piece;

	if (chess.isCheck()) {
		const audio = new Audio(audioData[lang].check);
		await playAudio(audio);
		return;
	}
	if (chess.isCheckmate()) {
		const audio = new Audio(audioData[lang].check);
		await playAudio(audio);
		return;
	}

	const audio = audioData[lang][flags]?.[piece];

	if (audio) {
		await playAudio(new Audio(audio));
	}
}

function playAudio(audio: HTMLAudioElement) {
	return new Promise((res) => {
		audio.play();
		audio.onended = res;
	});
}
