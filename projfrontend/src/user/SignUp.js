import React, { useState } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { signup } from '../auth/helper/index';

const SignUp = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });

    const { name, email, password, error, success } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false });
                }
                else {
                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        error: "",
                        success: true
                    })
                }
            })
            .catch(console.log("UNABLE TO SIGN UP"));
    }

    const signUpForm = () => {
        return (
            <div className="row" >
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group mb-3">
                            <label className="text-light">Name</label>
                            <input className="form-control" type="text" onChange={handleChange("name")} value={name} />
                        </div>
                        <div className="form-group mb-3">
                            <label className="text-light">Email</label>
                            <input className="form-control" type="email" onChange={handleChange("email")} value={email} />
                        </div>
                        <div className="form-group mb-3">
                            <label className="text-light">Password</label>
                            <input className="form-control" type="password" onChange={handleChange("password")} value={password} />
                        </div>
                        <div class="d-grid gap-2 mb-3">
                            <button className="btn btn-success" onClick={onSubmit}>Submit</button>
                        </div>
                    </form>
                </div>
            </div >
        )
    }

    const successMessage = () => {
        return (
            <div className="row" >
                <div className="col-md-6 offset-sm-3 text-center">
                    <div className="alert alert-success" role="alert" style={{ display: success ? "" : "none" }}>
                        Sign Up Successful. Login <Link to="/signin">Here</Link>
                    </div>
                </div>
            </div>
        );
    }

    const errorMessage = () => {
        return (
            <div className="row" >
                <div className="col-md-6 offset-sm-3 text-center">
                    <div className="alert alert-danger" role="alert" style={{ display: error ? "" : "none" }}>
                        {error}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Base title="Sign Up Page" description="A Page for user to sign up">
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    );
}

export default SignUp;