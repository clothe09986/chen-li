import { NextPage } from 'next'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'react-toastify'
import { StyleButton, StyleContainer } from '..'
import { Role, useGeetApplication, useUpdateApplicationLevel } from '../../hook/application'

const AdminPage: NextPage = () => {
  const [isLogin, setIsLogin] = useState(false)
  const [role, setRole] = useState<Role>('櫃台')

  return !isLogin ? (
    <StyleContainer>
      <div>
        <div className="mb-4 d-flex align-items-center">
          <div className="h5 fw-bold mb-0 me-4">身份</div>
          <select value={role} name="branch" className="p-1" onChange={e => setRole(e.target.value as Role)}>
            <option value="櫃台">櫃台</option>
            <option value="中階主管">中階主管</option>
            <option value="分校主任">分校主任</option>
            <option value="採購">採購</option>
            <option value="財會">財會</option>
          </select>
        </div>
        <div className="d-flex justify-content-center mt-4">
          <StyleButton
            onClick={() => {
              setIsLogin(true)
            }}
          >
            登入
          </StyleButton>
        </div>
      </div>
    </StyleContainer>
  ) : (
    <CheckFromPage setIsLogin={setIsLogin} role={role} />
  )
}

const CheckFromPage: React.FC<{ setIsLogin: Dispatch<SetStateAction<boolean>>; role: Role }> = ({
  setIsLogin,
  role,
}) => {
  const { loading, data, refetch } = useGeetApplication(role)

  return (
    <div className="m-5 p-2">
      <StyleButton
        className="mb-5"
        onClick={() => {
          setIsLogin(false)
        }}
      >
        回上頁
      </StyleButton>
      <div>
        {loading
          ? 'Loading....'
          : data && data.length == 0
          ? '無申請'
          : data?.map(i => <Card key={i.id} data={i} refetch={refetch} />)}
      </div>
    </div>
  )
}

const Card: React.FC<{
  data: {
    id: string
    branch: string
    student_id: string
    name: string
    reason: string
    bank_image_url: string
    created_at: string
    level: string
  }
  refetch: Function
}> = ({ data, refetch }) => {
  const updateApplicationLevel = useUpdateApplicationLevel()

  const handleChangeLevel = (e: ChangeEvent<HTMLSelectElement>) => {
    const level = e.target.value
    updateApplicationLevel({
      variables: {
        id: data.id,
        level: level,
      },
    })
      .then(() => {
        refetch()
        toast(`🦄 成功指定給${level}`, {
          position: 'top-center',
          type: 'success',
          closeOnClick: true,
          draggable: true,
        })
      })
      .catch(err => {
        console.error(err)
        toast(JSON.stringify(err), { position: 'top-center', type: 'error', closeOnClick: true, draggable: true })
      })
  }

  return (
    <div key={data.id} className="row g-4 text-break mb-5 border border-dark p-2">
      <div className="d-flex align-content-center col-12">
        <div className="me-2 text-nowrap">申請單ID</div>
        <div>{data.id}</div>
      </div>
      <div className="d-flex align-content-center col-3">
        <div className="me-2 text-nowrap">姓名</div>
        <div>{data.name}</div>
      </div>
      <div className="d-flex align-content-center col-3">
        <div className="me-2 text-nowrap">分校</div>
        <div>{data.branch}</div>
      </div>
      <div className="d-flex align-content-center col-6">
        <div className="me-2 text-nowrap">學號</div>
        <div>{data.student_id}</div>
      </div>
      <div className="d-flex align-content-center col-12">
        <div className="me-2 text-nowrap">離班事由</div>
        <div>{data.reason}</div>
      </div>
      <div className="d-flex align-content-center col-6">
        <div className="me-2 text-nowrap">銀行存摺照片</div>
        <img alt="bank_image" src={data.bank_image_url} height={200} />
      </div>
      <div className="col-6">
        <div>指定給</div>
        <select value={data.level} name="branch" className="p-1" onChange={handleChangeLevel}>
          <option value="櫃台">櫃台</option>
          <option value="中階主管">中階主管</option>
          <option value="分校主任">分校主任</option>
          <option value="採購">採購</option>
          <option value="財會">財會</option>
        </select>
      </div>
    </div>
  )
}

export default AdminPage
