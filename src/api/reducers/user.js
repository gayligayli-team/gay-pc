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
	columnList: [],
	rankList: [],
	bangumiList: [],
}

export const user = (state = defaultState, action) => {
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
		case 'LOADING_COLUMN_LIST':
			return {
				...state,
				columnList: data,
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

// export default reducer