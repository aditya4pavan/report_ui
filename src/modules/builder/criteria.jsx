import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AutoComplete from '../../components/autocomplete';
import { addGroup, addOrder } from '../../actions';

export default function CriteriaView({ data = [] }) {
    const tables = useSelector(state => state.tables);
    const groups = useSelector(state => state.groups);
    const orders = useSelector(state => state.orders);
    const dispatch = useDispatch();

    const handleGroup = (evt, val) => {
        dispatch(addGroup(val.map(e => e.title), data))
    }

    const handleOrder = (evt, val) => {
        dispatch(addOrder(val.map(e => e.title), data))
    }


    const cols = tables.map(e => e.columns.filter(x => x.selected)).flat();

    return <React.Fragment>
        <AutoComplete value={groups.map(e => { return { title: e } })} onChange={handleGroup} title='Group By' options={cols.map(e => { return { title: e.label } })} />
        <AutoComplete value={orders.map(e => { return { title: e } })} onChange={handleOrder} title='Order By' options={cols.map(e => { return { title: e.label } })} />
    </React.Fragment>
}