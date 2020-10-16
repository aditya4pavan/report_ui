import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { updateTable } from '../../actions';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

export default function ColumnsView() {
    const classes = useStyles();
    const tables = useSelector(state => state.tables);
    const dispatch = useDispatch();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleSelect = (label, idx) => (evt) => {
        dispatch(updateTable(idx, label, evt.target.checked, tables, undefined, undefined));
    }

    const handleAlias = (label, idx) => (evt) => {
        dispatch(updateTable(idx, label, undefined, tables, undefined, evt.target.value));
    }

    const handleOption = (label, idx) => (evt) => {
        dispatch(updateTable(idx, label, undefined, tables, evt.target.value, undefined));
    }

    const getOptions = (type) => {
        if (type === 'int')
            return intOptions
        if (type === 'string')
            return strOptions
        if (type === 'date')
            return dateOptions
        return [];
    }

    return (
        <div className={classes.root}>
            {tables.map((a, idx) => {
                return (
                    <Accordion key={a.label} expanded={expanded === a.label} onChange={handleChange(a.label)}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>{a.label}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormGroup row>
                                {a.columns.map((e, i) => {
                                    const opts = getOptions(e.type)
                                    return <FormControl fullWidth key={i}>
                                        <FormControlLabel
                                            control={<Checkbox checked={e.selected} onChange={handleSelect(e.label, idx)} />}
                                            label={e.label}
                                        />
                                        {e.selected && <React.Fragment>
                                            <TextField label='Alias Name' value={e.alias} onChange={handleAlias(e.label, idx)} />
                                            <Select label='Select Option' value={e.option} onChange={handleOption(e.label, idx)}>
                                                {opts.map(x => {
                                                    return <option key={x.value} value={x.value}>{x.label}</option>
                                                })}
                                            </Select>
                                        </React.Fragment>
                                        }
                                    </FormControl>
                                })}
                            </FormGroup>
                        </AccordionDetails>
                    </Accordion>
                )
            })};
        </div>
    );
}


const intOptions = [
    { label: 'COUNT', value: 'CNT' },
    { label: 'MIN', value: 'MIN' },
    { label: 'MAX', value: 'MAX' },
]

const strOptions = [
    { label: 'UPPER', value: 'UPPER' },
    { label: 'LOWER', value: 'LOWER' }
]

const dateOptions = [
    { label: 'CONVERT', value: 'CONV' }
]