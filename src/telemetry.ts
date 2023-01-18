import mixpanel, { Mixpanel } from "mixpanel-browser";

export { mixpanel };

const PROJECT_TOKEN = "81481740545e4a3c889f3d22792a8904";

declare module "mixpanel-browser" {
  interface Config {
    api_payload_format: "base64" | "json";
  }
}

export function initTelemetry() {
  mixpanel.init(PROJECT_TOKEN, {
    // according to the mixpanel source code, if we don't set `api_payload_format` to `base64`
    // it will send plain payload
    // https://github.com/mixpanel/mixpanel-js/releases/tag/v2.43.0
    // issue: https://github.com/mixpanel/mixpanel-js/issues/336
    api_payload_format: "base64",
    autotrack: false,
    batch_requests: true,
    persistence: "localStorage",
    property_blacklist: [
      "$initial_referrer",
      "$initial_referring_domain",
      "$referrer",
      "$referring_domain",
    ],
    debug: process.env.NODE_ENV === "development",
  });
}

export function registerUser(user: string, email: string) {
  mixpanel.identify(email);
  // Must set! Append user and email information to the Mixpanel Users page
  mixpanel.people.set({ $name: user, $email: email });
}

export function createTelemetryAPI<T>(factory: (mixpanel: Mixpanel) => T): T {
  const track = mixpanel.track.bind(mixpanel);
  return factory({ track } as any);
}
