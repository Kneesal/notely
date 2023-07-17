import {
  ReactElement,
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect
} from 'react'
import { auth } from '../firebaseConfig/'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'

interface AuthProviderProps {
  children: ReactNode
}
interface User {
  email: string | null
  uid: string | null
}

const AuthContext = createContext({})

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

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password)
}
