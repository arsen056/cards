import React from 'react';

export const Register = () => {
  return (
    <div>
      Register <br/>
      <label htmlFor="email">E-mail</label>
      <input name='email' type="text"/>
      <label htmlFor="password">Password</label>
      <input name='password' type="password"/>
    </div>
  );
};
