import React, { FC, useEffect, useState } from 'react';
import { InjectedFormikProps } from 'formik';
import { Paper, TextField, Button } from '@material-ui/core';
import ReplyIcon from '@material-ui/icons/Reply';
import CreateIcon from '@material-ui/icons/Create';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import { GetConfirmParam, PostReportPram, PutReportPram } from 'actions/report';
import { Report } from 'components/common/ReportComponent';
import { useLocation, Link } from 'react-router-dom';
import { FwSet } from 'service/backend-django-rest-errdepo/model';

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
  getFw: (lang: string) => void;
  getConfirm: (getConfirmParam: GetConfirmParam) => void;
  postReport: (postReportParam: PostReportPram) => void;
  putReport: (putReportParam: PutReportPram) => void;
  langArray?: string[];
  fwArray?: FwSet[];
  lang?: string;
  fw?: string;
  env?: string;
  errmsg?: string;
  description?: string;
  correspondence?: string;
  descriptionHTML?: string;
  correspondenceHTML?: string;
  id?: number;
  isFwLoading: boolean;
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
  const [viewConfirm, setViewConfirm] = useState(false);
  const [disableFw, setDisableFw] = useState(true);
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    // スクロール位置調整
    window.scroll(0, 0);

    // 言語セレクトオプション取得
    props.getLang();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const langAutocompleteProps = {
    options: props.langArray
      ? props.langArray.map(str => {
          return { langName: str };
        })
      : [],
    getOptionLabel: (option: LangOptionType | string) => {
      return typeof option === 'string' ? option : option.langName;
    }
  };
  const fwAutocompleteProps = {
    options: props.fwArray
      ? props.fwArray.map(elm => {
          return { fwName: elm.fw };
        })
      : [],
    getOptionLabel: (option: FwOptionType) => option.fwName
  };

  // 確認画面への遷移制御用
  let hasError =
    props.errors.inputLang || props.errors.inputFw || props.errors.inputErrmsg
      ? true
      : false;
  let isTouched =
    props.touched.inputLang ||
    props.touched.inputFw ||
    props.touched.inputErrmsg
      ? true
      : false;

  const handleFwDesable = (inputVal: string) => {
    setDisableFw(inputVal === '' ? true : false);
  };

  return !viewConfirm ? (
    <>
      {/* input Report
       ***********************************************/}
      <Paper className={classes.paper}>
        <form
          className={classes.root}
          onSubmit={e => {
            props.handleSubmit(e);
            setViewConfirm(!hasError && isTouched);
            window.scroll(0, 0);
          }}
        >
          <Autocomplete
            className={classes.selecter}
            {...langAutocompleteProps}
            id="inputLangSelect"
            data-testid="inputLangSelect"
            noOptionsText="候補はありません"
            inputValue={props.values.inputLang}
            disableClearable
            onChange={(
              // onChangeでrenderInputのTextFieldに値を渡す
              event: React.ChangeEvent<{}>,
              value: { langName: string } | null
            ) => {
              props.setFieldValue('inputLang', value?.langName);
              handleFwDesable(value?.langName || '');
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
                // freeSoloで全角入れるとバグるのでvalue追加で対応
                value={props.values.inputLang}
                onChange={e => {
                  props.handleChange(e);
                  handleFwDesable(e.target.value);
                }}
                onBlur={() => {
                  props.getFw(props.values.inputLang);
                }}
                helperText={props.touched.inputLang && props.errors.inputLang}
                error={
                  props.touched.inputLang && props.errors.inputLang
                    ? true
                    : false
                }
              />
            )}
          />
          <Autocomplete
            className={classes.selecter}
            {...fwAutocompleteProps}
            id="inputFwSelect"
            data-testid="inputFwSelect"
            noOptionsText="候補はありません"
            inputValue={props.values.inputFw}
            disableClearable
            disabled={disableFw}
            loading={props.isFwLoading}
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
                // freeSoloで全角入れるとバグるのでvalue追加で対応
                value={props.values.inputLang}
                onChange={props.handleChange}
                helperText={props.touched.inputFw && props.errors.inputFw}
                error={
                  props.touched.inputFw && props.errors.inputFw ? true : false
                }
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
            onBlur={props.handleBlur}
            helperText={props.touched.inputErrmsg && props.errors.inputErrmsg}
            error={
              props.touched.inputErrmsg && props.errors.inputErrmsg
                ? true
                : false
            }
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
            onBlur={props.handleBlur}
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
            setViewConfirm(false);
            window.scroll(0, 0);
          }}
        >
          戻る
        </Button>
        {location.pathname === '/post_report' ? (
          <Link to="/report/detail">
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
          </Link>
        ) : (
          <Link to={'/report/' + props.id}>
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
          </Link>
        )}
      </Paper>
    </>
  );
};

export default MakeReport;
