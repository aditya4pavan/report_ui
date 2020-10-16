import { ADD_TABLE, UPDATE_JOIN, UPDATE_TABLE, ADD_ORDER, ADD_GROUP } from '../actions';

const initialState = {
    tables: [],
    joins: [],
    groups: [],
    orders: []
}

export default function reportApp(state = initialState, action) {
    switch (action.type) {
        case ADD_TABLE:
            return { ...state, tables: action.tables, joins: action.joins, groups: [], orders: [] }
        case UPDATE_TABLE:
            return { ...state, tables: action.tables }
        case UPDATE_JOIN:
            return { ...state, joins: action.joins }
        case ADD_GROUP:
            return { ...state, groups: action.groups }
        case ADD_ORDER:
            return { ...state, orders: action.orders }
        default:
            return state;
    }
}