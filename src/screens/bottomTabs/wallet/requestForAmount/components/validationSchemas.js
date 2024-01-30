import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .typeError('amount must be a number')
    .positive('amount must be greater than zero')
    .required('amount is required')
    .label('amount'),
  email: Yup.string().when('method', {
    is: 'email',
    then: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  }),
});

export const validationSchemaForEmail = Yup.object().shape({
  amount: Yup.number()
    .typeError('amount must be a number')
    .positive('amount must be greater than zero')
    .required('amount is required')
    .label('amount'),
  email: Yup.string()
    .email('Please enter valid email')
    .required('*required')
    .label('Email'),
});

export const validationSchemaForPhone = Yup.object().shape({
  amount: Yup.number()
    .typeError('amount must be a number')
    .positive('amount must be greater than zero')
    .required('amount is required')
    .label('amount'),
  phoneNumber: Yup.string().required('*required').label('phoneNumber'),
});

export const validationSchemaForName = Yup.object().shape({
  amount: Yup.number()
    .typeError('amount must be a number')
    .positive('amount must be greater than zero')
    .required('amount is required')
    .label('amount'),
  name: Yup.string()
    .required('*required')
    .trim('Space not allowed')
    .strict(true)
    .label('name'),
});
