import { watchAuth } from "./auth.js";
import { watchUser } from "./user.js";

// main saga generators
export function* sagas() {
  yield [
     watchAuth(),
     watchUser(),
  ];
}
