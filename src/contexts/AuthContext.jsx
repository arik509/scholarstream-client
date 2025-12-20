import { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import axiosInstance from '../config/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const saveUserToDatabase = async (userData) => {
    try {
      const { data } = await axiosInstance.post('/api/users/register', userData);
      return data;
    } catch (error) {
      console.error('Error saving user to database:', error);
      throw error;
    }
  };

  const registerUser = async (email, password, name, photoURL) => {
    setLoading(true);
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { 
      displayName: name, 
      photoURL: photoURL 
    });

    await saveUserToDatabase({
      name,
      email,
      photoURL: photoURL || '',
      role: 'Student'
    });

    return result;
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    await saveUserToDatabase({
      name: result.user.displayName,
      email: result.user.email,
      photoURL: result.user.photoURL || '',
      role: 'Student'
    });

    return result;
  };

  const logoutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const { data } = await axiosInstance.get(`/api/users/${currentUser.email}`);
          setUser({ 
            ...currentUser, 
            role: data.role || 'Student'
          });
        } catch (error) {
          console.error('Error fetching user role:', error);
          setUser({ ...currentUser, role: 'Student' });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    registerUser,
    loginUser,
    googleLogin,
    logoutUser
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};
