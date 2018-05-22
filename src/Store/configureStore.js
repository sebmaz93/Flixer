import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import HomeReducer from "../Reducers/Home_Reducer";
import filtersReducer from "../Reducers/Filters_Reducer";
import subtitleReducer from "../Reducers/Subtitle_Reducer";
import AuthReducer from "../Reducers/AuthReducer";
import VideoInfoReducer from "../Reducers/VideoInfo_Reducer";
import FavoriteVideosReducer from "../Reducers/FavoriteList_Reducer";
import SearchReducer from "../Reducers/Search_Reducer";
import SpinnerReducer from "../Reducers/Spinner_Reducer";
import ErrorReducer from "../Reducers/Error_Reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  //Store Creation

  const store = createStore(
    combineReducers({
      home: HomeReducer,
      filters: filtersReducer,
      subtitle: subtitleReducer,
      auth: AuthReducer,
      video: VideoInfoReducer,
      favoriteList: FavoriteVideosReducer,
      search: SearchReducer,
      spinner: SpinnerReducer,
      error: ErrorReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
