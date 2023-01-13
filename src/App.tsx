import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import page1 from "./assets/page1.jpg";
import page2 from "./assets/page2.jpg";
import page3 from "./assets/page3.jpg";
import page4 from "./assets/page4.jpg";
import page5 from "./assets/page5.jpg";
import page6 from "./assets/page6.jpg";
import rocket from "./assets/rocket.png";
import rocketIcon from "./assets/rocket_icon.png";
import spark from "./assets/spark.png";
import titlebrand from "./assets/titlebrand.png";
import page6_1 from "./assets/page6-1.png";
import page6_2 from "./assets/page6-2.png";
import page6_3 from "./assets/page6-3.png";
import page6_4 from "./assets/page6-4.png";
import analyze from "./assets/analyze.png";

import "./App.css";

interface UserInfo {}

const Prefetch: React.FC<{ srcs: string[] }> = ({ srcs }) => {
  return (
    <>
      {srcs.map((src) => (
        <img key={src} style={{ display: "none" }} src={src} alt="" />
      ))}
    </>
  );
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);

  return !loggedIn ? (
    <>
      <Page1 onLogin={() => setLoggedIn(true)} />
      <Prefetch
        srcs={[
          page1,
          page2,
          page3,
          page4,
          page5,
          page6,
          rocket,
          rocketIcon,
          spark,
          titlebrand,
          page6_1,
          page6_2,
          page6_3,
          page6_4,
          analyze,
        ]}
      />
    </>
  ) : (
    <Carousel
      className="App"
      axis="vertical"
      preventMovementUntilSwipeScrollTolerance
      emulateTouch
      showArrows={false}
      showStatus={false}
      showIndicators={false}
      selectedItem={selectedItem}
      onChange={setSelectedItem}
    >
      <Page2 userInfo={{}} />
      <Page3 userInfo={{}} />
      <Page4 userInfo={{}} />
      <Page5 userInfo={{}} />
      <Page6 userInfo={{}} onRetry={setSelectedItem} />
    </Carousel>
  );
}

const PageItem: React.FC<
  React.PropsWithChildren<
    { backgroundURL: string } & React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
  >
> = ({ children, backgroundURL, ...props }) => {
  return (
    <div
      {...props}
      className={`page-item ${props.className}`}
      style={{
        background: `url(${backgroundURL}) no-repeat center`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        ...props.style,
      }}
    >
      {children}
    </div>
  );
};

const SwipeToContinue: React.FC = () => {
  return <p className="swipe">Swipe up to continue</p>;
};

const Page1: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  return (
    <PageItem
      backgroundURL={page1}
      style={{ padding: "60px 4px 0 4px", textAlign: "center" }}
    >
      <p>This year has been rough,</p>
      <p>But we've shown our stuff.</p>
      <p>Through all the challenges and strife,</p>
      <p>We've found a way to come alive.</p>
      <p>We've persevered and adapted,</p>
      <p>Overcoming all that was tasked.</p>
      <button
        className="primary-btn"
        style={{
          margin: "50px auto 0 auto",
        }}
        onClick={onLogin}
      >
        Start
      </button>
    </PageItem>
  );
};

const Page2: React.FC<{ userInfo: UserInfo }> = ({ userInfo }) => {
  return (
    <PageItem backgroundURL={page2} style={{ paddingTop: "60px" }}>
      <p>
        Hi <span className="emphasis-text">Qiao.dan</span>
      </p>
      <br />
      <p>
        <span className="emphasis-text">Jul 23,2022</span> was your first day
        with Clinic.
      </p>
      <br />
      <p>
        You visited the pages <span className="emphasis-text">34</span> days and
        viewed more than <span className="emphasis-text">65</span> clusters.
      </p>
      <SwipeToContinue />
    </PageItem>
  );
};

const Page3: React.FC<{ userInfo: UserInfo }> = ({ userInfo }) => {
  return (
    <PageItem backgroundURL={page3} style={{ paddingTop: "60px" }}>
      <p>
        <span className="emphasis-text">Jul 23,2022</span> was your busiest day.
        You had a total of <span className="emphasis-text">44</span> page
        operations that day.
      </p>
      <br />
      <p>
        <span className="emphasis-text">Sep 23</span> was the day you stayed up
        latest, you visited Clinic at{" "}
        <span className="emphasis-text">01:21:46</span>.
      </p>
      <SwipeToContinue />
    </PageItem>
  );
};

