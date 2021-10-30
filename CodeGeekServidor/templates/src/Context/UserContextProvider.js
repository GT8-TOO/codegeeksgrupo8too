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
	const [openLocal, setMostrarLocal]=useState(false)
	const [openCrearLocal, setCrearLocal]=useState(false)
	const [openSolicitud, setOpenSolicitud]=useState(false)
	const [catalogoLocal, setCatalogo]=useState();
	
	const [respuesta, setRespuesta]= useState({
		type:"",
		message:"",
		materiaGuardada:false
  });

	const [codigoLocal, setCodigoLocal]=useState();
	const [solicitud, setSolicitud] =useState();

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
			openCrearLocal,
			setCrearLocal,
			catalogoLocal,
			setCatalogo,
			openLocal,
			setMostrarLocal,
			openSolicitud,
			setOpenSolicitud,
			respuesta,
			setRespuesta,
			codigoLocal,
			setCodigoLocal,
			solicitud,
			setSolicitud
		}}>
			{children}
		</UserContext.Provider>
	);
}

export default UserContextProvider;
