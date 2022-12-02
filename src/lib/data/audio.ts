import { PAWN, type PieceSymbol } from 'chess.js';
import { MOVE_FLAGS } from './constants';

type AudioType = {
	[key in MOVE_FLAGS]?: {
		[key in PieceSymbol]?: string;
	};
};

export const ofensiveAudio: AudioType = {
	[MOVE_FLAGS.EN_PASSANT_CAPTURE]: {
		[PAWN]: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
	}
};

export const defensiveAudio = { ...ofensiveAudio };

// export const AIAudioData = [
// 	{
// 		e: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
// 	}
// ];
