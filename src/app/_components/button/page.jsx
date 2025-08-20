import React from 'react';

export default function Button({ classname, onclick, name }) {
  return (
    <button className={classname} onClick={onclick}>
      {name}
    </button>
  );
}
