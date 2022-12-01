import { AIAudioData, playerAudioData } from '$lib/data/audio';
import type { Move } from 'chess.js';

type playAudioParams = {
	move: Move;
	isPlayer: boolean;
};

export function playAudio({ move, isPlayer }: playAudioParams) {
	const { flags } = move;
	const audioData = isPlayer ? playerAudioData : AIAudioData;

	switch (flags) {
		case 'e':
			new Audio(audioData.capture.knight).play();
			break;
		case 'c':
			new Audio(audioData.capture.knight).play();
			break;
		case 'p':
			new Audio(audioData.capture.knight).play();
			break;
		default:
			break;
	}
}
