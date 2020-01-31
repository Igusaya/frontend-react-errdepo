import React, { FC, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Paper, Fab } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link, useParams } from 'react-router-dom';

import { Report } from 'service/backend-django-rest-errdepo/model';
import { Report as ReportComponent } from 'components/common/ReportComponent';

/* Styles
 ***********************************************/
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular
    },
    panel: {
      marginTop: theme.spacing(1)
    },
    pre_line_field: {
      whiteSpace: 'pre-line'
    },
    tg_errmsg: {
      backgroundColor: '#002b36',
      color: '#b2c3c5',
      padding: theme.spacing(1),
      fontSize: '0.8rem'
    },
    paper: {
      padding: theme.spacing(2),
      margin: theme.spacing(2),
      '& .MuiTextField-root': {
        marginTop: theme.spacing(2)
      }
    },
    margin: {
      margin: theme.spacing(1)
    },
    extendedIcon: {
      marginRight: theme.spacing(1)
    },
    center_button_area: {
      display: 'flex',
      justifyContent: 'center'
    }
  })
);
/* Props
 ***********************************************/
export interface ReportProps {
  report?: Report;
}
/* Function component
 ***********************************************/
const ViewReport: FC<ReportProps> = ({ report }) => {
  let { reportId } = useParams();
  useEffect(() => {}, []); // eslint-disable-line react-hooks/exhaustive-deps

  const classes = useStyles();
  return (
    <>
      <Paper>
        <ReportComponent />
      </Paper>
    </>
  );
};

export default ViewReport;
