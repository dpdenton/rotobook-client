import * as React from 'react';
import {connect} from "react-redux";
import {ToastContainer, toast} from 'react-toastify';

import Input from "../components/Input";
import TextArea from "../components/TextArea";

import {parseFormData} from "../utils";
import {Employee, Validator} from "../types/";
import {EmployeeAttribute, Entities} from "../types/enums";

import {FormEntity} from "../reducers/forms";
import {getEmployeeFieldValidators} from "../config/forms";

import {
    FormInterface,
    setFormFieldValue,
    pushFormFieldError,
    removeFormFieldError,
    postEmployeeForm,
    clearFormData
} from "../actions/forms";

interface FormContainerProps {
    errors: string[]
    completed: boolean[]
    employee: FormEntity<Employee>
    setFormFieldValue: (payload: FormInterface) => void
    pushFormFieldError: (payload: FormInterface) => void
    removeFormFieldError: (payload: FormInterface) => void
    postEmployeeForm: (data: Employee) => any
    clearFormData: (payload: Partial<FormInterface>) => void
}

export interface EventInterface {
    validators: Validator[],
    name: EmployeeAttribute,
    value: string
    errors: string[]
}

class FormContainer extends React.Component<FormContainerProps> {

    constructor(props: FormContainerProps) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onInputBlur = this.onInputBlur.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
    }

    public render() {

        const {employee, errors, completed} = this.props;

        // checks if any errors or all forms completed.
        const submitDisabled = errors.length > 0 || completed.indexOf(false) !== -1;

        return (
            <div>
                <form
                    onSubmit={this.handleSubmit}
                >
                    <Input
                        {...employee.name}
                        label={'Name *'}
                        placeholder={'Enter your full name'}
                        name={EmployeeAttribute.Name}
                        onChange={this.onInputChange}
                        onBlur={this.onInputBlur}
                        validators={getEmployeeFieldValidators(EmployeeAttribute.Name)}
                    />

                    <Input
                        {...employee.email}
                        label={'Email *'}
                        placeholder={'Enter your full email'}
                        name={EmployeeAttribute.Email}
                        onChange={this.onInputChange}
                        onBlur={this.onInputBlur}
                        validators={getEmployeeFieldValidators(EmployeeAttribute.Email)}
                    />

                    <TextArea
                        {...employee.message}
                        label={'Message *'}
                        placeholder={"What's your favourite saying?"}
                        name={EmployeeAttribute.Message}
                        onChange={this.onInputChange}
                        onBlur={this.onInputBlur}
                        validators={getEmployeeFieldValidators(EmployeeAttribute.Message)}

                    />

                    <Input
                        onMouseEnter={this.onMouseEnter}
                        disabled={submitDisabled}
                        type={'submit'}
                        name={'submit'}
                        value={'Submit'}
                    />

                </form>
                <ToastContainer/>
            </div>
        )
    }

    private onInputBlur({name, value, validators}: EventInterface) {

        // get the validators for each field defined in the forms config file and validate.
        validators.forEach(this.validate.bind(this, name, value))
    }

    private onInputChange({name, value, validators, errors}: EventInterface) {

        // only validate if an existing error is present.
        if (errors.length > 0) {
            validators.forEach(this.validate.bind(this, name, value));
        }

        const payload = {
            entity: Entities.Employee,
            attribute: name,
            value,
        };
        this.props.setFormFieldValue(payload);
    }

    private validate(attribute: EmployeeAttribute, value: string, validator: Validator) {


        // create payload in FormInterface form where the value is the error message
        const payload = {
            entity: Entities.Employee,
            attribute,
            value: validator.message,
        };

        // either remove or add this error message depending on whether the form field is valid.
        // This does dispatch some unnecessary actions, for example if field has no error messages
        // and removeFormFieldError is called then the reducer will try and remove something which
        // isn't there, but given how infrequently this is called, it's an acceptable solution.
        const dispatchAction = validator.isValid(value)
            ? this.props.removeFormFieldError
            : this.props.pushFormFieldError;

        dispatchAction(payload);
    }

    private onMouseEnter() {

        let validators;
        const {name, email, message} = this.props.employee;

        validators = getEmployeeFieldValidators(EmployeeAttribute.Name);
        validators.forEach(this.validate.bind(this, EmployeeAttribute.Name, name.value));

        validators = getEmployeeFieldValidators(EmployeeAttribute.Email);
        validators.forEach(this.validate.bind(this, EmployeeAttribute.Email, email.value));

        validators = getEmployeeFieldValidators(EmployeeAttribute.Message);
        validators.forEach(this.validate.bind(this, EmployeeAttribute.Message, message.value));
    }

    private async handleSubmit(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault();

        // convert data in redux to data structure accepted by webservice.
        const formData = parseFormData(this.props.employee);

        try {
            const response = await this.props.postEmployeeForm(formData);

            // new resource created ok
            if (response.payload.status === 201) {

                toast('Your Employee Record has been successfully been submitted!');
                this.props.clearFormData({entity: Entities.Employee});
            }
        } catch (e) {
            toast(`An error has occurred: ${e}`, e);
        }
    }
}

const mapState = (state: any, props: any) => {

    // get the total number of errors / completed fields to help determine if ok to submit
    let errors: string[] = [];
    const completed: boolean[] = [];

    for (const item in EmployeeAttribute) {
        if (isNaN(Number(item))) {
            const key = EmployeeAttribute[item];
            const field = state.forms.employee[key];
            if (field) {
                completed.push(field.value.length > 0);
                errors = errors.concat(field.errors);
            }
        }
    }

    return {
        employee: state.forms.employee,
        errors,
        completed,
    }
};

const mapDispatch = (dispatch: any) => {

    return {
        setFormFieldValue: (payload: FormInterface) => dispatch(setFormFieldValue(payload)),
        pushFormFieldError: (payload: FormInterface) => dispatch(pushFormFieldError(payload)),
        removeFormFieldError: (payload: FormInterface) => dispatch(removeFormFieldError(payload)),
        postEmployeeForm: (data: any) => dispatch(postEmployeeForm(data)),
        clearFormData: (payload: Partial<FormInterface>) => dispatch(clearFormData(payload)),
    }
};

export default connect(mapState, mapDispatch)(FormContainer);