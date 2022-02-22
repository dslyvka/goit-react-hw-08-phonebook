import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from '../../redux/auth-actions';

export default function Login() {
  // const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  // let navigate = useNavigate();

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     return navigate('/');
  //   }
  // }, [isLoggedIn]);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const handleChange = e => {
    //   console.log(e.currentTarget.name);
    // console.log(e.currentTarget.value);
    switch (e.currentTarget.name) {
      case 'password':
        setPassword(e.currentTarget.value);
        break;

      case 'email':
        setEmail(e.currentTarget.value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login({ email, password }));
    setPassword('');
    setEmail('');
  };
  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">
          email
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label htmlFor="">
          password
          <input
            type="text"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Login</button>
        <br />
        <Link to="/registration">Don't have an account yet?</Link>
      </form>
    </>
  );
}
