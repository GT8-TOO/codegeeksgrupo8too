import React, {useState} from 'react';
import UserContext from './UserContext'

const UserContextProvider = ({children}) => {
	const [ user, setUser ] = useState({
		id: 4,
		logeado:true,
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
	const [openMateria, setCrearMateria] =useState(false)
	
	const [respuesta, setRespuesta]= useState({
		type:"",
		message:"",
		materiaGuardada:false
  });



	return (
		<UserContext.Provider value={{
			user,
			setUser,
			button, 
			setButton,
			inputCarrerra,
			setCarrera,
			openMateria,
			setCrearMateria,
			respuesta,
			setRespuesta
		}}>
			{children}
		</UserContext.Provider>
	);
}

export default UserContextProvider;
