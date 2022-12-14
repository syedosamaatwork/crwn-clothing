import { useState } from 'react';
import FormInput from '../../components/form-input/form-input.component';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import './sign-up-form.styles.scss';
import Button from '../../components/button/button.component';

const defaultFormField = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormField);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormField = () => {
        setFormFields(defaultFormField);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("passwords do not match")
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            resetFormField();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            } else {
                console.error('User creation envountered an error', error);
            }

        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Display Name' type="text" onChange={handleChange} name='displayName' value={displayName} required />

                <FormInput label='Email' type="email" onChange={handleChange} name='email' value={email} required />

                <FormInput label='Password' type="password" onChange={handleChange} name='password' value={password} required />

                <FormInput label='Confirm Password' type="password" onChange={handleChange} name='confirmPassword' value={confirmPassword} required />

                <Button type="submit">Sign up</Button>
            </form>
        </div>
    )
};

export default SignUpForm;