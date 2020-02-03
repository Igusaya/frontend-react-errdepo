import React, { FC, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Paper, Button } from '@material-ui/core';
import { useParams, Link } from 'react-router-dom';

import { Report } from 'service/backend-django-rest-errdepo/model';
import { Report as ReportComponent } from 'components/common/ReportComponent';

/* Styles
 ***********************************************/
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      margin: theme.spacing(2),
      '& .MuiTextField-root': {
        marginTop: theme.spacing(2)
      }
    },
    button: {
      marginBottom: theme.spacing(2),
      marginLeft: theme.spacing(2)
    }
  })
);
/* Props
 ***********************************************/
export interface ReportProps {
  report: Report;
  user_id: number;
  selectReport: (id: number) => void;
  getReport: (id: number) => void;
}
/* Function component
 ***********************************************/
const ReportDetail: FC<ReportProps> = ({
  report,
  selectReport,
  getReport,
  user_id
}) => {
  const { reportId } = useParams();

  useEffect(() => {
    // スクロール位置調整
    window.scroll(0, 0);

    // レポート詳細情報取得判定
    selectReport(Number(reportId));
    if (report.id === -1) {
      getReport(Number(reportId));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const classes = useStyles();
  return (
    <>
      <Paper className={classes.paper}>
        {report.owner_id === user_id ? (
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            className={classes.button}
            data-testid="getConfirm"
            component={Link}
            to={'/put_report'}
          >
            編集
          </Button>
        ) : null}

        <ReportComponent
          lang={report.lang}
          fw={report.fw}
          env={report.env}
          errmsg={report.errmsg}
          descriptionHTML={report.descriptionHTML}
          correspondenceHTML={report.correspondenceHTML}
          owner={report.owner}
          //ownerImage={}
          modify={report.modify}
        />
      </Paper>
    </>
  );
};

export default ReportDetail;
