import * as React from 'react';

interface Iprops {
  name: string;
}

const LinkToMap: React.FunctionComponent<Iprops> = ({ name }) => {
  return (
    <a
      href={`https://www.amap.com/search?query=${name}&city=510100`}
      target="_blank"
      rel="nofollow me noopener noreferrer"
    >
      {name}
    </a>
  );
};

export default LinkToMap;
