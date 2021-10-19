import React from 'react';

import WindowAlert from '../WindowAlert';

const UserProfile =()=>{
  return(
    <div>
      <WindowAlert
        state={true}
        type="info"
        /*
         * warning
         * error
         * info
         * success
        * */
        title="Aqui va el titulo"
        message="Informacion del mensaje"
      />
    </div>
  );
}

export default UserProfile;
