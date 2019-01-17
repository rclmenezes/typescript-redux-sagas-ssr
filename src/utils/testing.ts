import { Href, UnregisterCallback } from "history";

import { PageRoutingProps } from "./routing";

export function createMockRouterProps<P>(params: P, search: string = "") {
  const location = {
    hash: "",
    key: "",
    pathname: "",
    search,
    state: {},
  };

  const props: PageRoutingProps<P> = {
    history: {
      action: "POP",
      block: t => {
        const temp: UnregisterCallback = () => {};
        return temp;
      },
      createHref: t => {
        const temp: Href = "";
        return temp;
      },
      go: num => {},
      goBack: () => {},
      goForward: () => {},
      length: 2,
      listen: t => {
        const temp: UnregisterCallback = () => {};
        return temp;
      },
      location,
      push: () => {},
      replace: () => {},
    },
    location,
    match: {
      isExact: true,
      params,
      path: "",
      url: "",
    },
    staticContext: {
      status: 200,
    },
  };
  return props;
}
