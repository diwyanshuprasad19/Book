import { applyMiddleware,createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from "redux-thunk";
import reducers from './reducers';


const persistConfig = {
    key: 'Book', // The key in local storage where your persisted state will be saved
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer,{},applyMiddleware(thunk));
const persistor = persistStore(store);

export { store, persistor };