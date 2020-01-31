import React, { FC } from 'react';
import { Typography, Card, CardContent, Chip, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

/* Styles
 ***********************************************/
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    conf_card: {
      margin: theme.spacing(1),
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
    chip_lang: {
      backgroundColor: '#C0E0FF',
      margin: theme.spacing(0.5)
    },
    chip_fw: {
      backgroundColor: '#F7C9CE',
      margin: theme.spacing(0.5)
    },
    chip_creater: {
      backgroundColor: '#AAA5D1',
      margin: theme.spacing(0.5)
    },
    pre_line_field: {
      whiteSpace: 'pre-line',
      width: '100%'
    },
    tg_errmsg: {
      backgroundColor: '#847f7d',
      color: '#fff',
      padding: theme.spacing(1),
      fontSize: '0.8rem'
    },
    tg_modify: {
      float: 'right'
    }
  })
);

/* Props
 ***********************************************/
export interface ReportProps {
  lang?: string;
  fw?: string;
  env?: string;
  errmsg?: string;
  description?: string;
  correspondence?: string;
}

/* Function component
 ***********************************************/
export const Report: FC<ReportProps> = ({
  lang,
  fw,
  env,
  errmsg,
  description,
  correspondence
}) => {
  const classes = useStyles();
  return (
    <>
      {lang ? <Chips lang={lang} fw={fw} /> : null}
      <Card className={classes.conf_card}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            エラーメッセージ
          </Typography>
          {errmsg ? <Errmsg errmsg={errmsg} /> : null}
        </CardContent>
      </Card>
      <Card className={classes.conf_card}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            環境
          </Typography>
          <div className={classes.pre_line_field}>
            <Typography>{env}</Typography>
          </div>
        </CardContent>
      </Card>
      <Card className={classes.conf_card}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            エラーについて説明
          </Typography>
          {description ? <InnerHTML html={description} /> : null}
        </CardContent>
      </Card>
      <Card className={classes.conf_card}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            対応策
          </Typography>
          {correspondence ? <InnerHTML html={correspondence} /> : null}
        </CardContent>
      </Card>
    </>
  );
};

export const Errmsg: FC<{ errmsg: string }> = ({ errmsg }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.pre_line_field}>
        <Typography className={classes.tg_errmsg}>{errmsg}</Typography>
      </div>
    </>
  );
};

export const Chips: FC<{
  lang: string;
  fw?: string;
  user?: string;
  userImage?: string;
  modify?: string;
}> = ({ lang, fw, user, userImage, modify }) => {
  const classes = useStyles();
  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <Chip size="small" className={classes.chip_lang} label={lang} />
          {fw ? (
            <Chip size="small" className={classes.chip_fw} label={fw} />
          ) : null}
          {user ? (
            <Chip size="small" className={classes.chip_creater} label={user} />
          ) : null}
        </Grid>
        <Grid item xs={6}>
          {modify ? (
            <Typography
              gutterBottom
              className={classes.tg_modify}
              align="right"
              variant="overline"
            >
              {modify}
            </Typography>
          ) : null}
        </Grid>
      </Grid>
    </>
  );
};

export const InnerHTML: FC<{ html: string }> = ({ html }) => {
  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: html
        }}
      />
    </>
  );
};
