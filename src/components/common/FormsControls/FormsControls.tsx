import React from "react"
import styles from "./FormsControls.module.css"
import {FieldValidatorType} from "../../../utils/validators/validators"
import {Field, WrappedFieldProps} from "redux-form"
import {WrappedFieldMetaProps} from 'redux-form/lib/Field'
import {LoginFormValuesType} from '../../Login/Login';
import { TextField, FormControlLabel, Checkbox } from "@material-ui/core"

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    //const {input, meta, child, ...restProps} = props;
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    //const {input, meta, child, ...restProps} = props;
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><TextField {...input} {...restProps} /></FormControl>
}

export function createField<FormKeysType extends string>(placeholder: string | undefined,
                            name: FormKeysType,
                            validators: Array<FieldValidatorType>,
                            component: React.FC<WrappedFieldProps>,
                            props = {}, text = "") {
    return <div>
        <Field label={placeholder} name={name}
               validate={validators}
               component={component}
               {...props}
        /> {text}
    </div>
}

//@ts-ignore
export const RememberMe = ({input, meta, ...props}) => {

    const hasError = meta.touched && meta.error;
      return(
          <FormControlLabel
              control={
                  <Checkbox
                  {...input}
                  value="Remember me"
                  color="primary"
                  />
              }
              label={props.label} 
          />
      )
}

export type GetStringKeys<T> = Extract<keyof T, string>
