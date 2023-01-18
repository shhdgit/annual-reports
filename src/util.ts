// export const setSession = (session: string) =>
//   localStorage.setItem("session", session);
// export const getSession = () => localStorage.getItem("session");
//
// export const validate = ({ code, state }: { code: string; state: string }) => {
//   return fetch(
//     "https://clinic.pingcap.com.cn/reports/api/v1/login/oauth/validate",
//     {
//       method: "POST",
//       body: JSON.stringify({ code, state }),
//     }
//   ).then((res) => res.json());
// };

export const auth = async () => {
  const res = await fetch(
    "https://clinic.pingcap.com.cn/reports/api/v1/login/oauth/info"
  )
    .then((res) => {
      return res.json();
    })
    .catch((e) => {
      throw e;
    });
  window.location.href = res.auth_url;
};

export const getInfo = ({ code, state }: { code: string; state: string }) => {
  return fetch(
    `https://clinic.pingcap.com.cn/reports/api/v1/login/annual?code=${code}&state=${state}`
  ).then((res) => {
    if (res.status === 200) {
      return res.json();
    }
    throw res;
  });
};

export const isMobile = () => {
  let flag =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  return flag;
};
