import type { SupportedLang } from '$lib/components/playAudio';
import type { MOVE_FLAGS } from './constants';

type AudioByMove = {
	[key in MOVE_FLAGS]?: string[];
	// Personalised audio by move type
	// [key in PieceSymbol]?: string;
};

// TODO: play the right audio on move
// figure our why automutes
// fix language thingy

interface IGameAudio extends AudioByMove {
	check: string;
	checkMate: string;
	move: string[];
}

type AudioLangBased = {
	[key in SupportedLang]: IGameAudio;
};

const OPEN_DRIVE_ES_URL = 'https://od.lk/s/OTRfNTc0MjEwNTBf/';

export const ofensiveAudio: AudioLangBased = {
	// Personalised audio by move type
	// [MOVE_FLAGS.EN_PASSANT_CAPTURE]: {
	// 	[PAWN]: '$lib/assets/audio/es/voice-spanish.mp3'
	// },
	// [MOVE_FLAGS.CAPTURE]: {
	// 	[PAWN]: '$lib/assets/audio/es/voice-spanish.mp3'
	// },

	es: {
		check: `${OPEN_DRIVE_ES_URL}es-check.mp3`,
		checkMate: `${OPEN_DRIVE_ES_URL}es-end-1.mp3`,

		move: [
			`${OPEN_DRIVE_ES_URL}es-of-1.mp3}`,
			`${OPEN_DRIVE_ES_URL}es-of-2.mp3}`,
			`${OPEN_DRIVE_ES_URL}es-of-3.mp3}`,
			`${OPEN_DRIVE_ES_URL}es-of-4.mp3}`,
			`${OPEN_DRIVE_ES_URL}es-of-5.mp3}`,
			`${OPEN_DRIVE_ES_URL}es-of-6.mp3}`,
			`${OPEN_DRIVE_ES_URL}es-end-2.mp3}`,
			`${OPEN_DRIVE_ES_URL}es-end-3.mp3}`
		]
	},
	de: {
		check: `${OPEN_DRIVE_ES_URL}de-check.mp3}`,
		checkMate: `${OPEN_DRIVE_ES_URL}de-end-1.mp3}`,
		move: [
			`${OPEN_DRIVE_ES_URL}de-of-1.mp3}`,
			`${OPEN_DRIVE_ES_URL}de-of-2.mp3}`,
			`${OPEN_DRIVE_ES_URL}de-of-3.mp3}`
		]
	},
	en: {
		move: [
			`${OPEN_DRIVE_ES_URL}en-of-1.mp3}`,
			`${OPEN_DRIVE_ES_URL}en-of-2.mp3}`,
			`${OPEN_DRIVE_ES_URL}en-of-3.mp3}`,
			`${OPEN_DRIVE_ES_URL}en-of-4.mp3}`,
			`${OPEN_DRIVE_ES_URL}en-of-5.mp3}`
		],
		check: `${OPEN_DRIVE_ES_URL}en-check.mp3}`,
		checkMate: `${OPEN_DRIVE_ES_URL}en-end.mp3}`
	}
};

export const defensiveAudio: AudioLangBased = {
	es: {
		check: `${OPEN_DRIVE_ES_URL}es-check.mp3`,
		checkMate: `${OPEN_DRIVE_ES_URL}es-end-1.mp3`,

		move: [
			`${OPEN_DRIVE_ES_URL}es-def-1.mp3}`,
			`${OPEN_DRIVE_ES_URL}es-def-2.mp3}`,
			`${OPEN_DRIVE_ES_URL}es-def-3.mp3}`
		]
	},
	de: {
		move: [
			`${OPEN_DRIVE_ES_URL}de-def-1.mp3}`,
			`${OPEN_DRIVE_ES_URL}de-def-2.mp3}`,
			`${OPEN_DRIVE_ES_URL}de-def-3.mp3}`,
			`${OPEN_DRIVE_ES_URL}de-def-4.mp3}`
		],
		check: `${OPEN_DRIVE_ES_URL}de-check.mp3}`,
		checkMate: `${OPEN_DRIVE_ES_URL}de-def-4.mp3}`
	},
	en: {
		move: [
			`${OPEN_DRIVE_ES_URL}en-def-1.mp3}`,
			`${OPEN_DRIVE_ES_URL}en-def-2.mp3}`,
			`${OPEN_DRIVE_ES_URL}en-def-3.mp3}`,
			`${OPEN_DRIVE_ES_URL}en-def-4.mp3}`
		],
		check: `${OPEN_DRIVE_ES_URL}en-def-2.mp3}`,
		checkMate: `${OPEN_DRIVE_ES_URL}en-def-3.mp3}`
	}
};
