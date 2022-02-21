import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth-actions';



export default function Registration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();



  const handleChange = e => {
    //   console.log(e.currentTarget.name);
    // console.log(e.currentTarget.value);
    switch (e.currentTarget.name) {
      case 'name':
        setName(e.currentTarget.value);
        break;

      case 'email':
        setEmail(e.currentTarget.value);
        break;

      case 'password':
        setPassword(e.currentTarget.value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">
          name
          <input type="text" name="name" value={name} onChange={handleChange} />
        </label>
        <br />
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
        <button type="submit">Create account</button>
      </form>
    </>
  );
}
