import express from 'express';
import bodyParser from 'body-parser';
import todoRoute from './route/todo.route';
import cors from 'cors'
const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());

app.use('/api/v1', todoRoute);

app.listen(port, () => {
  console.log(`Server is running on  ${port}`);
});
