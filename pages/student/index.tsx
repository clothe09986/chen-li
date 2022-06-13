import { NextPage } from 'next'
import { Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'react-toastify'
import { StyleButton, StyleContainer } from '..'
import { useAddApplication } from '../../hook/application'
import { useGetStudent } from '../../hook/student'
import aws from 'aws-sdk'
import { _uuid } from '../../helpers/_uuid'

type Branch = 'branch_1' | 'branch_2' | 'branch_3'

const StudentPage: NextPage = () => {
  const [studentId, setStudentId] = useState('')
  const [branch, setBranch] = useState<Branch>('branch_1')
  const [isShowForm, setIsShowForm] = useState(false)

  return !isShowForm ? (
    <StyleContainer>
      <div>
        <div className="mb-4 d-flex align-items-center">
          <div className="h5 fw-bold mb-0 me-4">分校</div>
          <select value={branch} name="branch" className="p-1" onChange={e => setBranch(e.target.value as Branch)}>
            <option value="branch_1">branch_1</option>
            <option value="branch_2">branch_2</option>
            <option value="branch_3">branch_3</option>
          </select>
        </div>
        <div className="d-flex align-items-center">
          <div className="h5 fw-bold mb-0 me-4 text-nowrap">學號</div>
          <input
            value={studentId}
            onChange={e => {
              setStudentId(e.target.value.trim())
            }}
            className="w-100"
          />
        </div>
        <div className="d-flex justify-content-center mt-4">
          <StyleButton
            onClick={() => {
              setIsShowForm(true)
            }}
          >
            繼續
          </StyleButton>
        </div>
        <div>
          <div className="fw-bold"> Branch_1</div>
          2044bf1f-0b9e-42a1-b6da-6ef6b82a21ac <br /> e7380982-92d1-4757-86be-28d0978ff5b9 <br />
          4af593be-a5b9-4a80-9e76-34ff40af8520 <br /> 4e9c3aa9-e945-40fa-bbce-7aff05cc15ff <br />
          d0026d97-be47-4767-a58e-b1e302ff5b27 <br /> 88ba6c9c-846f-427e-9c94-a4640ca17afe <br />
          5b067378-6662-48d7-a7f1-ce438ed60f0e <br /> <br />
          <div className="fw-bold"> Branch_2</div>
          82cfa2d5-3105-4cc4-88cd-0c877927ca23 <br /> 4085845a-ad56-42c9-9027-e8884f615994 <br />
          77ace39f-89d0-4cff-986c-9ee7bd6ee4a9 <br /> 8d155511-b5a9-4c5e-961d-ad931514ce28 <br />
          2adce5e9-633e-4adf-a0b6-994c3813c0c1 <br /> 46fa4111-e1c5-4cb6-a0dd-fd59f622315d <br />
          7c505b63-f9fb-4563-81b2-8551624924d2 <br /> <br />
          <div className="fw-bold"> Branch_3</div>
          ba3853d6-e907-41de-b19b-68f4a0cedf4f <br /> 612c055e-a033-4826-9285-775bc0888009 <br />
          ba602db8-4024-42b8-82b9-6f7468dec4da <br /> ba8d4687-6bda-4ccf-b0c3-794bc3378d31 <br />
          bca825fb-a2a4-48f4-bdcc-e5b554d790d8 <br /> 9697725e-5603-4bf8-b2b4-65a3eff0f031 <br />
          8e545762-c89f-4d5e-a054-66114018abd0 <br />
        </div>
      </div>
    </StyleContainer>
  ) : (
    <Form branch={branch} studentId={studentId} setIsShowForm={setIsShowForm} />
  )
}

const Form: React.FC<{
  branch: string
  studentId: string
  setIsShowForm: Dispatch<SetStateAction<boolean>>
}> = ({ branch, studentId, setIsShowForm }) => {
  const { loading, data } = useGetStudent(branch, studentId)
  const addApplication = useAddApplication()
  const [reason, setReason] = useState('')
  const [bankImageUrl, setBankImageUrl] = useState('')

  const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
  })

  const handleSubmit = () => {
    addApplication({
      variables: {
        application: {
          student_id: studentId,
          branch: branch,
          reason: reason,
          bank_image_url: bankImageUrl,
          name: data ? data.name : '',
        },
      },
    })
      .then(() => {
        toast('🦄 成功送出申請', { position: 'top-center', type: 'success', closeOnClick: true, draggable: true })
        setIsShowForm(false)
      })
      .catch(err => {
        console.error(err)
        toast(JSON.stringify(err), { position: 'top-center', type: 'error', closeOnClick: true, draggable: true })
      })
  }

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files) {
        const file = e.target.files[0]
        const key = _uuid()
        const params = {
          Bucket: 'chen-li',
          Key: key,
          Body: file,
          ContentType: 'image/png',
        }
        await s3
          .putObject(params)
          .promise()
          .then(() => {
            setBankImageUrl(`https://chen-li.s3.amazonaws.com/${key}`)
          })
      }
    } catch (err) {
      console.error(err)
      toast(JSON.stringify(err), { position: 'top-center', type: 'error', closeOnClick: true, draggable: true })
    }
  }

  return (
    <div className="m-5 p-2">
      <StyleButton
        className="mb-4"
        onClick={() => {
          setIsShowForm(false)
        }}
      >
        回上頁
      </StyleButton>
      <div>
        {loading ? (
          'Loading....'
        ) : !data ? (
          '查無此學員'
        ) : (
          <div className="row g-4 text-break">
            <div className="d-flex align-content-center col-3">
              <div className="me-2 text-nowrap">姓名</div>
              <div>{data.name}</div>
            </div>
            <div className="d-flex align-content-center col-3">
              <div className="me-2 text-nowrap">分校</div>
              <div>{branch}</div>
            </div>
            <div className="d-flex align-content-center col-6">
              <div className="me-2 text-nowrap">學號</div>
              <div>{data.id}</div>
            </div>
            <div className="d-flex align-content-center col-12">
              <div className="me-2 text-nowrap">離班事由</div>
              <input
                className="w-100"
                placeholder="30個中文字(含標點符號)"
                value={reason}
                onChange={e => {
                  setReason(e.target.value.trim())
                }}
              />
            </div>
            <div className="d-flex align-content-center col-6">
              <div className="me-2 text-nowrap">銀行存摺照片</div>
              <input type="file" accept="image/*" onChange={handleUploadImage} />
              {bankImageUrl && <img alt="bank_image" src={bankImageUrl} height="100%" />}
            </div>
          </div>
        )}
      </div>
      <StyleButton className="mt-4" onClick={handleSubmit}>
        送出申請
      </StyleButton>
    </div>
  )
}

export default StudentPage
