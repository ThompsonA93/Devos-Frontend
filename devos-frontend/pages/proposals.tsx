import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";
import { NextPageWithLayout } from "./page";

const Proposals: NextPageWithLayout = () => {
  return (
    <section>
      <h1>Proposals</h1>
    </section>
  );
};

export default Proposals;

Proposals.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
