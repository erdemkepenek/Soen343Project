
const initialState = {
    userProfile: '',
    catalog:[],
    itemProfile:'',
}
export default (state = initialState, action) => {
    switch (action.type) {
        case 'addUserProfile':
            return { ...state, userProfile: action.data };
        case 'catalog':
            return { ...state, catalog: action.data };
        case 'itemProfile':
            return { ...state, itemProfile: action.data };
        default:
            return state;
    }
};