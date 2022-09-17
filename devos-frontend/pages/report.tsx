import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";
import { NextPageWithLayout } from "./page";

const Report: NextPageWithLayout = () => {
  return (
    <section>
      <h1>Report</h1>
    </section>
  );
};

export default Report;

Report.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
