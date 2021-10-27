import React, {useState} from 'react';
import UserContext from './UserContext'

const UserContextProvider = ({children}) => {
	const [ user, setUser ] = useState({
		dui: 0,
		admin:true,
		token:undefined
	});
	const [button, setButton] = useState({
		enabled:false
	});
	const [inputCarrerra, setCarrera]=useState({
		data:{
			carrera:"",
			yearcarrer:""
		},
		escuela:{},
	});
	const [openMateria, setCrearMateria] =useState(false)
	const [openLocal, setCrearLocal]=useState(false)
	
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
			openLocal,
			setCrearLocal,
			respuesta,
			setRespuesta
		}}>
			{children}
		</UserContext.Provider>
	);
}

export default UserContextProvider;
