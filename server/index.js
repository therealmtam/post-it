// MODULES:
const express = require('express');

const app = express();

app.use(express.static(`${__dirname}/../client/dist`));

//-------------------------------------------------------------------
// SETUP CONNECTION TO SERVER:
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Connected to Port ${port}`);
});

