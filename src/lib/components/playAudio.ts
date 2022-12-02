import { defensiveAudio, ofensiveAudio } from '$lib/data/audio';
import type { Chess, Move } from 'chess.js';
import type { MOVE_FLAGS } from '$lib/data/constants';

type playAudioParams = {
	chess: Chess;
	move: Move;
	isPlayer: boolean;
};

export async function playAudioOnMove({ chess, move, isPlayer }: playAudioParams) {
	const flags = move.flags as MOVE_FLAGS;
	const audioData = isPlayer ? defensiveAudio : ofensiveAudio;
	const piece = move.piece;

	if (chess.isCheck()) {
		const audio = new Audio(audioData.check);
		await playAudio(audio);
		return;
	}
	if (chess.isCheckmate()) {
		const audio = new Audio(audioData.check);
		await playAudio(audio);
		return;
	}

	const audio = audioData[flags]?.[piece];

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
