const db = require("../db");
const getCategoriesWithSubcategoriesAndDuas = (req, res) => {
  db.all("SELECT * FROM category", [], (err, categories) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    let categoriesData = [];
    let count = 0;

    categories.forEach((category) => {
      db.all(
        "SELECT * FROM sub_category WHERE cat_id = ?",
        [category.cat_id],
        (err, subcategories) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          let subcategoriesData = [];
          let subCount = 0;

          if (subcategories.length === 0) {
            categoriesData.push({
              ...category,
              subcategories: [],
              duas: [],
            });
            count++;
            if (count === categories.length) {
              res.json(categoriesData);
            }
          }

          subcategories.forEach((subcategory) => {
            db.all(
              "SELECT * FROM dua WHERE subcat_id = ?",
              [subcategory.subcat_id],
              (err, duas) => {
                if (err) {
                  return res.status(500).json({ error: err.message });
                }

                subcategoriesData.push({
                  ...subcategory,
                  duas: duas,
                });
                subCount++;
                if (subCount === subcategories.length) {
                  categoriesData.push({
                    ...category,
                    subcategories: subcategoriesData,
                  });
                  count++;
                  if (count === categories.length) {
                    res.json(categoriesData);
                  }
                }
              }
            );
          });
        }
      );
    });
  });
};

module.exports = { getCategoriesWithSubcategoriesAndDuas };
