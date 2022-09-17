import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";
import { NextPageWithLayout } from "./page";

const Governance: NextPageWithLayout = () => {
  return (
    <section>
      <h1>Governance</h1>
    </section>
  );
};

export default Governance;

Governance.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
