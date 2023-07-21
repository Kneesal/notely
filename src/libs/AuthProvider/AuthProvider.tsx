import {
  ReactElement,
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect
} from 'react'
import { auth } from '../firebaseConfig/'
import {
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'

interface AuthProviderProps {
  children: ReactNode
}
interface User {
  email: string | null
  uid: string | null
}

interface Context {
  user: User
  loading: boolean
  logIn: (email: string, password: string) => Promise<UserCredential>
  createUser: (email: string, password: string) => Promise<UserCredential>
  logOut: (auth: Auth) => Promise<void>
}

const AuthContext = createContext({} as unknown as Context)

export function AuthProvider({ children }: AuthProviderProps): ReactElement {
  const [user, setUser] = useState<User>({ email: null, uid: null })
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid
        })
      } else {
        setUser({ email: null, uid: null })
      }
    })
    setLoading(false)

    return () => unsubscribe()
  }, [])

  async function logIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  async function createUser(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  async function logOut() {
    setUser({ email: null, uid: null })
    await signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, loading, logIn, createUser, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): Context {
  return useContext(AuthContext)
}
