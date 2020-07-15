import reducer from '../auth';
import * as actionTypes from '../../actions/actionsTypes';

describe('auth reducer', () => {

	describe('Unit tests', () => {
		
		it('should return the initial state', () => {
            expect(reducer(undefined, {})).toEqual({
                    token: null,
                    userId: null,
                    error: null,
                    loading: false
                })
        });

		it('should store the token upon login', () => {
            expect(reducer({
                token: null,
                userId: null,
                error: null,
                loading: false
            }, {
                type: actionTypes.AUTH_SUCCESS,
                idToken: 'token',
                userId: 'id'
            })).toEqual({
                token: 'token',
                userId: 'id',
                error: null,
                loading: false   
            })
        });

	})
});