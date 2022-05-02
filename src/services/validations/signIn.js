import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
    let frontendErrors = {};

    if (Validator.isNull(data.username)) {
        frontendErrors.username = 'This field is required';
    }
    if (Validator.isNull(data.email)) {
        frontendErrors.email = 'This field is required';
    }
    if (!Validator.isEmail(data.email)) {
        frontendErrors.email = 'Email is invalid';
    }
    if (Validator.isNull(data.password)) {
        frontendErrors.password = 'This field is required';
    }
    if (Validator.isNull(data.email)) {
        frontendErrors.email = 'This field is required';
    }
    if (Validator.isNull(data.passwordConfirmation)) {
        frontendErrors.passwordConfirmation = 'This field is required';
    }
    if (!Validator.equals(data.password, data.passwordConfirmation)) {
        frontendErrors.passwordConfirmation = 'Passwords must mutch';
    }
    if (Validator.isNull(data.timezone)) {
        frontendErrors.timezone = 'This field is required';
    }

    return {
        frontendErrors: frontendErrors,
        isValid: isEmpty(frontendErrors)
    }
}

