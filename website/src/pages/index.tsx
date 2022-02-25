import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Installation from '../components/Installation';
import StartNow from '../components/StartNow';
import RunOnExpo from '../components/RunOnExpo';
import Community from '../components/Community';
import { FigmaKit, VScodeExt } from '../components/Extentions';
import OpenCollective from '../components/OpenCollective';
import Sponsor from '../components/Sponsor';
import '../../static/css/components.css';

const Home: React.FunctionComponent<{}> = () => {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <Hero />
      <Features />
      <Installation />
      <RunOnExpo />
      {/* <FigmaKit /> */}
      <VScodeExt />
      <Sponsor />
      {/* <OpenCollective /> */}
      <Community />
      <StartNow />
    </Layout>
  );
};

export default Home;
