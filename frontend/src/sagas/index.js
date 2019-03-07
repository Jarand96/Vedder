import { watchAuth } from "./auth.js";
import { watchUser } from "./user.js";
import { watchPosts } from "./posts.js";

// main saga generators
export function* sagas() {
  yield [
     watchAuth(),
     watchUser(),
     watchPosts(),
  ];
}
