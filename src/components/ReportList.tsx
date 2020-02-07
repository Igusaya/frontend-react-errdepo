import React, { FC, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Fab,
  Card,
  CardContent,
  CircularProgress,
  Button,
  Modal
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';

import { Report } from 'service/backend-django-rest-errdepo/model';
import { ReportOmitted } from 'components/common/ReportComponent';
import Search from 'containers/Search';

/* Styles
 ***********************************************/
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    margin: {
      margin: theme.spacing(1)
    },
    extendedIcon: {
      marginRight: theme.spacing(1)
    },
    center_button_area: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(2)
    },
    conf_card: {
      margin: theme.spacing(1),
      marginBottom: theme.spacing(3),
      '& h6.MuiTypography-root': {
        padding: '0.1em 0.2em',
        color: '#494949',
        background: '#f4f4f4',
        borderLeft: 'solid 5px #7EC2C2',
        borderBottom: 'solid 3px #d7d7d7',
        fontSize: '1rem'
      },
      '& td.code': {
        width: '100%'
      },
      '& pre': {
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1)
      },
      '& code': {
        padding: '2px'
      }
    },
    card_content: {
      paddingTop: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingleft: theme.spacing(2),
      paddingBottom: theme.spacing(0)
    },
    progressDiv: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2)
      },
      justifyContent: 'center'
    },
    button: {
      margin: theme.spacing(0, 0, 1, 1)
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
);
/* Props
 ***********************************************/
export interface ReportListProps {
  getReports: () => void;
  getMoreReports: (url: string) => void;
  reports?: Report[];
  isLoading: boolean;
  nextUrl: string;
}
/* Function component
 ***********************************************/
const ReportList: FC<ReportListProps> = ({
  getReports,
  getMoreReports,
  isLoading,
  reports,
  nextUrl
}) => {
  const [modalOpen, setModalOpen] = React.useState(false);

  useEffect(() => {
    // スクロール位置調整
    window.scroll(0, 0);

    // レポートリストの取得
    if (reports === undefined || reports?.length === 0) {
      getReports();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (nextUrl) {
      window.addEventListener('scroll', handleScroll, true);
      return () => {
        window.removeEventListener('scroll', handleScroll, true);
      };
    }
  }, [nextUrl, isLoading]); // eslint-disable-line react-hooks/exhaustive-deps
  const classes = useStyles();

  const handleScroll = () => {
    if (
      window.pageYOffset >=
        (window.document.body.scrollHeight - window.innerHeight) * 0.9 &&
      !isLoading
    ) {
      getMoreReports(nextUrl);
    }
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  return (
    <>
      <div className={classes.root}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<SearchIcon />}
          onClick={handleModalOpen}
        >
          検索
        </Button>
        {/* TODO: prppsで検索結果表示flgを受け取ってmodalを閉じる*/}
        <Modal
          aria-labelledby="delete-confirm"
          aria-describedby="delete-description"
          open={modalOpen}
          onClose={handleModalClose}
          className={classes.modal}
        >
          <div>
            <Search />
          </div>
        </Modal>

        {/* Out put report list
         ***********************************************/}
        {reports?.map(report => (
          <Card className={classes.conf_card} key={report.id}>
            <CardContent className={classes.card_content}>
              <ReportOmitted
                lang={report.lang}
                fw={report.fw}
                errmsg={report.errmsg}
                descriptionHTML={report.descriptionHTML}
                owner={report.owner}
                modify={report.modify}
              />
            </CardContent>
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
            <CircularProgress variant="determinate" color="secondary" />
          </Card>
        ))}
        {isLoading ? (
          <div className={classes.progressDiv}>
            <CircularProgress color="secondary" />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ReportList;
