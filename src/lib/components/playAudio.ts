import { defensiveAudio, ofensiveAudio } from '$lib/data/audio';
import type { Move } from 'chess.js';
import type { MOVE_FLAGS } from '$lib/data/constants';

type playAudioParams = {
	move: Move;
	isPlayer: boolean;
};

export async function playAudioOnMove({ move, isPlayer }: playAudioParams) {
	const flags = move.flags as MOVE_FLAGS;
	const audioData = isPlayer ? defensiveAudio : ofensiveAudio;
	const piece = move.piece;

	const audio = audioData[flags]?.[piece];
	if (audio) {
		await playAudio(new Audio(audio));
	} else {
		throw new Error('No audio found');
	}
}

function playAudio(audio: HTMLAudioElement) {
	return new Promise((res) => {
		audio.play();
		audio.onended = res;
	});
}
