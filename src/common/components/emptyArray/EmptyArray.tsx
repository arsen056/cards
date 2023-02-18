import React, {FC} from 'react';

type EmptyArrayPropsType = {
  message: string
}
export const EmptyArray: FC<EmptyArrayPropsType> = ({message}) => {
  return (
    <h2>
      {message}
    </h2>
  );
};