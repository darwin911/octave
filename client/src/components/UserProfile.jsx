import React from 'react';

const UserProfile = props => {
  const { userData } = props;

  return (
    <div>
      <h1>Welcome {userData.name}</h1>
      {/* {  user fav artist  name and pic */}
      {/* user fav events pic and title only */}
      {/* use api help */}
    </div>
  );
};

export default UserProfile;
