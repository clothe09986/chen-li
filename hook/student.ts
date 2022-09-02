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

export const useGet = () => {
  const { loading, error, data, refetch } = useQuery(
    gql`
      query {
        one_J01(limit: 100) {
          NumberPlate
          Nodate
          NoAttendance
          AutoID
          Agreedfee
          Business
          Businessposting
          ClassCode
          InstalmentAmount
          InstalmentMasterTableNumber
          Locked
          Name
          Note1
          NumberofDownloads
          NumberofMakeUpLessons
          PaymentNoticePrintTimes
          PaymentRemarks
          Preferentialtreatmentnote
          Preferentialtreatmentnote2
          Preferentialtreatmentnote3
          Preferentialtreatmentsettingstaff
          Preferentialtreatmentupdatetime
          PrintNoticeDate
          Receiptnote2
          RegisteredPerson
          RegistrationDate
          Remarks2
          Remarks3
          Remarks4
          Remarks5
          RemarksNumber
          RemarksonReceipt
          SeatID
          StudentID
          Tuitiondiscount
          Tuitiondiscounttreatment2
          Tuitiondiscounttreatment3
        }
      }
    `,
  )
  return { loading, error, data: data && data.chenli, refetch }
}
