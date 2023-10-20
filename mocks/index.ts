import chats from "./chats";
import customProperties from "./custom-properties";
import example from "./example";
import groupTags from "./group-tags";
import root from "./root";
import uploads from "./uploads";
import users from "./users";

export default [
  ...root,
  ...example,
  ...customProperties,
  ...uploads,
  ...users,
  ...groupTags,
  ...chats,
];
