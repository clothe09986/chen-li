import { gql, useMutation, useQuery } from '@apollo/client'
import hasura from './hasura'

export type Role = '櫃台' | '中階主管' | '分校主任' | '採購' | '財會'

export const useGeetApplication = (level: Role) => {
  const { loading, error, data, refetch } = useQuery<hasura.GET_APPLICATION, hasura.GET_APPLICATION_Variables>(
    gql`
      query APPLICATION($level: String!) {
        application(where: { level: { _eq: $level } }) {
          id
          branch
          student_id
          name
          reason
          bank_image_url
          level
          created_at
        }
      }
    `,
    { variables: { level } },
  )
  return { loading, error, data: data?.application, refetch }
}

export const useAddApplication = () => {
  const [addApplicationSession] = useMutation<hasura.INSERT_APPLICATION, hasura.INSERT_APPLICATIONVariables>(
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

export const useUpdateApplicationLevel = () => {
  const [updateApplicationLevelSession] = useMutation<
    hasura.UPDATE_APPLICATION_LEVEL,
    hasura.UPDATE_APPLICATION_LEVELVariables
  >(
    gql`
      mutation UPDATE_APPLICATION_LEVEL_SESSION($id: uuid!, $level: String!) {
        update_application(_set: { level: $level }, where: { id: { _eq: $id } }) {
          affected_rows
        }
      }
    `,
  )
  return updateApplicationLevelSession
}
