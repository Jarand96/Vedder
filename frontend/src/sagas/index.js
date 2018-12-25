import { watchAuth } from "./auth.js";

// main saga generators
export function* sagas() {
  yield [
     watchAuth(),
  ];
}
