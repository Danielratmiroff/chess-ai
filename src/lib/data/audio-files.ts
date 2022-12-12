import type { SupportedLang } from '$lib/components/playAudio';
import type { MOVE_FLAGS } from './constants';

type AudioByMove = {
	[key in MOVE_FLAGS]?: string[];
	// Personalised audio by move type
	// [key in PieceSymbol]?: string;
};

interface IGameAudio extends AudioByMove {
	check: string;
	checkMate: string;
	move: string[];
}

type AudioLangBased = {
	[key in SupportedLang]: IGameAudio;
};

export const ofensiveAudio: AudioLangBased = {
	// Personalised audio by move type
	// [MOVE_FLAGS.EN_PASSANT_CAPTURE]: {
	// 	[PAWN]: '$lib/assets/audio/es/voice-spanish.mp3'
	// },
	// [MOVE_FLAGS.CAPTURE]: {
	// 	[PAWN]: '$lib/assets/audio/es/voice-spanish.mp3'
	// },

	es: {
		check: 'https://od.lk/s/OTRfNTc0MjEwNjRf/es-check.mp3',
		checkMate: 'https://od.lk/s/OTRfNTc0MjEwNTVf/es-end-1.mp3',
		move: [
			'https://od.lk/s/OTRfNTc0MjEwNTZf/es-end-2.mp3',
			'https://od.lk/s/OTRfNTc0MjEwNTdf/es-end-3.mp3',
			'https://od.lk/s/OTRfNTc0MjEwNThf/es-of-1.mp3',
			'https://od.lk/s/OTRfNTc0MjEwNTlf/es-of-2.mp3',
			'https://od.lk/s/OTRfNTc0MjEwNjBf/es-of-3.mp3',
			'https://od.lk/s/OTRfNTc0MjEwNjFf/es-of-4.mp3',
			'https://od.lk/s/OTRfNTc0MjEwNjNf/es-of-6.mp3'
		]
	},
	de: {
		check: 'https://od.lk/s/OTRfNTc0MjEwNTBf/de-check.mp3',
		checkMate: 'https://od.lk/s/OTRfNTc0MjEwNDZf/de-end-1.mp3',
		move: [
			'https://od.lk/s/OTRfNTc0MjEwNDdf/de-of-1.mp3',
			'https://od.lk/s/OTRfNTc0MjEwNDhf/de-of-2.mp3',
			'https://od.lk/s/OTRfNTc0MjEwNDlf/de-of-3.mp3'
		]
	},
	en: {
		move: [
			'https://od.lk/s/OTRfNTc0MjEwMzFf/en-of-1.mp3',
			'https://od.lk/s/OTRfNTc0MjEwMzJf/en-of-2.mp3',
			'https://od.lk/s/OTRfNTc0MjEwMzNf/en-of-3.mp3',
			'https://od.lk/s/OTRfNTc0MjEwMzRf/en-of-4.mp3',
			'https://od.lk/s/OTRfNTc0MjEwMzVf/en-of-5.mp3',
			'https://od.lk/s/OTRfNTc0MjEwMzJf/en-of-2.mp3',
			''
		],
		check: 'https://od.lk/s/OTRfNTc0MjEwMzZf/en-check.mp3',
		checkMate: 'https://od.lk/s/OTRfNTc0MjEwMzBf/en-end.mp3'
	}
};

export const defensiveAudio: AudioLangBased = {
	es: {
		check: 'https://od.lk/s/OTRfNTc0MjEwNTNf/es-def-2.mp3',
		checkMate: 'https://od.lk/s/OTRfNTc0MjEwNTRf/es-def-3.mp3',

		move: [
			'https://od.lk/s/OTRfNTc0MjEwNjVf/es-def-1.mp3',
			'https://od.lk/s/OTRfNTc0MjEwNTNf/es-def-2.mp3',
			'https://od.lk/s/OTRfNTc0MjEwNjJf/es-of-5.mp3',
			'https://od.lk/s/OTRfNTc0MjEwNTRf/es-def-3.mp3'
		]
	},
	de: {
		move: [
			'https://od.lk/s/OTRfNTc0MjEwNTFf/de-def-1.mp3',
			'https://od.lk/s/OTRfNTc0MjEwNTJf/de-def-2.mp3',
			'https://od.lk/s/OTRfNTc0MjEwNDRf/de-def-3.mp3',
			'https://od.lk/s/OTRfNTc0MjEwNDVf/de-def-4.mp3'
		],
		check: 'https://od.lk/s/OTRfNTc0MjEwNDVf/de-def-4.mp3',
		checkMate: 'https://od.lk/s/OTRfNTc0MjEwNDRf/de-def-3.mp3'
	},
	en: {
		move: [
			'https://od.lk/s/OTRfNTc0MjEwMzdf/en-def-1.mp3',
			'https://od.lk/s/OTRfNTc0MjEwMzhf/en-def-2.mp3',
			'https://od.lk/s/OTRfNTc0MjEwNDBf/en-def-3.mp3',
			'https://od.lk/s/OTRfNTc0MjEwMjlf/en-def-4.mp3',
			''
		],
		check: 'https://od.lk/s/OTRfNTc0MjEwMzhf/en-def-2.mp3',
		checkMate: 'https://od.lk/s/OTRfNTc0MjEwNDBf/en-def-3.mp3'
	}
};
