import * as React from 'react';
import Input from "../components/Input";
import {connect} from "react-redux";

import {
    FormInterface, setFormFieldValue, pushFormFieldError, removeFormFieldError, postEmployeeForm,
    clearFormData
} from "../actions/forms";
import {EmployeeAttribute, Entities} from "../types/enums";
import {getEmployeeFieldValidators} from "../config/forms";
import TextArea from "../components/TextArea";
import {parseFormData} from "../utils";
import {EmployeeFormInterface} from "../reducers/forms";
import {ValidatorInterface} from "../utils/validators";

interface FormContainerProps {
    errors: string[]
    completed: boolean[]
    employee: EmployeeFormInterface
    setFormFieldValue: (payload: FormInterface) => void
    pushFormFieldError: (payload: FormInterface) => void
    removeFormFieldError: (payload: FormInterface) => void
    postEmployeeForm: (data: {}) => any
    clearFormData: (payload: Partial<FormInterface>) => void
}

class FormContainer extends React.Component<FormContainerProps> {

    constructor(props: FormContainerProps) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onInputBlur = this.onInputBlur.bind(this);
    }

    public render() {

        const {employee, errors, completed} = this.props;

        // checks if any errors or all forms completed.
        const submitDisabled = errors.length > 0 || completed.indexOf(false) !== -1;

        return (
            <form onSubmit={this.handleSubmit}>
                <Input
                    {...employee.name}
                    label={'Name *'}
                    placeholder={'Enter your full name'}
                    name={EmployeeAttribute.Name}
                    onChange={this.onInputChange}
                    onBlur={this.onInputBlur}
                />

                <Input
                    {...employee.email}
                    label={'Email *'}
                    placeholder={'Enter your full email'}
                    name={EmployeeAttribute.Email}
                    onChange={this.onInputChange}
                    onBlur={this.onInputBlur}
                />

                <TextArea
                    {...employee.message}
                    label={'Message *'}
                    placeholder={"What's your favourite saying?"}
                    name={EmployeeAttribute.Message}
                    onChange={this.onInputChange}
                    onBlur={this.onInputBlur}
                />

                <Input
                    disabled={submitDisabled}
                    type={'submit'}
                    name={'submit'}
                    value={'Submit'}
                />

            </form>
        )
    }

    private onInputBlur(name: EmployeeAttribute, value: string) {

        // get the validators for each field defined in the forms config file and validate.
        const validators = getEmployeeFieldValidators(name);
        validators.forEach(this.validate.bind(this, name, value))
    }

    private onInputChange(name: EmployeeAttribute, value: string) {

        // create payload in FormInterface form where the value is the e.currentTarget.value
        // const {value, name} = e.currentTarget as { value: string, name: EmployeeAttribute };

        const payload = {
            entity: Entities.Employee,
            attribute: name,
            value,
        };
        this.props.setFormFieldValue(payload);
    }

    private validate(attribute: EmployeeAttribute, value: string, validator: ValidatorInterface) {


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

    private async handleSubmit(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault();

        const formData = parseFormData(this.props.employee);

        try {
            const response = await this.props.postEmployeeForm(formData);

            // new resource created
            if (response.payload.status === 201) {

                // @TODO improve feedback message
                alert('Success! Your Employee Record has been submitted');

                // clear form data and redirect to home page.
                this.props.clearFormData({
                    entity: Entities.Employee,
                });
            }
        } catch (e) {
            alert(e);
            console.log({e})
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