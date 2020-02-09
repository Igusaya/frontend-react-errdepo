import React, { FC, useEffect, useState } from 'react';
import { InjectedFormikProps } from 'formik';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Card, TextField, Fab, Divider } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';
import { FwSet } from 'service/backend-django-rest-errdepo/model';

/* Styles
 ***********************************************/
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      padding: theme.spacing(1, 2, 2, 3),
      '& .MuiFormControl-root': {
        marginTop: theme.spacing(2)
      },
      '& hr': {
        marginTop: theme.spacing(2)
      },
      width: '400px'
    },
    center_button_area: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(2)
    }
  })
);

/* Props
 ***********************************************/
export interface SearchProps {
  search: (param: {
    inputWord?: string[];
    inputLang?: string[];
    inputFw?: string[];
    inputCreater?: string[];
  }) => void;
  getExistsValues: () => void;
  getFw: (lang: string) => void;
  eraseFw: (lang: string) => void;
  langList: string[];
  fwList: FwSet[];
  createrList: string[];
  searchValue: {
    words: string[];
    langs: string[];
    fws: string[];
    creaters: string[];
  };
}

export interface SearchFormValue {
  inputWord: string;
  inputLang: string[];
  inputFw: string[];
  inputCreater: string[];
}

/* Function component
 ***********************************************/
const Search: FC<InjectedFormikProps<SearchProps, SearchFormValue>> = props => {
  const classes = useStyles();
  const [fwListState, setFwListState] = useState(props.fwList);

  /* Use Effect
   ***********************************************/
  useEffect(() => {
    if (props.langList.length === 0 && props.createrList.length === 0) {
      props.getExistsValues();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setFwListState(props.fwList);
  }, [props.fwList]);

  /* Select list
   ***********************************************/
  const langList: string[] = props.langList;
  const fwList: string[] = fwListState.map(val => val.fw);
  const createrList: string[] = props.createrList;

  /* Handler
   ***********************************************/
  const handleFwListOpelation = (value: string[]) => {
    if (fwListState.length === 0) {
      let lang = value[0];
      props.getFw(lang);
      return;
    }
    const langHoziList = fwListState.map(fwSet => {
      return fwSet.lang;
    });
    value.forEach(lang => {
      if (!langHoziList.includes(lang)) {
        props.getFw(lang);
        return;
      }
    });
    setFwListState(
      fwListState.filter(fwSet => {
        if (value.includes(fwSet.lang)) {
          return true;
        }
        props.eraseFw(fwSet.lang);
        return false;
      })
    );
  };

  /* Rturn
   ***********************************************/
  return (
    <>
      <Card className={classes.card}>
        <form
          onSubmit={e => {
            return false;
          }}
        >
          {/* Word
           ***********************************************/}
          <TextField
            id="inputWord"
            name="inputWord"
            label="検索ワード"
            variant="outlined"
            fullWidth
            type="search"
            data-testid="inputWord"
            value={props.values.inputWord}
            onChange={props.handleChange}
          />

          <Divider />

          {/* Lang
           ***********************************************/}
          <Autocomplete
            multiple
            id="inputLangSelecter"
            data-testid="inputLangSelecter"
            options={langList}
            getOptionLabel={option => option}
            noOptionsText="お探しの言語の記事はありません"
            value={props.values.inputLang}
            onChange={(event, value) => {
              props.setFieldValue('inputLang', value);
              handleFwListOpelation(value);
            }}
            renderInput={params => (
              <TextField
                {...params}
                id="inputLang"
                data-testid="inputLang"
                variant="outlined"
                label="言語"
                fullWidth
                value={props.values.inputLang}
                onChange={props.handleChange}
              />
            )}
          />
          {/* Fw
           ***********************************************/}
          <Autocomplete
            multiple
            id="inputFwSelecter"
            data-testid="inputFwSelecter"
            options={fwList}
            getOptionLabel={option => option}
            noOptionsText="お探しのFW・library等の記事はありません"
            value={props.values.inputFw}
            onChange={(event, value) => props.setFieldValue('inputFw', value)}
            renderInput={params => (
              <TextField
                {...params}
                id="inputFw"
                data-testid="inputFw"
                variant="outlined"
                label="FW・library等"
                fullWidth
                value={props.values.inputFw}
                onChange={props.handleChange}
              />
            )}
          />
          {/* Creter
           ***********************************************/}
          <Autocomplete
            multiple
            id="inputCreaterSelecter"
            data-testid="inputCreaterSelecter"
            options={createrList}
            getOptionLabel={option => option}
            noOptionsText="お探しの作成者はおりません"
            value={props.values.inputCreater}
            onChange={(event, value) =>
              props.setFieldValue('inputCreater', value)
            }
            renderInput={params => (
              <TextField
                {...params}
                id="inputCreater"
                data-testid="inputCreater"
                variant="outlined"
                label="作成者"
                fullWidth
                value={props.values.inputCreater}
                onChange={props.handleChange}
              />
            )}
          />

          <Divider />

          {/* Submit
           ***********************************************/}
          <div className={classes.center_button_area}>
            <Fab
              color="primary"
              aria-label="edit"
              data-testid="search-submit"
              onClick={e => {
                props.handleSubmit();
              }}
            >
              <SearchIcon />
            </Fab>
          </div>
        </form>
      </Card>
    </>
  );
};

export default Search;