const Page4: React.FC<{ userInfo: UserInfo }> = ({ userInfo }) => {
  return (
    <PageItem backgroundURL={page4} style={{ paddingTop: "60px" }}>
      <p>The top 3 clusters you visited most are:</p>
      <br />
      <p className="emphasis-text">ossinsight</p>
      <p className="emphasis-text">SceneAuto-1673140040gcp</p>
      <p className="emphasis-text">Cluster0</p>
      <SwipeToContinue />
    </PageItem>
  );
};

const Page5: React.FC<{ userInfo: UserInfo }> = ({ userInfo }) => {
  return (
    <PageItem backgroundURL={page5} style={{ paddingTop: "60px" }}>
      <p>This year,</p>
      <p>
        you viewed Metric <span className="emphasis-text">435</span> times; and
        read <span className="emphasis-text">21</span> reports or events.
      </p>
      <button className="default-btn shadow-mask" style={{ marginTop: "60px" }}>
        Your title of the year
      </button>
      <div className="title-brand">
        <img src={titlebrand} alt="" />
        <p className="title-brand-name">Super Diagnostician</p>
      </div>
      <SwipeToContinue />
    </PageItem>
  );
};

const Page6: React.FC<{
  userInfo: UserInfo;
  onRetry: (index: number) => void;
}> = ({ userInfo, onRetry }) => {
  return (
    <PageItem backgroundURL={page6} style={{ paddingTop: "20px" }}>
      <p>
        <span className="emphasis-text" style={{ fontSize: "22px" }}>
          Qiao Dan,
        </span>
      </p>
      <p>Your title of the year</p>
      <div className="title-info-container">
        <div
          className="primary-btn shadow-mask"
          style={{
            margin: "12px 0 21px",
            position: "relative",
            padding: "20px 26px",
          }}
        >
          <div className="title-info">
            <div
              className="rocket"
              style={{ flexShrink: 0, marginRight: "30px" }}
            >
              <img src={rocketIcon} alt="" />
            </div>
            <p style={{ fontSize: "22px", fontWeight: 700 }}>
              Super Diagnostician
            </p>
          </div>
          <img className="rocket-img" src={rocket} alt="" />
        </div>
        <img className="spark-img" src={spark} alt="" />
      </div>
      <p style={{ marginBottom: "15px" }}>Your footprints on Clinic</p>
      <div className="footprint">
        <div className="default-btn shadow-mask page6-records">
          <span>Joind for</span>
          <p className="page6-records-content">123</p>
          <p className="page6-records-days">days</p>
        </div>
        <div className="default-btn shadow-mask page6-records">
          <img className="page6-analyze" src={analyze} alt="" />
          <span>Visited</span>
          <p className="page6-records-content">5</p>
          <p className="page6-records-days">days</p>
        </div>
      </div>
      <div className="page6-details">
        <img className="page6-details-img" src={page6_4} alt="" />
        <div className="page6-detail-item">
          <div className="page6-detail-icon">
            <img src={page6_1} alt="" />
          </div>
          <div className="page6-detail-info">
            <p className="page6-detail-info-title">Metrics activity</p>
            <p>Others</p>
          </div>
        </div>
        <div className="page6-detail-item">
          <div className="page6-detail-icon">
            <img src={page6_2} alt="" />
          </div>
          <div className="page6-detail-info">
            <p className="page6-detail-info-title">Log activity</p>
            <p>Others</p>
          </div>
        </div>
        <div className="page6-detail-item">
          <div className="page6-detail-icon">
            <img src={page6_3} alt="" />
          </div>
          <div className="page6-detail-info">
            <p className="page6-detail-info-title">Insight activity</p>
            <p>
              "Beat" {">="}{" "}
              <span
                className="emphasis-text"
                style={{ fontWeight: 700, fontSize: "24px" }}
              >
                30%
              </span>
            </p>
          </div>
        </div>
      </div>
      <button
        className="primary-btn"
        style={{
          margin: "42px auto 0 auto",
        }}
        onClick={() => onRetry(0)}
      >
        Replay
      </button>
    </PageItem>
  );
};

export default App;
