import React, { useState } from 'react';
import Base from '../core/Base';
import { Redirect } from 'react-router-dom';
import { signin, authenticate, isAuthenticated } from '../auth/helper/index';


const SignIn = () => {

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false
    });

    const { email, password, error, loading, didRedirect } = values;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false })
                }
                else {
                    authenticate(data, () => {
                        setValues({ ...values, didRedirect: true })
                    })
                }
            })
            .catch(console.log("UNABLE TO SIGN IN"));
    }

    const performRedirect = () => {
        if (didRedirect) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            }
            else {
                return <Redirect to="/user/dashboard" />
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />
        }
    }

    const signInForm = () => {
        return (
            <div className="row" >
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group mb-3">
                            <label className="text-light">Email</label>
                            <input className="form-control" type="email" value={email} onChange={handleChange("email")} />
                        </div>
                        <div className="form-group mb-3">
                            <label className="text-light">Password</label>
                            <input className="form-control" type="password" value={password} onChange={handleChange("password")} />
                        </div>
                        <div class="d-grid gap-2 mb-3">
                            <button className="btn btn-success" onClick={onSubmit}>Sign In</button>
                        </div>
                    </form>
                </div>
            </div >
        )
    }
    const loadingMessage = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        )
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
        <Base title="Sign In Page" description="A Page for user to sign in">
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    );
}

export default SignIn;