import React, { FC, useEffect } from 'react';
import { InjectedFormikProps } from 'formik';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Chip
} from '@material-ui/core';
import ReplyIcon from '@material-ui/icons/Reply';
import CreateIcon from '@material-ui/icons/Create';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import { GetConfirmParam, PostReportPram } from './action';

/* Styles
 ***********************************************/
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {}
    },
    paper: {
      padding: theme.spacing(2),
      '& .MuiTextField-root': {
        marginTop: theme.spacing(2)
      }
    },
    selecter: {
      width: 200,
      marginTop: theme.spacing(1)
    },
    button: {
      marginTop: theme.spacing(2)
    },
    comf_table: {
      minWidth: 200,
      maxWidth: 300,
      '& th, td': {
        border: 'solid 1px #ccc'
      }
    },
    conf_card: {
      margin: theme.spacing(1),
      '& h6.MuiTypography-root': {
        padding: '0.1em 0.2em',
        color: '#494949',
        background: '#f4f4f4',
        borderLeft: 'solid 5px #9cd495',
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
      backgroundColor: '#95bad4',
      margin: theme.spacing(0.5)
    },
    chip_fw: {
      backgroundColor: '#d0d495',
      margin: theme.spacing(0.5)
    },
    chip_creater: {
      backgroundColor: '#9cd495',
      margin: theme.spacing(0.5)
    },
    pre_line_field: {
      whiteSpace: 'pre-line'
    },
    tg_errmsg: {
      backgroundColor: '#002b36',
      color: '#b2c3c5',
      padding: theme.spacing(1),
      fontSize: '0.8rem'
    }
  })
);

/* Props
 ***********************************************/
export interface ReportProps {
  getLang: () => void;
  //getFw: () => void;
  getConfirm: (getConfirmParam: GetConfirmParam) => void;
  postReport: (postReportParam: PostReportPram) => void;
  back: () => void;
  langArray?: string[];
  viewConfirm: boolean;
  lang?: string;
  fw?: string;
  env?: string;
  errmsg?: string;
  description?: string;
  correspondence?: string;
}
export interface ReportFormValue {
  inputLang: string;
  inputFw: string;
  inputEnv: string;
  inputErrmsg: string;
  inputDescription: string;
  inputCorrespondence: string;
}

interface LangOptionType {
  langName: string;
}
interface FwOptionType {
  fwName: string;
}

/* Function component
 ***********************************************/
const PostReport: FC<InjectedFormikProps<
  ReportProps,
  ReportFormValue
>> = props => {
  const classes = useStyles();

  useEffect(() => {
    props.getLang();
    // eslint-disable-next-line
  }, []);

  const langAutocompleteProps = {
    options: props.langArray
      ? props.langArray.map(str => {
          return { langName: str };
        })
      : [],
    getOptionLabel: (option: LangOptionType) => option.langName
  };

  const fwAutocompleteProps = {
    options: [],
    getOptionLabel: (option: FwOptionType) => option.fwName
  };

  return !props.viewConfirm ? (
    <>
      {/* input Report
       ***********************************************/}
      <Paper className={classes.paper}>
        <form className={classes.root} onSubmit={props.handleSubmit}>
          <Autocomplete
            className={classes.selecter}
            {...langAutocompleteProps}
            id="inputLangSelect"
            data-testid="inputLangSelect"
            inputValue={props.values.inputLang}
            onChange={(
              // onChangeでrenderInputのTextFieldに値を渡す
              event: React.ChangeEvent<{}>,
              value: { langName: string } | null
            ) => {
              props.setFieldValue('inputLang', value?.langName);
            }}
            renderInput={params => (
              <TextField
                {...params}
                id="inputLang"
                data-testid="inputLang"
                name="inputLang"
                label="言語"
                margin="normal"
                fullWidth
                onChange={props.handleChange}
              />
            )}
          />
          <Autocomplete
            className={classes.selecter}
            {...fwAutocompleteProps}
            id="inputFwSelect"
            data-testid="inputFwSelect"
            freeSolo
            inputValue={props.values.inputFw}
            onChange={(
              event: React.ChangeEvent<{}>,
              value: FwOptionType | null
            ) => {
              props.setFieldValue('inputFw', value?.fwName);
            }}
            renderInput={params => (
              <TextField
                {...params}
                id="inputFw"
                data-testid="inputFw"
                name="inputFw"
                label="FW・library 等"
                margin="normal"
                fullWidth
                onChange={props.handleChange}
              />
            )}
          />
          <TextField
            id="inputEnv"
            name="inputEnv"
            label="環境"
            multiline
            variant="filled"
            rows="4"
            fullWidth
            data-testid="inputEnv"
            value={props.values.inputEnv}
            onChange={props.handleChange}
          />
          <TextField
            id="inputErrmsg"
            label="エラーメッセージ"
            multiline
            variant="filled"
            rows="2"
            fullWidth
            data-testid="inputErrmsg"
            value={props.values.inputErrmsg}
            onChange={props.handleChange}
          />
          <TextField
            id="inputDescription"
            label="説明"
            multiline
            variant="filled"
            rows="2"
            fullWidth
            data-testid="inputDescription"
            value={props.values.inputDescription}
            onChange={props.handleChange}
          />
          <TextField
            id="inputCorrespondence"
            label="対応策"
            multiline
            variant="filled"
            rows="2"
            fullWidth
            data-testid="inputCorrespondence"
            value={props.values.inputCorrespondence}
            onChange={props.handleChange}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.button}
            data-testid="getConfirm"
            onChange={props.handleChange}
          >
            確認
          </Button>
        </form>
      </Paper>
    </>
  ) : (
    <>
      {/* confirm Report
       ***********************************************/}
      <Paper className={classes.paper}>
        <Chip size="small" className={classes.chip_lang} label={props.lang} />
        {props.fw ? (
          <Chip size="small" className={classes.chip_fw} label={props.fw} />
        ) : null}
        <Chip size="small" className={classes.chip_creater} label="user予定" />

        <Card className={classes.conf_card}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              エラーメッセージ
            </Typography>
            <div className={classes.pre_line_field}>
              <Typography className={classes.tg_errmsg}>
                {props.errmsg}
              </Typography>
            </div>
          </CardContent>
        </Card>
        <Card className={classes.conf_card}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              環境
            </Typography>
            <div className={classes.pre_line_field}>
              <Typography>{props.env}</Typography>
            </div>
          </CardContent>
        </Card>
        <Card className={classes.conf_card}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              エラーについて説明
            </Typography>
            <div
              dangerouslySetInnerHTML={{
                __html: props.description || ''
              }}
            />
          </CardContent>
        </Card>
        <Card className={classes.conf_card}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              対応策
            </Typography>
            <div
              dangerouslySetInnerHTML={{
                __html: props.correspondence || ''
              }}
            />
          </CardContent>
        </Card>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<ReplyIcon />}
          onClick={() => {
            props.back();
          }}
        >
          戻る
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<CreateIcon />}
          onClick={() => {
            console.log('click create');
            props.postReport({
              lang: props.lang || '',
              fw: props.fw || '',
              env: props.env || '',
              errmsg: props.errmsg || '',
              description: props.description || '',
              correspondence: props.correspondence || ''
            });
          }}
        >
          投稿
        </Button>
      </Paper>
    </>
  );
};

export default PostReport;
