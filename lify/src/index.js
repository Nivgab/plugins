import { before } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";

const MessageActions = findByProps("sendMessage", "editMessage");

let unpatch;

export default {
  onLoad: () => {
    unpatch = before("sendMessage", MessageActions, (args) => {
      const msg = args[1];
      if (msg && typeof msg.content === "string" && msg.content.length > 0) {
        msg.content = msg.content
          .split(" ")
          .map((w) => (w.length > 0 ? "l" + w : w))
          .join(" ");
      }
    });
  },

  onUnload: () => {
    unpatch?.();
  },
};
