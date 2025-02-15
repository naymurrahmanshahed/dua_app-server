const db = require("../db");

const duaController = async (req, res) => {
  const categoryId = parseInt(req.params.id, 10);

  if (isNaN(categoryId)) {
    return res.status(400).json({ error: "Invalid category ID" });
  }

  try {
    const query = `
      SELECT d.*, 
             c.cat_name_bn, c.cat_name_en, c.cat_icon, 
             s.subcat_name_bn, s.subcat_name_en
      FROM dua d
      JOIN category c ON d.cat_id = c.cat_id
      JOIN sub_category s ON d.subcat_id = s.subcat_id
      WHERE d.cat_id = ?;
    `;

    db.all(query, [categoryId], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: "Database error", details: err });
      }
      if (rows.length === 0) {
        return res
          .status(404)
          .json({ message: "No duas found for this category" });
      }
      res.json(rows);
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

module.exports = { duaController };
