/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { String } from 'aws-sdk/clients/appstream'

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
// GraphQL query operation: GET_APPLICATION
// ====================================================
export interface GET_APPLICATION_property {
  __typename: 'application_property'
  id: any
  branch: string
  student_id: any
  name: string
  reason: string
  bank_image_url: string
  created_at: any
  level: string
}

export interface GET_APPLICATION {
  application: GET_APPLICATION_property[]
}

export interface GET_APPLICATION_Variables {
  level: string
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: INSERT_APPLICATION
// ====================================================
export interface INSERT_APPLICATION_property {
  __typename: 'insert_application_response'
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number
}

export interface INSERT_APPLICATION {
  insert_application: INSERT_APPLICATION_property
}

export interface INSERT_APPLICATIONVariables {
  application: { student_id: any; name: string; reason: string; bank_image_url: string; branch: string }
}
/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UPDATE_APPLICATION_LEVEL
// ====================================================
export interface UPDATE_APPLICATION_LEVEL_property {
  __typename: 'update_application_level_response'
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number
}

export interface UPDATE_APPLICATION_LEVEL {
  update_application: UPDATE_APPLICATION_LEVEL_property
}

export interface UPDATE_APPLICATION_LEVELVariables {
  id: any
  level: string
}
