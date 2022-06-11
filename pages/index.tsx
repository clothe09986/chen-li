import type { NextPage } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";

// const query = `query MEMBER{
//                   member {
//                     id
//                   }
//                 }
//                   `;
// const useGetMember = () => {
//   const { loading, error, data, refetch } = useQuery(
//     gql`
//       ${query}
//     `
//   );
//   return { loading, error, data, refetch };
// };

const StyleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30vh;
`;

const StyleButton = styled.button`
  border: 0px solid #ffffff;
  background-color: pink;
  border-radius: 8px;
  width: 120px;
  height: 40px;
  margin: 12px;
  &:hover {
    opacity: 0.6;
  }
`;

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <StyleContainer>
      <div>
        <div className="h4 fw-bold mb-4 text-center">陳立離班系統</div>
        <div className="d-flex justify-content-between">
          <StyleButton
            onClick={() => {
              router.push("/student");
            }}
          >
            前台
          </StyleButton>
          <StyleButton
            onClick={() => {
              router.push("/admin");
            }}
          >
            後台
          </StyleButton>
        </div>
      </div>
    </StyleContainer>
  );
};

export default Home;
