
import {useEffect, useState} from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'

import {auth2, firestore } from "./firebase";

export function useUserData(){
    const [user] = useAuthState(auth2);

    const [username, setUsername] = useState(null);
  
    useEffect(() => {
      // turn off realtime subscription
      let unsubscribe;

      console.log(user);
  
      if (user) {
        const ref = firestore.collection('users').doc(user.uid);
        unsubscribe = ref.onSnapshot((doc) => {
          setUsername(doc.data()?.username);
        });
      } else {
        setUsername(null);
      }
  
      return unsubscribe;
    }, [user]);
  
    return { user, username };
  }


  const useScript = url => {
    useEffect(() => {
      const script = document.createElement('script');
  
      script.src = url;
      script.async = true;
  
      document.body.appendChild(script);
  
      return () => {
        document.body.removeChild(script);
      }
    }, [url]);
  };
  
  export default useScript;