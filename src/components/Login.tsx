import React from 'react';

export const Login = () => {
  return (
    <div>
      Login
      <label htmlFor="email">E-mail</label>
      <input name='email' type="text"/>
      <label htmlFor="password">Password</label>
      <input name='password' type="password"/>
    </div>
  );
};
