import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";
import { NextPageWithLayout } from "./page";

const Help: NextPageWithLayout = () => {
  return (
    <section>
      <h1>Help</h1>
    </section>
  );
};

export default Help;

Help.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
