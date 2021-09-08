import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { register } from './ReduxStore/actions/userActions';

export default function RegisterScreen(props) {

	const [name, setName] = useState('');
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("");
	const [confirmedpassword, setConfirmedPassword] = useState("");
	const dispatch = useDispatch();
	  
  const userRegister = useSelector(state => state.userRegister);
	const { loading, userInfo, error } = userRegister;
	
	const redirect = props.location.search ?
		props.location.search.split('=')[1] : "/";

		
		const submitHandler = (e) => {
			e.preventDefault();
			if (password !== confirmedpassword) {
				alert("Password don't match");
			} else {
				dispatch(register(name, email, password))
			}
		}
		
		useEffect(() => {
			if (userInfo) {
				props.history.push(redirect);
			}
		}, [props.history, redirect, userInfo]);
		
	return (
		<div>
			<form className="form" onSubmit={submitHandler}>
				<div><h1>Creat An Account</h1>
				</div>
				{loading && <LoadingBox></LoadingBox>}
				{error && <MessageBox variant="danger">{error}</MessageBox>}
				<div>
					<label htmlFor="email">Name</label>
					<input type="name" id="name" placeholder="Enter Name" required onChange={(e) => setName(e.target.value)}></input>
				</div>
				<div>
					<label htmlFor="email">Email</label>
					<input type="email" id="email" placeholder="Enter email" required onChange={(e) => setEmail(e.target.value)}></input>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						placeholder="Enter passsword"
						required
						onChange={(e) => setPassword(e.target.value)}>
						</input>
				</div>
				<div>
					<label htmlFor="confirmedPassword">Confirmed Password</label>
					<input
						type="password"
						id="confirmedpassword"
						placeholder="Enter Confirmed Passsword"
						required
						onChange={(e) => setConfirmedPassword(e.target.value)}>
						</input>
				</div>
				<div>
					<label />
					<button type="submit" className="primary">
						Sign In</button>
				</div>
				<div>
					<label />
					<div>
						Already have an account ? {' '}
						<Link to={`signin?redirect=${redirect}`}>Sign-In</Link>
					</div>
				</div>
			</form>
	 </div>
 )
}; 