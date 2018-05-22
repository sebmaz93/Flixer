const videosReducerDefaultState = {
  banners: [],
  stories: [],
  sections: {}
};
export default (state = videosReducerDefaultState, action) => {
  switch (action.type) {
    case "INITALIZE_HOME":
      const home = action.data.reduce((result, item, index) => {
        //switch the data sections
        switch (item.type) {
          case "section":
            return {
              ...result,
              sections: {
                ...result.sections,
                [item.title]: item.content
              }
            };
          default:
            return {
              ...result,
              [item.type]: item.content
            };
        }
        return result;
      }, {});
      return {
        ...state,
        ...home
      };

    // case "TOGGLE_FAVORITE":
    //   let isFavorite = false;
    //   let favoriteVideo = {};
    //   const toggledHome = state.home[action.title].map(video => {
    //     if (video.id === action.video.id) {
    //       isFavorite = !video.isFavorite;
    //       video.isFavorite = !video.isFavorite;
    //       //to make the favoriteVideo have the same property isFavorite the changed one
    //       //before pushing it into the favorite array
    //       favoriteVideo = video;
    //     }
    //     return video;
    //   });
    //   if (isFavorite) {
    //     return {
    //       ...state,
    //       home: { ...state.home, [action.title]: toggledHome },
    //       favorite: [...state.favorite, favoriteVideo]
    //     };
    //   }
    //   return {
    //     ...state,
    //     home: { ...state.home, [action.title]: toggledHome },
    //     favorite: state.favorite
    //       .slice()
    //       .filter(video => !(video.id === action.video.id))
    //   };

    // case "REMOVE_FAVORITE":
    //   const removeFavoriteHome = Object.keys(state.home).reduce(
    //     (result, key) => {
    //       return {
    //         ...result,
    //         [key]: state.home[key].slice().map(video => {
    //           if (video.id === action.id) {
    //             video.isFavorite = !video.isFavorite;
    //           }
    //           return video;
    //         })
    //       };
    //       state.home[key];
    //     },
    //     {}
    //   );
    //   return {
    //     ...state,
    //     home: removeFavoriteHome,
    //     favorite: state.favorite
    //       .slice()
    //       .filter(video => !(video.id === action.id))
    //   };

    // case "SELECT_VIDEO":
    //   return {
    //     ...state,
    //     selectedVideo: action.video
    //   };

    default:
      return state;
  }
};
