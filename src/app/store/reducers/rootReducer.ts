import { combineReducers } from 'redux';
import { productsSlice } from '../../../entities/product/model';
import { productsApi } from '../../../entities/product/api';
import { cartSlice } from 'entities/cart';
import { userSlice } from 'entities/user';
import { authApi } from 'entities/auth';

export const rootReducer = combineReducers({
	[userSlice.name]: userSlice.reducer,
	[cartSlice.name]: cartSlice.reducer,
	[productsSlice.name]: productsSlice.reducer,
	[authApi.reducerPath]: authApi.reducer,
	[productsApi.reducerPath]: productsApi.reducer,
});
