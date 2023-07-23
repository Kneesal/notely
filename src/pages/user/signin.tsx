import { SignIn } from '@/Components/SignIn'
import { AuthAction, withUser, withUserTokenSSR } from 'next-firebase-auth'
import { ReactElement } from 'react'

function SignInPage(): ReactElement {
  return <SignIn />
}
// add below?
// export const getServerSideProps = withUserTokenSSR({
//   whenAuthed: AuthAction.REDIRECT_TO_APP
// })()

export default withUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP
})(SignInPage)
