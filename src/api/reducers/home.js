const defaultState = {
	recommendList: [],
	recommendBox: {},
	columnConfig: {
		animate: [],
		bangumi: [],
		bangumiWeek: [],
		bangumiCN: [],
		bangumiCNWeek: [],
		music: [],
		dance: [],
		game: [],
		technology: [],
		life: [],
		kichiku: [],
		fashion: [],
		ad: [],
		happy: [],
		movie: [],
		teleplay: [],
		cinephile: [],
		documentary: [],
		specialRecommod: [],
	},
	columnList: {
		animate: [],
		bangumi: [],
		bangumiWeek: [],
		bangumiCN: [],
		bangumiCNWeek: [],
		music: [],
		dance: [],
		game: [],
		technology: [],
		life: [],
		kichiku: [],
		fashion: [],
		ad: [],
		happy: [],
		movie: [],
		teleplay: [],
		cinephile: [],
		documentary: [],
		specialRecommod: [],
	},
	columnLists: [],
	rankList: [],
	bangumiList: [],
}

export const home = (state = defaultState, action) => {
	const { type, data } = action;
	switch (type){
		case 'LOADING_RECOMMEND':
			return {
				...state,
				recommendList: data.recommendList,
				recommendBox: data.recommendBox,
			}
		case 'LOADING_COLUMN_CONFIG':
			return {
				...state,
				columnConfig: data,
			}

		case 'LOADING_COLUMN_ANIMATE_LIST':
			return {
				...state,
				columnList: {
					...state.columnList,
					animate: data,
				},
			}
		case 'LOADING_COLUMN_BANGUMI_LIST':
			return {
				...state,
				columnList: {
					...state.columnList,
					bangumi: data,
				},
			}
		case 'LOADING_COLUMN_BANGUMIWEEK_LIST':
			return {
				...state,
				columnList: {
					...state.columnList,
					bangumiWeek: data,
				},
			}
		case 'LOADING_COLUMN_BANGUMICN_LIST':
			return {
				...state,
				columnList: {
					...state.columnList,
					bangumiCN: data,
				},
			}
		case 'LOADING_COLUMN_BANGUMICNWEEK_LIST':
			return {
				...state,
				columnList: {
					...state.columnList,
					bangumiCNWeek: data,
				},
			}
		case 'LOADING_COLUMN_MUSIC_LIST':
			return {
				...state,
				columnList: {
					...state.columnList,
					music: data,
				},
			}
		case 'LOADING_COLUMN_DANCE_LIST':
			return {
				...state,
				columnList: {
					...state.columnList,
					dance: data,
				},
			}
		case 'LOADING_COLUMN_GAME_LIST':
			return {
				...state,
				columnList: {
					...state.columnList,
					game: data,
				},
			}
		case 'LOADING_COLUMN_TECHNOLOGY_LIST':
			return {
				...state,
				columnList: {
					...state.columnList,
					technology: data,
				},
			}
		case 'LOADING_COLUMN_LIFE_LIST':
			return {
				...state,
				columnList: {
					...state.columnList,
					life: data,
				},
			}
		case 'LOADING_COLUMN_KICHIKU_LIST':
			return {
				...state,
				columnList: {
					...state.columnList,
					kichiku: data,
				},
			}
		case 'LOADING_COLUMN_FASHION_LIST':
			return {
				...state,
				columnList: {
					...state.columnList,
					fashion: data,
				},
			}
		case 'LOADING_COLUMN_AD_LIST':
			return {
				...state,
				columnList: {
					...state.columnList,
					ad: data,
				},
			}
		case 'LOADING_COLUMN_HAPPY_LIST':
			return {
				...state,
				columnList: {
					...state.columnList,
					happy: data,
				},
			}
		case 'LOADING_COLUMN_MOVIE_LIST':
			return {
				...state,
				columnList: {
					...state.columnList,
					movie: data,
				},
			}
		case 'LOADING_COLUMN_TELEPLAY_LIST':
			return {
				...state,
				columnList: {
					...state.columnList,
					teleplay: data,
				},
			}
		case 'LOADING_COLUMN_CINEPHILE_LIST':
			return {
				...state,
				columnList: {
					...state.columnList,
					cinephile: data,
				},
			}
		case 'LOADING_COLUMN_DOCUMENTARY_LIST':
			return {
				...state,
				columnList: {
					...state.columnList,
					documentary: data,
				},
			}

		case 'LOADING_COLUMN_LISTS':
			return {
				...state,
				columnLists: data,
			}
		case 'LOADING_RANK_LIST':
			return {
				...state,
				rankList: data,
			}
		case 'LOADING_BANGUMI_LIST':
			return {
				...state,
				bangumiList: data,
			}
		default:
			return {
				...state,
			}
	}
}
