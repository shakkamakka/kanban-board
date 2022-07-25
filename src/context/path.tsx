import { createContext } from "react";

const isLocalhost = location.hostname === "localhost" || location.hostname === "127.0.0.1"
const path= isLocalhost ? "http://localhost:3000/status": "https://my-json-server.typicode.com/shakkamakka/kanban-board/status";

const PathContext = createContext(path);

export {PathContext, path};
