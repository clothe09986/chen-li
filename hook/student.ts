import { gql, useQuery } from '@apollo/client'
import { GET_STUDENT, GET_STUDENT_Variables } from './hasura'

type Keys = keyof GET_STUDENT

export const useGetStudent = (branch: string, studentId: string) => {
  const { loading, error, data, refetch } = useQuery<GET_STUDENT, GET_STUDENT_Variables>(
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
