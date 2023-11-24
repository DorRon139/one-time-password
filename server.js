import app from "./src/app.js";

import { PORT } from "./consts.js";

app.listen(PORT, () => {
  console.log("Listening to port", PORT);
});
