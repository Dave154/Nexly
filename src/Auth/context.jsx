 
import React, {useState,useEffect,useContext,useReducer} from 'react'
import { GoogleAuthProvider,signInWithPopup} from "firebase/auth";


const AuthContext = React.createContext()

const reducer =(state,action)=>{

}
 	const initialState={
 		error: false,
 	}


 const AuthProvider =({children})=>{
 	const [state,dispatch]=useReducer( reducer,initialState)

 	const googleSignIn= async ()=>{
			const provider= new GoogleAuthProvider()
			const res = await signInWithPopup(auth, provider)
																								// 		  .then((result) => {
																								// 		    // This gives you a Google Access Token. You can use it to access the Google API.
																								// 		    const credential = GoogleAuthProvider.credentialFromResult(result);
																								// 		    const token = credential.accessToken;
																								// 		    // The signed-in user info.
																								// 		    const user = result.user;
																								// 		    navigate('/chat')
																								// 		  }).catch((err) => {
																								// 		    const errorCode = err.code;
																								// 		    const errorMessage = err.message;
																								// 		    const email = err.customData.email;

																								// 		    const credential = GoogleAuthProvider.credentialFromError(err);
																								// 		    console.log(errorMessage)
																								// 		    // ...
																								  // });
}
 	return <AuthContext.Provider value={{
 		...state,
 		googleSignIn
 	}}>
 		{children}
 	</AuthContext.Provider>
 }

 const useGlobe=()=>{
 	return useContext(AuthContext)
 }

 export {AuthProvider,useGlobe}