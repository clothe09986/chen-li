import { gql, useQuery } from '@apollo/client'
import hasura from './hasura'

type Keys = keyof hasura.GET_STUDENT

export const useGetStudent = (branch: string, studentId: string) => {
  const { loading, error, data, refetch } = useQuery<hasura.GET_STUDENT, hasura.GET_STUDENT_Variables>(
    gql`
      query STUDENT_${branch.toUpperCase()}($studentId: uuid!) {
        student_${branch}(where:{id:{_eq:$studentId}}) {
          id
          name
        }
      }
    `,
    { variables: { studentId } },
  )
  return { loading, error, data: data && data[`student_${branch}` as Keys][0], refetch }
}
