export const ADD_TABLE = 'ADD_TABLE'
export const UPDATE_JOIN = 'UPDATE_JOIN'
export const UPDATE_TABLE = 'UPDATE_TABLE'
export const ADD_GROUP = 'ADD_GROUP'
export const ADD_ORDER = 'ADD_ORDER'

export const addTable = (table = [], data = []) => {
    let joins = [];
    for (var i = 0; i < table.length - 1; i++) {
        joins = joins.concat({ table1: table[i], table2: table[i + 1], column1: '', column2: '' })
    }
    const tables = table.map(e => {
        return {
            label: e, columns: data.find(x => x.label === e).columns.map(y => {
                return { ...y, selected: false }
            })
        }
    })
    return {
        type: ADD_TABLE,
        tables,
        joins: joins
    }
}

export const updateJoin = (idx, joins, column1, column2) => {
    const temp = [...joins];
    temp[idx] = { ...temp[idx], column1: column1 || temp[idx].column1, column2: column2 || temp[idx].column2 }
    return {
        type: UPDATE_JOIN,
        joins: temp
    }
}

export const updateTable = (idx, label, checked, tables = [], option, alias) => {
    const temp = [...tables];
    temp[idx].columns.forEach(e => {
        if (e.label === label) {
            e.selected = checked !== undefined ? checked : e.selected;
            e.option = option || e.option;
            e.alias = alias || e.alias;
        }
    })
    return {
        type: UPDATE_TABLE,
        tables: temp
    }
}

export const addGroup = (groups = []) => {
    return {
        type: ADD_GROUP,
        groups
    }
}

export const addOrder = (orders = []) => {
    return {
        type: ADD_ORDER,
        orders
    }
}