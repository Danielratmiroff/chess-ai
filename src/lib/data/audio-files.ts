import type { SupportedLang } from '$lib/components/playAudio';
import { PAWN, type PieceSymbol } from 'chess.js';
import { MOVE_FLAGS } from './constants';

type AudioByMove = {
	[key in MOVE_FLAGS]?: {
		[key in PieceSymbol]?: string;
	};
};

interface IGameAudio extends AudioByMove {
	check: string;
	checkMate: string;
}

type AudioLangBased = {
	[key in SupportedLang]: IGameAudio;
};

export const ofensiveAudio: AudioLangBased = {
	es: {
		check: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
		checkMate: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',

		[MOVE_FLAGS.EN_PASSANT_CAPTURE]: {
			[PAWN]: '$lib/assets/audio/es/voice-spanish.mp3'
		},

		[MOVE_FLAGS.CAPTURE]: {
			[PAWN]: '$lib/assets/audio/es/voice-spanish.mp3'
		},

		[MOVE_FLAGS.PROMOTION]: {
			[PAWN]: '$lib/assets/audio/es/voice-spanish.mp3'
		}
	},
	de: {
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
	},
	en: {
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
	}
};

export const defensiveAudio = { ...ofensiveAudio };
