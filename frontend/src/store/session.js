import { csrfFetch } from "./csrf";

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const SIGNUP_USER = 'session/signupUser';


export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
}

export const removeUser = () => {
    return {
        type: REMOVE_USER,
    }
}


// Login thunk -- POST
export const login = (user) => async (dispatch) => {
    const { email, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })

    const data = await response.json();
    // console.log(data.user)
    dispatch(setUser(data));
    return response;
}

// Restore session user thunk -- GET
export const restoreUserThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/session');

    const data = await response.json();
    dispatch(setUser(data));
    return response;
}

// Sign up user thunk
export const signupThunk = (user) => async (dispatch) => {
    const { firstName, lastName, email, password } = user;
    // console.log(user);
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            password
        })
    })
    // console.log(response)
    const data = await response.json();
    dispatch(setUser(data))
    return response;
}

// Logout user thunk
export const logoutThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })

    // const data = await response.json();
    dispatch(removeUser());
    return response;
}

const initialState = { user: null };

export default function sessionReducer(state = initialState, action) {
    let newState;
    switch(action.type) {
        case SET_USER: {
            newState = {...state};
            newState.user = action.payload;
            return newState;
        }
        case REMOVE_USER: {
            newState = {...state};
            newState.user = null;
            return newState;
        }
        default:
            return state;
    }
}
