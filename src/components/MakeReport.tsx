import React, { FC, useEffect } from 'react';
import { InjectedFormikProps } from 'formik';
import { Paper, TextField, Button } from '@material-ui/core';
import ReplyIcon from '@material-ui/icons/Reply';
import CreateIcon from '@material-ui/icons/Create';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import { GetConfirmParam, PostReportPram, PutReportPram } from 'actions/report';
import { Report } from 'components/common/ReportComponent';
import { useLocation, Link } from 'react-router-dom';

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
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(2)
    }
  })
);

/* Props
 ***********************************************/
export interface MakeReportProps {
  getLang: () => void;
  //getFw: () => void;
  getConfirm: (getConfirmParam: GetConfirmParam) => void;
  postReport: (postReportParam: PostReportPram) => void;
  putReport: (putReportParam: PutReportPram) => void;
  back: () => void;
  langArray?: string[];
  viewConfirm: boolean;
  lang?: string;
  fw?: string;
  env?: string;
  errmsg?: string;
  description?: string;
  correspondence?: string;
  descriptionHTML?: string;
  correspondenceHTML?: string;
  id?: number;
}
export interface MakeReportFormValue {
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
const MakeReport: FC<InjectedFormikProps<
  MakeReportProps,
  MakeReportFormValue
>> = props => {
  const classes = useStyles();

  useEffect(() => {
    props.getLang();
    // eslint-disable-next-line
  }, []);

  const location = useLocation();

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
        <Report
          lang={props.lang}
          fw={props.fw}
          env={props.env}
          errmsg={props.errmsg}
          descriptionHTML={props.descriptionHTML}
          correspondenceHTML={props.correspondenceHTML}
        />
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
        {location.pathname === '/post_report' ? (
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<CreateIcon />}
            onClick={() => {
              props.postReport({
                lang: props.lang || '',
                fw: props.fw || '',
                env: props.env || '',
                errmsg: props.errmsg || '',
                description: props.description || '',
                correspondence: props.correspondence || '',
                descriptionHTML: props.descriptionHTML || '',
                correspondenceHTML: props.correspondenceHTML || ''
              });
            }}
          >
            投稿
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<CreateIcon />}
            onClick={() => {
              if (props.id === undefined) {
                throw new Error('putReportのパラメーターが不正');
              }
              props.putReport({
                id: props.id,
                lang: props.lang || '',
                fw: props.fw || '',
                env: props.env || '',
                errmsg: props.errmsg || '',
                description: props.description || '',
                correspondence: props.correspondence || '',
                descriptionHTML: props.descriptionHTML || '',
                correspondenceHTML: props.correspondenceHTML || ''
              });
            }}
          >
            編集
          </Button>
        )}
      </Paper>
    </>
  );
};

export default MakeReport;
