/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GET_STUDENT
// ====================================================
export interface GET_STUDENT_property {
  __typename: 'student_property'
  id: any
  name: string
}

export interface GET_STUDENT {
  student: GET_STUDENT_property[]
}
export interface GET_STUDENT_Variables {
  studentId: string
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: INSERT_APPLICATION
// ====================================================
export interface INSERT_APPLICATION_property {
  __typename: 'application_property'
  student_id: any
  name: string
  reason: string
  bank_image_url: string
  branch: string
}

export interface INSERT_APPLICATION {
  insert_application: INSERT_APPLICATION_property
}

export interface INSERT_APPLICATIONVariables {
  application: { student_id: any; name: string; reason: string; bank_image_url: string; branch: string }
}
