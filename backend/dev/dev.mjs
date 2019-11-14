import { Database } from '../common/database.mjs'

const db = new Database();

async function dev1(name) {
  await db.excute('select max(id) as maxId from d3').then((res)=> {
    console.log(`执行${name}`);
    console.log(res[0]);
  });
}

dev1(8);

