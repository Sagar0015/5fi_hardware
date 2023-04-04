import React from "react";

interface Props {
  component: React.FC;
  layout: any;
  minified?: boolean;
  notification?: boolean;
  [key: string]: any;
}

const WithLayout = (props: Props) => {
  const {
    layout: Layout,
    component: Component,
    minified,
    notification,
    ...rest
  } = props;

  const layout = { minified, notification };

  return (
    <Layout {...layout}>
      <Component {...rest} />
    </Layout>
  );
};

export default WithLayout;
