
const initialState = {
    userProfile: '',
}
export default (state = initialState, action) => {
    switch (action.type) {
        case 'addUserProfile':
            return { ...state, userProfile: action.data };
        default:
            return state;
    }
};