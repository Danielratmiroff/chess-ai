import { AIAudioData, playerAudioData } from '$lib/data/audio';
import type { Move } from 'chess.js';

type playAudioParams = {
	move: Move;
	isPlayer: boolean;
};

export async function findAndPlayAudio({ move, isPlayer }: playAudioParams) {
	const { flags } = move;
	const audioData = isPlayer ? playerAudioData : AIAudioData;

	switch (flags) {
		case 'e':
			await playAudio(new Audio(audioData.capture.knight));
			break;
		case 'c':
			await playAudio(new Audio(audioData.capture.knight));
			break;
		case 'p':
			await playAudio(new Audio(audioData.capture.knight));
			break;
		default:
			break;
	}
}

function playAudio(audio: HTMLAudioElement) {
	return new Promise((res) => {
		audio.play();
		audio.onended = res;
	});
}
