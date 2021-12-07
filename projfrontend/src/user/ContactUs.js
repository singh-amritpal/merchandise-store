import React, { useState } from 'react';
import Base from '../core/Base';
import { init, send } from 'emailjs-com';

const ContactUs = () => {
    const [toSend, setToSend] = useState({
        from_name: '',
        to_name: '',
        message: '',
        reply_to: '',
        responseCode: ''
    });

    init("user_N3Sd43MV7sbxQlgwped2h");

    const onSubmit = (event) => {
        event.preventDefault();
        send(
            'service_9eon1tt',
            'template_noz7pcl',
            toSend,
            ''
        ).then((response) => {
            if (response.error) {
                setToSend({ ...toSend, responseCode: response.error })
            } else {
                setToSend({ ...toSend, responseCode: response.status })
                console.log('SUCCESS!', response.status, response.text);
            }
        }).catch((err) => {
            console.log('FAILED...', err);
        });
    }

    const handleChange = (event) => {
        setToSend({ ...toSend, [event.target.name]: event.target.value });
    }

    return (
        <Base title="Contact Us" description="Send Us An Email" className="container bg-white p-4">
            <form className="form" onSubmit={onSubmit} style={{ maxHeight: "100%", maxWidth: "50%", justifyContent: "center", margin: "auto" }}>
                <div className="col-md-6 offset-sm-3 text-center mt-3">
                    <div className="alert alert-success" role="alert" style={{ display: toSend.responseCode === 200 ? "" : "none" }}>
                        Email sent successfully.
                    </div>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="from_name">From</label>
                    <input type="text" name="from_name" className="form-control" value={toSend.from_name} onChange={handleChange} required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="reply_to">Email</label>
                    <input type="email" name="reply_to" id="reply_to" className="form-control" placeholder="example@corp.com" value={toSend.reply_to} onChange={handleChange} required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="message">Message</label>
                    <textarea placeholder="Start typing..." className="form-control" rows="4" value={toSend.message} onChange={handleChange} name="message" />
                </div>
                <button type="submit" className="btn btn-outline-success mb-3 rounded">Send Email</button>
            </form>
        </Base>
    );
}

export default ContactUs;
