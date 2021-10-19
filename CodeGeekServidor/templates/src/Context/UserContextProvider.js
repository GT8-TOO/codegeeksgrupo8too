import React, {useState} from 'react';
import UserContext from './UserContext'

const UserContextProvider = ({children}) => {
	const [ user, setUser ] = useState({
		id: 4,
		admin:true
	});
	const [button, setButton] = useState({
		enabled:false
	});
	const [inputCarrerra, setCarrera]=useState({
		data:{
			carrera:"",
			yearcarrer:""
		},
		escuela:{}
	});

	return (
		<UserContext.Provider value={{
			user,
			setUser,
			button, 
			setButton,
			inputCarrerra,
			setCarrera
		}}>
			{children}
		</UserContext.Provider>
	);
}

export default UserContextProvider;
