import { Helmet } from "react-helmet-async";

type HeadProps = {
  title?: string;
  description?: string;
};

export const Head = ({ title = "", description = "" }: HeadProps = {}) => {
  return (
    <Helmet
      title={title ? `${title} | 受注管理` : undefined}
      defaultTitle="受注管理"
    >
      <meta name="description" content={description} />
    </Helmet>
  );
};
