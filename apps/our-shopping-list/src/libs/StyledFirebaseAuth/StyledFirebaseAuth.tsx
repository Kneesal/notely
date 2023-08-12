import { useEffect, useRef, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import 'firebaseui/dist/firebaseui.css'
import { auth } from 'firebaseui'

interface StyledFirebaseAuthProps {
  uiConfig: auth.Config
  uiCallback?(ui: auth.AuthUI): void
  firebaseAuth: any // As firebaseui-web
  className?: string
}

export const StyledFirebaseAuth = ({
  uiConfig,
  firebaseAuth,
  className,
  uiCallback
}: StyledFirebaseAuthProps) => {
  const [firebaseui, setFirebaseui] = useState<
    typeof import('firebaseui') | null
  >(null)
  const [userSignedIn, setUserSignedIn] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    // Firebase UI only works on the Client. So we're loading the package only after
    // the component has mounted, so that this works when doing server-side rendering.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    if (typeof window !== 'undefined') setFirebaseui(require('firebaseui'))
  }, [])

  useEffect(() => {
    if (firebaseui === null) return

    // Get or Create a firebaseUI instance.
    const firebaseUiWidget =
      firebaseui.auth.AuthUI.getInstance() ??
      new firebaseui.auth.AuthUI(firebaseAuth)
    if (uiConfig.signInFlow === 'popup') firebaseUiWidget.reset()

    // We track the auth state to reset firebaseUi if the user signs out.
    const unregisterAuthObserver = onAuthStateChanged(firebaseAuth, (user) => {
      if (!user && userSignedIn) firebaseUiWidget.reset()
      setUserSignedIn(!!user)
    })

    // Trigger the callback if any was set.
    if (uiCallback) uiCallback(firebaseUiWidget)

    // Render the firebaseUi Widget.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    firebaseUiWidget.start(elementRef.current, uiConfig)

    return () => {
      unregisterAuthObserver()
      firebaseUiWidget.reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseui, uiConfig, userSignedIn])

  return <div className={className} ref={elementRef} />
}
