import PrimaryLayout from "../../components/layouts/primary/PrimaryLayout";
import { NextPageWithLayout } from ".././page";

const Proposal: NextPageWithLayout = () => {
  return (
    <section>
      <h1>Proposal</h1>
    </section>
  );
};

export default Proposal;

Proposal.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
