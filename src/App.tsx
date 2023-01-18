import React, { useEffect, useMemo, useRef, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { default as dayjs } from "dayjs";
import debounce from "lodash/debounce";

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
import { auth, getInfo, isMobile } from "./util";
import { initTelemetry, mixpanel, registerUser } from "./telemetry";

initTelemetry();

type UserInfo = any;

const Prefetch: React.FC<{ srcs: string[] }> = ({ srcs }) => {
  return (
    <>
      {srcs.map((src) => (
        <img key={src} style={{ display: "none" }} src={src} alt="" />
      ))}
    </>
  );
};

const getLarkCode = () => {
  const search = new URLSearchParams(window.location.search.slice(1));
  return { code: search.get("code"), state: search.get("state") };
};

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const tryToGetUserInfo = async () => {
    const { code, state } = getLarkCode();
    const hasLarkCode = !!code && !!state;

    if (hasLarkCode) {
      try {
        setLoading(true);
        const info = await getInfo({
          code,
          state,
        });
        setUserInfo(info);
        registerUser(info.name, info.email);
      } catch (e) {
        window.location.search = "";
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    tryToGetUserInfo();
  }, []);

  return { loading, userInfo, tryToGetUserInfo };
};

function App() {
  const [selectedItem, setSelectedItem] = useState(0);
  const { userInfo, loading } = useUserInfo();
  const isMobileFlag = useRef(isMobile());
  const onWheelScroll = useRef(
    debounce(
      (e) => {
        if (e.deltaY > 0) {
          setSelectedItem((i) => {
            if (i < 4) {
              return i + 1;
            } else {
              return i;
            }
          });
        } else {
          setSelectedItem((i) => {
            if (i > 0) {
              return i - 1;
            } else {
              return i;
            }
          });
        }
      },
      100,
      { leading: true, trailing: false }
    )
  );
  const onClick = useRef(
    debounce(() => {
      if (isMobileFlag.current) {
        return;
      }
      setSelectedItem((i) => {
        if (i < 4) {
          return i + 1;
        } else {
          return i;
        }
      });
    }, 100)
  );

  useEffect(() => {
    if (!userInfo) {
      return;
    }
    mixpanel.track(`2022 Annual Report Page View: Page ${selectedItem + 1}`);
  }, [userInfo, selectedItem]);

  return !userInfo ? (
    <>
      <Page1
        onLogin={() => {
          mixpanel.track("2022 Annual Report: Click Authorization Button");
          auth();
        }}
        loading={loading}
      />
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
  ) : userInfo.joinTime ? (
    <div onWheel={onWheelScroll.current} onClick={onClick.current}>
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
        <Page2 userInfo={userInfo} />
        <Page3 userInfo={userInfo} />
        <Page4 userInfo={userInfo} />
        <Page5 userInfo={userInfo} />
        <Page6 userInfo={userInfo} onRetry={setSelectedItem} />
      </Carousel>
    </div>
  ) : (
    <Page2 userInfo={userInfo} />
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
  const isMobileFlag = useRef(isMobile());
  return (
    <div
      {...props}
      className={`page-item ${props.className}`}
      style={{
        background: `url(${backgroundURL}) no-repeat center`,
        backgroundAttachment: "fixed",
        backgroundSize: isMobileFlag.current ? "cover" : "auto 100%",
        ...props.style,
      }}
    >
      {children}
    </div>
  );
};

const SwipeToContinue: React.FC = () => {
  const isMobileFlag = useRef(isMobile());
  return (
    <p className="swipe">
      {isMobileFlag.current ? "Swipe up" : "Click"} to continue
    </p>
  );
};

const Page1: React.FC<{ onLogin: () => void; loading: boolean }> = ({
  onLogin,
  loading,
}) => {
  useEffect(() => {
    mixpanel.track(`2022 Annual Report Page View: Welcome Page`);
  }, []);

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
        className={`primary-btn ${loading ? "loading-btn" : ""}`}
        style={{
          margin: "50px auto 0 auto",
        }}
        onClick={onLogin}
      >
        {loading ? "Login..." : "Start"}
      </button>
    </PageItem>
  );
};

const Page2: React.FC<{ userInfo: UserInfo }> = ({ userInfo }) => {
  return (
    <PageItem backgroundURL={page2} style={{ paddingTop: "60px" }}>
      <p>
        Hi <span className="emphasis-text">{userInfo.name}</span>
      </p>
      <br />
      {userInfo.joinTime ? (
        <>
          <p>
            <span className="emphasis-text">
              {dayjs.unix(userInfo.joinTime).format("MMM d,YYYY")}
            </span>{" "}
            was your first day with Clinic.
          </p>
          <br />
          <p>
            You visited the pages{" "}
            <span className="emphasis-text">{userInfo.totalDays.count}</span>{" "}
            days and viewed more than{" "}
            <span className="emphasis-text">
              {userInfo.totalClusters.count}
            </span>{" "}
            clusters.
          </p>
          <SwipeToContinue />
        </>
      ) : (
        <>
          <p>Unfortunately, Clinic do not have your usage data for 2022.</p>
          <br />
          <p>Try to use more in 2023!</p>
        </>
      )}
    </PageItem>
  );
};

const Page3: React.FC<{ userInfo: UserInfo }> = ({ userInfo }) => {
  const busiestDay = useMemo<any>(() => {
    let bd: any = null;
    Object.entries(userInfo.busiest3Days || {}).forEach(([dtext, d]) => {
      if (!!bd && bd.eventsCount > (d as any).eventsCount) {
        return;
      }

      bd = {
        text: dtext,
        ...(d as any),
      };
    });
    return bd;
  }, [userInfo]);
  const latestDay = useMemo(
    () => dayjs(userInfo.latestWorktime.local_datetime),
    [userInfo]
  );

  return (
    <PageItem backgroundURL={page3} style={{ paddingTop: "60px" }}>
      <p>
        <span className="emphasis-text">
          {dayjs(busiestDay.text).format("MMM D,YYYY")}
        </span>{" "}
        was your busiest day. You had a total of{" "}
        <span className="emphasis-text">{busiestDay?.eventsCount}</span> page
        operations that day.
      </p>
      <br />
      {(latestDay.hour() >= 18 || latestDay.hour() < 6) && (
        <p>
          <span className="emphasis-text">
            {latestDay.format("MMM D,YYYY")}
          </span>{" "}
          was the day you stayed up latest, you visited Clinic at{" "}
          <span className="emphasis-text">{latestDay.format("HH:mm:ss")}</span>.
        </p>
      )}
      <SwipeToContinue />
    </PageItem>
  );
};

const Page4: React.FC<{ userInfo: UserInfo }> = ({ userInfo }) => {
  const top1Cluster = userInfo.top10Clusters[0];
  const top2Cluster = userInfo.top10Clusters[1];
  const top3Cluster = userInfo.top10Clusters[2];
  return (
    <PageItem backgroundURL={page4} style={{ paddingTop: "60px" }}>
      <p>The top 3 clusters you visited most are:</p>
      <br />
      <p className="emphasis-text">{top1Cluster.name || top1Cluster.id}</p>
      <p className="emphasis-text">{top2Cluster.name || top2Cluster.id}</p>
      <p className="emphasis-text">{top3Cluster.name || top3Cluster.id}</p>
      <SwipeToContinue />
    </PageItem>
  );
};

const classMap: {
  [k: string]: string;
} = {
  Tier1: "Super Diagnostician",
  Tier2: "Senior Diagnostician",
  Tier3: "Potential Diagnostician",
};

const Page5: React.FC<{ userInfo: UserInfo }> = ({ userInfo }) => {
  return (
    <PageItem backgroundURL={page5} style={{ paddingTop: "60px" }}>
      <p>This year,</p>
      <p>
        you viewed Metric{" "}
        <span className="emphasis-text">
          {userInfo.clickMetricsItems.count}
        </span>{" "}
        times; and read{" "}
        <span className="emphasis-text">
          {userInfo.reportAndEventCount.count}
        </span>{" "}
        reports or events.
      </p>
      <button className="default-btn shadow-mask" style={{ marginTop: "60px" }}>
        Your title of the year
      </button>
      <div className="title-brand">
        <img src={titlebrand} alt="" />
        <p className="title-brand-name">{classMap[userInfo.class]}</p>
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
    <PageItem
      backgroundURL={page6}
      style={{ paddingTop: "20px", fontSize: "14px" }}
    >
      <p>
        <span className="emphasis-text" style={{ fontSize: "18px" }}>
          {userInfo.name},
        </span>
      </p>
      <p>Your title of the year</p>
      <div className="title-info-container">
        <div
          className="primary-btn shadow-mask"
          style={{
            margin: "12px 0 21px",
            position: "relative",
            padding: "12px 18px",
          }}
        >
          <div className="title-info">
            <div
              className="rocket"
              style={{ flexShrink: 0, marginRight: "30px" }}
            >
              <img src={rocketIcon} alt="" />
            </div>
            <p
              style={{
                fontSize: "18px",
                fontWeight: 700,
                paddingRight: "60px",
              }}
            >
              {classMap[userInfo.class]}
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
          <p className="page6-records-content">
            {dayjs().diff(dayjs.unix(userInfo.joinTime), "day")}
          </p>
          <p className="page6-records-days">days</p>
        </div>
        <div className="default-btn shadow-mask page6-records">
          <img className="page6-analyze" src={analyze} alt="" />
          <span>Visited</span>
          <p className="page6-records-content">{userInfo.totalDays.count}</p>
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
            <p>{formatBeat(userInfo.metricsActivityCount.beat)}</p>
          </div>
        </div>
        <div className="page6-detail-item">
          <div className="page6-detail-icon">
            <img src={page6_2} alt="" />
          </div>
          <div className="page6-detail-info">
            <p className="page6-detail-info-title">Log activity</p>
            <p>{formatBeat(userInfo.logsActivityCount.beat)}</p>
          </div>
        </div>
        <div className="page6-detail-item">
          <div className="page6-detail-icon">
            <img src={page6_3} alt="" />
          </div>
          <div className="page6-detail-info">
            <p className="page6-detail-info-title">Insight activity</p>
            <p>{formatBeat(userInfo.insightActivityCount.beat)}</p>
          </div>
        </div>
      </div>
      <button
        className="primary-btn"
        style={{
          margin: "22px auto 0 auto",
        }}
        onClick={(e) => {
          e.stopPropagation();
          onRetry(0);
          mixpanel.track("2022 Annual Report: Click Retry Button");
        }}
      >
        Replay
      </button>
    </PageItem>
  );
};

const formatBeat = (beat: string) => {
  const bnum = parseInt(beat);
  if (bnum >= 70) {
    return (
      <>
        "Beat" {">="}{" "}
        <span
          className="emphasis-text"
          style={{ fontWeight: 700, fontSize: "18px" }}
        >
          70%
        </span>
      </>
    );
  }
  if (bnum >= 50) {
    return (
      <>
        "Beat" {">="}{" "}
        <span
          className="emphasis-text"
          style={{ fontWeight: 700, fontSize: "18px" }}
        >
          50%
        </span>
      </>
    );
  }
  return "Others";
};

export default App;
