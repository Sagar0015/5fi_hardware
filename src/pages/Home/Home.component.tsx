import React, { Fragment } from "react";
import WithLayout from "../../components/WithLayout";
import Main from "../../layouts/Main";
import HomeView from "../../views/HomeView";

const Home = () => {
  return (
    <Fragment>
      <WithLayout component={HomeView} layout={Main} />
    </Fragment>
  );
};

export default Home;
