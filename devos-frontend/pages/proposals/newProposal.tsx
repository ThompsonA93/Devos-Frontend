import PrimaryLayout from "../../components/layouts/primary/PrimaryLayout";
import { NextPageWithLayout } from ".././page";

const Proposal: NextPageWithLayout = () => {
  return (
    <section>
      <h1>Create new proposal</h1>
    </section>
  );
};

export default Proposal;

Proposal.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
