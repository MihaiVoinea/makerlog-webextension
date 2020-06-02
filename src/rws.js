import ReconnectingWebSocket from "reconnecting-websocket";

import store from "./store";

let rws;

const setupRws = () => {
  // eslint-disable-next-line no-console
  console.log("setupRws() called");
  if (rws) rws.close();
  rws = new ReconnectingWebSocket(
    `wss://api.getmakerlog.com/users/${store.state.user.id}/stream/`
  );
  // eslint-disable-next-line no-console
  rws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    switch (data.type) {
      case "task.created":
        store.commit("ADD_TASK", data.payload);
        break;
      case "task.deleted":
        store.commit("DELETE_TASK", data.payload);
        break;
      case "task.updated":
        store.commit("UPDATE_TASK", data.payload);
        break;
      default:
        // eslint-disable-next-line no-console
        console.log("rws other event catched", data.payload);
        break;
    }
  };
};

export default setupRws;
