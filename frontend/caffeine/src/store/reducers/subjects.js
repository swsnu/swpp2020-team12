import * as actionTypes from '../actions/actionTypes';

const initialState = {
    mySubjectList: [],
    specificSubjectInfo: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_SUBJECTS: {
            return {...state, mySubjectList: action.subjects}
        }
        case actionTypes.GET_SUBJECT:
            return {...state, specificSubjectInfo: action.targetSubject}
        case actionTypes.ADD_SUBJECT:{
            const new_subject = {
                id: action.id,
                name: action.name,
                description: action.description,
                user: action.user,
                days: action.days,

            };
            return {...state, mySubjectList: [...state.mySubjectList, new_subject]};
        }
        case actionTypes.DELETE_SUBJECT:{
            const deleted_subjects = state.mySubjectList.filter((subject) => {
                return subject.id !== action.targetID;
            });
            return {...state, mySubjectList: deleted_subjects};
        }
        case actionTypes.EDIT_SUBJECT:{
            let selected = null;
            const modified = state.mySubjectList.map((sub) => {
                if (sub.id === action.targetID) {
                    selected = {
                        ...sub, name: action.name,
                        description: action.description,
                        user: action.user,
                        days: action.days
                    };
                    return selected;
                } else {
                    return {...sub};
                }
            })
            return {...state, mySubjectList: modified, specificSubjectInfo: selected};
        }
        default:
            break;
    }
    return state;
}

export default reducer;