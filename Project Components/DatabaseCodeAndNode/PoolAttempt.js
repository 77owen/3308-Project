const {createPool} = require('mysql')

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "Ironman7",
})

pool.query(`select * from mydb.userinfo`, (err, res) =>{
  return console.log(res)
})