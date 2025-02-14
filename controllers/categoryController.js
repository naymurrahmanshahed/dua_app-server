const db = require("../db");
const getCategoriesWithSubcategoriesAndDuas = (req, res) => {
  const sql = `
    SELECT 
        c.id AS category_id,
        c.cat_name_bn AS category_name_bn,
        c.cat_name_en AS category_name_en,
        s.id AS subcategory_id,
        s.subcat_name_bn AS subcategory_name_bn,
        s.subcat_name_en AS subcategory_name_en,
        d.id AS dua_id,
        d.dua_name_bn AS dua_name_bn,
        d.dua_name_en AS dua_name_en,
        d.dua_arabic,
        d.transliteration_bn,
        d.transliteration_en,
        d.translation_bn,
        d.translation_en,
        d.refference_bn,
        d.refference_en
    FROM category c
    LEFT JOIN sub_category s ON c.cat_id = s.cat_id
    LEFT JOIN dua d ON s.subcat_id = d.subcat_id
    ORDER BY c.id, s.id, d.id
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const categoryMap = new Map();

    rows.forEach((row) => {
      if (!categoryMap.has(row.category_id)) {
        categoryMap.set(row.category_id, {
          category_id: row.category_id,
          category_name_bn: row.category_name_bn,
          category_name_en: row.category_name_en,
          subcategories: [],
        });
      }

      let category = categoryMap.get(row.category_id);

      let subcategory = category.subcategories.find(
        (sub) => sub.subcategory_id === row.subcategory_id
      );

      if (!subcategory) {
        subcategory = {
          subcategory_id: row.subcategory_id,
          subcategory_name_bn: row.subcategory_name_bn,
          subcategory_name_en: row.subcategory_name_en,
          duas: [],
        };
        category.subcategories.push(subcategory);
      }

      if (row.dua_id) {
        subcategory.duas.push({
          dua_id: row.dua_id,
          dua_name_bn: row.dua_name_bn,
          dua_name_en: row.dua_name_en,
          dua_arabic: row.dua_arabic,
          transliteration_bn: row.transliteration_bn,
          transliteration_en: row.transliteration_en,
          translation_bn: row.translation_bn,
          translation_en: row.translation_en,
          refference_bn: row.refference_bn,
          refference_en: row.refference_en,
        });
      }
    });

    res.json(Array.from(categoryMap.values()));
  });
};

module.exports = { getCategoriesWithSubcategoriesAndDuas };
