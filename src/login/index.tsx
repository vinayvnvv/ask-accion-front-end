import * as React from 'react';
import './index.css';
import { GoogleLogin } from 'react-google-login';	
import { Auth } from './../services/index';

export class Login extends React.Component<any, any> {

	responseGoogle = (res: any) => {
        console.log(res);
        const profileObj = res.profileObj;
        if(profileObj.email.replace(/.*@/, "") !== 'accionlabs.com') {
            alert('Error!, Only accionalabs email are acceptable!!');
            return;
        }
        Auth.setAuth(res.profileObj);
        location.href = location.href;
	}
	responseErrGoogle = (err: any) => {
		console.log(err);
	}
	public render() {
		return (
		  <div>
		  	<div className="Login">
		  		<div className="_box">
		  			<div className="_ttl">Ask Accion</div>
		  			<div className="_sub-ttl">Sign in</div>
		  			<div className="_sub-ttl1">Sign in with google to access your bot</div>
		  			<div className="_btn">
		  				<GoogleLogin
						    clientId="617965711227-ak9h08uuhefcbn6v5ccq8io3bdh401ml.apps.googleusercontent.com"
						    buttonText="Login"
						    onSuccess={this.responseGoogle}
						    onFailure={this.responseErrGoogle}
						  />
		  			</div>
		  		</div>
		  	</div>
		  </div>
		);
	}
}
