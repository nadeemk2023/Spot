import React, { useEffect } from 'react';
import { useProvideAuth } from '../../hooks/useAuth';

const HomeFeed = () => {
  const {
    state: { user: userObj },
  } = useProvideAuth();

  console.log(
    userObj
      ? `userObj: ${JSON.stringify(userObj, null, 2)}`
      : 'No userObj to return'
  );

  return <div>HomeFeed</div>;
};

export default HomeFeed;
