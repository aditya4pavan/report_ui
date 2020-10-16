import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AutoComplete from '../../components/autocomplete';
import { addTable, updateJoin } from '../../actions';

export default function TableView({ data = [] }) {
    const tables = useSelector(state => state.tables);
    const joins = useSelector(state => state.joins);
    const dispatch = useDispatch();

    const handleChange = (evt, val) => {
        dispatch(addTable(val.map(e => e.title), data))
    }

    const handleColumn1 = idx => (evt, val) => {
        dispatch(updateJoin(idx, joins, val.value, undefined))
    }

    const handleColumn2 = idx => (evt, val) => {
        dispatch(updateJoin(idx, joins, undefined, val.value))
    }

    return <React.Fragment>
        <AutoComplete value={tables.map(e => { return { title: e.label } })} onChange={handleChange} title='Select Tables' options={data.map(e => { return { title: e.label } })} />
        {joins.map((e, i) => {
            console.log(i)
            return <React.Fragment key={i}>
                <AutoComplete multiple={false} value={e.column1 ? { title: e.table1 + ':' + e.column1 } : { title: '' }} onChange={handleColumn1(i)} title='Select Column 1' options={data.find(x => x.label === e.table1).columns.map(y => { return { title: e.table1 + ':' + y.label, value: y.label } })} />
                <AutoComplete multiple={false} value={e.column2 ? { title: e.table2 + ':' + e.column2 } : { title: '' }} onChange={handleColumn2(i)} title='Select Column 2' options={data.find(x => x.label === e.table2).columns.map(y => { return { title: e.table2 + ':' + y.label, value: y.label } })} />
            </React.Fragment>
        })}
    </React.Fragment>
}