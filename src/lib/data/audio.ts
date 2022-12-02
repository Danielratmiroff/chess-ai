import { PAWN, type PieceSymbol } from 'chess.js';
import { MOVE_FLAGS } from './constants';

type MoveAudioType = {
	[key in MOVE_FLAGS]?: {
		[key in PieceSymbol]?: string;
	};
};

interface AudioType extends MoveAudioType {
	check: string;
	checkMate: string;
}

export const ofensiveAudio: AudioType = {
	check: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
	checkMate: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',

	[MOVE_FLAGS.EN_PASSANT_CAPTURE]: {
		[PAWN]: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
	},

	[MOVE_FLAGS.CAPTURE]: {
		[PAWN]: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
	},

	[MOVE_FLAGS.PROMOTION]: {
		[PAWN]: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
	}
};

export const defensiveAudio = { ...ofensiveAudio };

// export const AIAudioData = [
// 	{
// 		e: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
// 	}
// ];
