import { gql, useMutation } from '@apollo/client'
import { INSERT_APPLICATION, INSERT_APPLICATIONVariables } from './hasura'

export const useAddApplication = () => {
  const [addApplicationSession] = useMutation<INSERT_APPLICATION, INSERT_APPLICATIONVariables>(
    gql`
      mutation ADD_APPLICATION_SESSION($application: [application_insert_input!]!) {
        insert_application(objects: $application) {
          affected_rows
        }
      }
    `,
  )
  return addApplicationSession
}
