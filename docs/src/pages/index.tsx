import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import styles from "./index.module.css";
import HomepageFeatures from "../components/HomepageFeatures";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        {/* <p className="hero__subtitle">{siteConfig.tagline}</p> */}
        <div className={styles.landing_balecamp}>
          <img src={require("@site/static/img/landing_balecamp.jpg").default} />
        </div>
        <div className={styles.buttons}>
          {/* <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            مقدمات
          </Link> */}
          <Link
            className="button button--secondary button--lg"
            to="/docs/frontend"
          >
            فرانت‌اند
          </Link>
          {/* <Link
            className="button button--secondary button--lg"
            to="/docs/backend"
          >
            بک‌اند
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/android"
          >
            اندروید
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/devops"
          >
            دواپس
          </Link> */}
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      wrapperClassName={styles.wrapper}
      description="Description will go into a meta tag in <head />"
    >
      <main className={clsx("hero hero--primary")}>
        <div className={styles.container}>
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          {/* <p className="hero__subtitle">{siteConfig.tagline}</p> */}
          <div className={styles.landing_balecamp}>
            <img
              src={require("@site/static/img/landing_balecamp.jpg").default}
            />
          </div>
          <div className={styles.buttons}>
            {/* <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            مقدمات
          </Link> */}
            <Link
              className="button button--secondary button--lg"
              to="/docs/frontend"
            >
              فرانت‌اند
            </Link>
            {/* <Link
            className="button button--secondary button--lg"
            to="/docs/backend"
          >
            بک‌اند
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/android"
          >
            اندروید
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/devops"
          >
            دواپس
          </Link> */}
          </div>
        </div>
      </main>
    </Layout>
  );
}
