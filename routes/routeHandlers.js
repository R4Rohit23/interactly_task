import express from "express";
const router = express.Router();
import { db } from "../server.js";

// POST Request for creating contact
router.post("/createContact", (req, res) => {
  try {
    db.query(`INSERT INTO contacts SET ?`, req.body, (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Error Inserting Data into Database",
          error: err,
        });
      } else {
        res
          .status(200)
          .json({ message: "Data inserted successfully", result: result });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/getContacts/:contact_id", (req, res) => {
  const contact_id = req.params.contact_id;

  try {
    db.query(`SELECT * from contacts WHERE id = ?`, contact_id, (err, result) => {
      if (err) {
        return res
          .status(404)
          .json({ message: "Error Retriving contacts", error: err });
      } else {
        return res
          .status(200)
          .json({ message: "Contact Retrived Successfully", result: result });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/updateContact/:contact_id", (req, res) => {
  try {
    const contact_id = req.params.contact_id;
    const new_email = req.body.email;
    const new_number = req.body.mobile_number;

    db.query(`UPDATE contacts SET email = '${new_email}', mobile_number = '${new_number}' WHERE id = ${contact_id}`, (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error updating contact", error: err });
        } else {
          return res
            .status(200)
            .json({ message: "Contact Updated Successfully", result: result });
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post('/deleteContact/:contact_id', (req, res) => {
  try {
    const id = req.params.contact_id;
    db.query(`DELETE from contacts WHERE id = ${id}`, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error deleting contact", error: err });
      } else {
        return res
          .status(200)
          .json({ message: "Contact Deleted Successfully", result: result });
      }
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
})

export default router;
