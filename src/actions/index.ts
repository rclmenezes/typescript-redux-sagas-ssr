import { AxiosError } from "axios";
import actionCreatorFactory from "typescript-fsa";

import { UserState } from "../reducers/user";

const factory = actionCreatorFactory("API");

const actionCreators = {
  apiTest: factory.async<{}, UserState, AxiosError>("API_TEST"),
};

export default actionCreators;
