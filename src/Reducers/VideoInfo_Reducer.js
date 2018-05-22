export default (
  state = {
    selectedVideo: null,
    seasons: [],
    playingVideoUrl: null,
    playingVideoMediaId: null
  },
  action
) => {
  switch (action.type) {
    case "SELECT_VIDEO":
      return {
        ...state,
        selectedVideo: action.video
      };
    case "SET_SEASONS":
      return {
        ...state,
        seasons: action.seasons
      };
    case "SET_VIDEO_URL":
      return {
        ...state,
        playingVideoUrl: action.url
      };
    case "DELETE_VIDEO_URL":
      return {
        ...state,
        playingVideoUrl: null
      };
    case "SET_VIDEO_MEDIA_ID":
      return {
        ...state,
        playingVideoMediaId: action.id
      };
    case "DELETE_VIDEO_MEDIA_ID":
      return {
        ...state,
        playingVideoMediaId: null
      };
    case "TOGGLE_FAVORITE":
      const newChapters = state.seasons[+action.season].chapters.map(video => {
        if (video.media_id === action.id) {
          return { ...video, isFavorite: video.isFavorite === 0 ? 1 : 0 };
        } else return video;
      });
      let newSeasons = state.seasons;
      newSeasons[action.season].chapters = newChapters;
      return {
        ...state,
        seasons: [...newSeasons]
      };
    default:
      return state;
  }
};
