import express from "express"
import dotenv from "dotenv"
import db from "./config/db2.js"
import bodyParser from "body-parser"
import cors from "cors"
import { empty } from "./helper/function.js"
import moment from "moment"

dotenv.config()

var app = express()
app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

app.use(cors()) // Use this after the variable declaration

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log("Server running on port " + PORT)
})

app.get("/all", async (req, res, next) => {
  try {
    let data = await db.query("SELECT * FROM kata_arti")
    res.json({
      data,
    })
  } catch (e) {
    res.status(500)
    res.json({
      data: [],
    })
  }
})

app.post("/add", async (req, res) => {
  const { kata, arti } = req.body ?? {}

  console.log(req.body)
  try {
    if (empty(kata) || empty(arti)) {
      throw new Error("Ada data kosong!")
    }
    await db.query(
      `INSERT INTO kata_arti(kata, arti) VALUES('${kata}', '${arti}')`
    )

    res.json({
      message: "Berhasil",
    })
  } catch (e) {
    res.status(500)
    res.json({
      message: "Terjadi kesalahan saat tambah",
      error: e,
      errorMessage: e.message,
    })
  }
})

app.put("/edit", async (req, res) => {
  const { kata, arti, id } = req.body ?? {}

  console.log("/edit", req.body)
  try {
    if (empty(kata) || empty(arti) || empty(id)) {
      throw new Error("Ada data kosong!")
    }
    await db.query(
      `UPDATE kata_arti SET kata='${kata}', arti='${arti}' WHERE id=${id}`
    )

    res.json({
      message: "Berhasil",
    })
  } catch (e) {
    res.status(500)
    res.json({
      message: "Terjadi kesalahan saat tambah",
      error: e,
      errorMessage: e.message,
    })
  }
})
