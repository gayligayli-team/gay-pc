const update_recommend = {
	type: 'LOADING_RECOMMEND'
}
const update_column_config = {
	type: 'LOADING_COLUMN_CONFIG'
}
const update_column_list = {
	animate: {type: 'LOADING_COLUMN_ANIMATE_LIST'},
	bangumi: {type: 'LOADING_COLUMN_BANGUMI_LIST'},
	bangumiWeek: {type: 'LOADING_COLUMN_BANGUMIWEEK_LIST'},
	bangumiCN: {type: 'LOADING_COLUMN_BANGUMICN_LIST'},
	bangumiCNWeek: {type: 'LOADING_COLUMN_BANGUMICNWEEK_LIST'},
	music: {type: 'LOADING_COLUMN_MUSIC_LIST'},
	dance: {type: 'LOADING_COLUMN_DANCE_LIST'},
	game: {type: 'LOADING_COLUMN_GAME_LIST'},
	technology: {type: 'LOADING_COLUMN_TECHNOLOGY_LIST'},
	life: {type: 'LOADING_COLUMN_LIFE_LIST'},
	kichiku: {type: 'LOADING_COLUMN_KICHIKU_LIST'},
	fashion: {type: 'LOADING_COLUMN_FASHION_LIST'},
	ad: {type: 'LOADING_COLUMN_AD_LIST'},
	happy: {type: 'LOADING_COLUMN_HAPPY_LIST'},
	movie: {type: 'LOADING_COLUMN_MOVIE_LIST'},
	teleplay: {type: 'LOADING_COLUMN_TELEPLAY_LIST'},
	cinephile: {type: 'LOADING_COLUMN_CINEPHILE_LIST'},
	documentary: {type: 'LOADING_COLUMN_DOCUMENTARY_LIST'},
	specialRecommod: {type: 'LOADING_COLUMN_SPECIALRECOMMOD_LIST'},
}
const update_column_lists = {
	type: 'LOADING_COLUMN_LISTS'
}
const update_rank_list = {
	animate: {type: 'LOADING_RANK_ANIMATE_LIST'},
	bangumi: {type: 'LOADING_RANK_BANGUMI_LIST'},
	bangumiWeek: {type: 'LOADING_RANK_BANGUMIWEEK_LIST'},
	bangumiCN: {type: 'LOADING_RANK_BANGUMICN_LIST'},
	bangumiCNWeek: {type: 'LOADING_RANK_BANGUMICNWEEK_LIST'},
	music: {type: 'LOADING_RANK_MUSIC_LIST'},
	dance: {type: 'LOADING_RANK_DANCE_LIST'},
	game: {type: 'LOADING_RANK_GAME_LIST'},
	technology: {type: 'LOADING_RANK_TECHNOLOGY_LIST'},
	life: {type: 'LOADING_RANK_LIFE_LIST'},
	kichiku: {type: 'LOADING_RANK_KICHIKU_LIST'},
	fashion: {type: 'LOADING_RANK_FASHION_LIST'},
	ad: {type: 'LOADING_RANK_AD_LIST'},
	happy: {type: 'LOADING_RANK_HAPPY_LIST'},
	movie: {type: 'LOADING_RANK_MOVIE_LIST'},
	teleplay: {type: 'LOADING_RANK_TELEPLAY_LIST'},
	cinephile: {type: 'LOADING_RANK_CINEPHILE_LIST'},
	documentary: {type: 'LOADING_RANK_DOCUMENTARY_LIST'},
	specialRecommod: {type: 'LOADING_RANK_SPECIALRECOMMOD_LIST'},

	rankLists: 'LOADING_RANK_LIST'
}
const update_bangumi_list = {
	type: 'LOADING_BANGUMI_LIST'
}

// ranking
const update_ranking = {
	type: 'UPDATE_RANKING'
}

// video
const update_video_info = {
	type: 'LOADING_VIDEO_INFO'
}


export default {
	update_recommend,
	update_column_config,
	update_column_list,
	update_column_lists,
	update_rank_list,
	update_bangumi_list,

	update_video_info,
	update_ranking,
}