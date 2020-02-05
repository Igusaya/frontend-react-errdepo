import React, { FC, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Paper,
  Button,
  Modal,
  Card,
  CardContent,
  Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
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
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    center_button_area: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(2),
      '& a': {
        textDecoration: 'none',
        color: 'rgba(0, 0, 0, 0.87)'
      }
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
  deleteReport: (id: number) => void;
}
/* Function component
 ***********************************************/
const ReportDetail: FC<ReportProps> = ({
  report,
  selectReport,
  getReport,
  deleteReport,
  user_id
}) => {
  const [modalOpen, setModalOpen] = React.useState(false);
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

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  return (
    <>
      <Paper className={classes.paper}>
        {report.owner_id === user_id ? (
          <div>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              data-testid="getConfirm"
              component={Link}
              to={'/put_report'}
            >
              編集
            </Button>

            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              data-testid="deleteModalOpen"
              onClick={handleModalOpen}
            >
              削除
            </Button>

            <Modal
              aria-labelledby="delete-confirm"
              aria-describedby="delete-description"
              open={modalOpen}
              onClose={handleModalClose}
              className={classes.modal}
            >
              <Card>
                <CardContent>
                  <Typography variant="h6">削除のご確認</Typography>
                  <Typography variant="body1">
                    削除しますと紐づくコメント等も全て削除対象となります。
                  </Typography>
                  <Typography variant="body1">
                    本当に削除してもよろしいでしょうか
                  </Typography>
                </CardContent>
                <div className={classes.center_button_area}>
                  <Link to="/">
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      startIcon={<DeleteIcon />}
                      onClick={() => {
                        deleteReport(report.id);
                        handleModalClose();
                      }}
                    >
                      削除 (取り消せません)
                    </Button>
                  </Link>
                </div>
              </Card>
            </Modal>
          </div>
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
