import chats from "./chats";
import customProperties from "./custom-properties";
import example from "./example";
import groupTags from "./group-tags";
import messages from "./messages";
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
  ...messages,
];
