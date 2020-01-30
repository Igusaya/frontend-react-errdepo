import React, { FC, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Paper, Fab } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { BrowserRouter as Router, Link, useParams } from 'react-router-dom';

import { Report } from 'service/backend-django-rest-errdepo/model';
import { Errmsg, Chips, InnerHTML } from 'commonComponents/ReportComponent';

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
export interface ReportsProps {
  getReports: () => void;
  getReportDetail: (id: number) => void;
  reports?: Report[];
}
/* Function component
 ***********************************************/
const Reports: FC<ReportsProps> = ({
  getReports,
  getReportDetail,
  reports
}) => {
  let { reportId } = useParams();
  console.log(reportId);

  useEffect(() => {
    getReports();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        {reports?.map(report => (
          <Paper key={report.id} className={classes.paper}>
            <Grid container direction="column">
              <Grid item>
                <Chips
                  lang={report.lang}
                  fw={report.fw}
                  user={report.owner}
                  modify={report.modify}
                />
              </Grid>
              <Grid item>
                <Errmsg errmsg={report.errmsg} />
              </Grid>
              <Grid item>
                <InnerHTML html={report.description} />
              </Grid>
              <Grid item>
                <div className={classes.center_button_area}>
                  <Fab
                    variant="extended"
                    size="small"
                    color="primary"
                    aria-label="detail"
                    className={classes.margin}
                    component={Link}
                    to={'/report/' + report.id}
                  >
                    <ExpandMoreIcon className={classes.extendedIcon} />
                    詳細
                  </Fab>
                </div>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </div>
    </>
  );
};

export default Reports;
