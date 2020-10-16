import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import TableView from './tables';
import ColumnsView from './columns';
import CriteriaView from './criteria';

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        flexGrow: 1,
    },
});

export default function ReportView() {
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return <React.Fragment>
        {activeStep === 0 && <TableView data={data} />}
        {activeStep === 1 && <ColumnsView data={data} />}
        {activeStep === 2 && <CriteriaView />}
        <MobileStepper
            variant="dots"
            steps={6}
            position="static"
            activeStep={activeStep}
            className={classes.root}
            nextButton={
                <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
                    Next
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
            }
            backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          Back
        </Button>
            }
        />
    </React.Fragment>
}


const data = [
    {
        label: 'Customers',
        columns: [
            { label: 'CustomerID', type: 'int' },
            { label: 'CustomerName', type: 'string' },
            { label: 'ContactName', type: 'string' },
            { label: 'Address', type: 'string' },
            { label: 'City', type: 'string' },
            { label: 'PostalCode', type: 'int' },
            { label: 'Country', type: 'string' },
        ]
    },
    {
        label: 'Categories',
        columns: [
            { label: 'CategoryID', type: 'int' },
            { label: 'CategoryName', type: 'string' },
            { label: 'Description', type: 'string' },
        ]
    },
    {
        label: 'Employees',
        columns: [
            { label: 'EmployeeID', type: 'int' },
            { label: 'LastName', type: 'string' },
            { label: 'FirstName', type: 'string' },
            { label: 'BirthDate', type: 'date' },
            { label: 'Photo', type: 'string' },
            { label: 'Notes', type: 'string' },
        ]
    }
]