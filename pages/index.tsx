import { gql, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

const query = `query MEMBER{
                  member {
                    id
                  }
                }
                  `;
const useGetMember = () => {
  const { loading, error, data, refetch } = useQuery(
    gql`
      ${query}
    `
  );
  return { loading, error, data, refetch };
};

const Home: NextPage = () => {
  const { loading, error, data, refetch } = useGetMember();
  console.log(data);

  return (
    <div className={styles.container}>
      陳立離課系統
      <br />
      ID:{!loading && !error && data?.member[0].id}
    </div>
  );
};

export default Home;

