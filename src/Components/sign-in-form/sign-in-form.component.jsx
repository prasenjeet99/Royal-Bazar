import { useState } from "react";
import {  } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";

import FormIput from "../form-input/form-input.component";
import './sign-in-form.style.scss'

import { 
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    SignInAuthUserWithEmailAndPassword, 
    } from "../../utils/firebase/firebase.utils";

    const defaultFormField = {
            email : '',
            password :'',
        };

const SignInForm = () => {
    
    const [formFields, setFormFields] = useState(defaultFormField);

    const {email, password } = formFields;

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormField);
    };

    const signinWithGoogle = async() => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        //console.log(response);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const response = await SignInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            resetFormFields();
        }catch(error) {
            switch(error.code){
                case 'auth/wrong-password' : alert('Incorrect Password'); break
                case 'auth/user-not-found' : alert('No user name associated with this email'); break
                default : console.log(error);
            }
            
        }
    }
    
    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name] : value});
    };

        return(
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={handleSubmit}>
                
                {/* <label >Email</label> */}
                <FormIput label = "Email" type="email" required onChange={handleChange} name="email" value = {email} />

                {/* <label >Password</label> */}
                <FormIput label = "Password" type="password" required onChange={handleChange} name="password" value = {password} />

                <div className="buttons-container">
                <Button buttonType={'inverted'} type="submit">Sign In</Button>
                <Button buttonType={'google'} type = 'button' onClick = {signinWithGoogle} >Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;