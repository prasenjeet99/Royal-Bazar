import { useState } from "react";

import Button from "../button/button.component";

import FormIput from "../form-input/form-input.component";
import './sign-up-form.style.scss'

import { createAuthUserWithEmailAndPassword,
        createUserDocumentFromAuth 
    } from "../../utils/firebase/firebase.utils";

    const defaultFormField = {
            displayName : '',
            email : '',
            password :'',
            confirmPassword : '',
        };

const SignUpForm = () => {
    
    const [formFields, setFormFields] = useState(defaultFormField);

    const {displayName, email, password, confirmPassword } = formFields;

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormField);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword ){
            alert("password do not match");
            return;
        }
        try{
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            console.log(user);
            const userDocRef = await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        }catch(error) {
            if(error.code ===  'auth/email-already-in-use'){
                alert('Cannot create user, email already in use');
            }else{
                console.log('User creation encountered an error ', error);
            }
        }
    }
    
    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name] : value});
    };

        return(
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign Up with your email and password</span>
            <form onSubmit={handleSubmit}>
                {/* <label >Display Name</label> */}
                <FormIput label="Display Name" type="text"required onChange={handleChange} name="displayName" value = {displayName} />

                {/* <label >Email</label> */}
                <FormIput label = "Email" type="email" required onChange={handleChange} name="email" value = {email} />

                {/* <label >Password</label> */}
                <FormIput label = "Password" type="password" required onChange={handleChange} name="password" value = {password} />

                {/* <label >Confirm Password</label> */}
                <FormIput label = "Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value = {confirmPassword} />
                <Button buttonType={'inverted'} type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;