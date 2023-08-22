import React from "react";
import { getUser } from "../api/auth/[...thirdweb]";

type Props = {};

const ProposalDetailsPage = (props: Props) => {
  return <div>ProposalDetailsPage</div>;
};

export default ProposalDetailsPage;

export const getServerSideProps = async (context: any) => {
  const user = await getUser(context.req);

  console.log({ user });

  if (!user) {
    console.log("asdasdas");
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
