const db = require("../db");
const getCategoriesWithSubcategoriesAndDuas = async (req, res) => {
  try {
    const categories = await new Promise((resolve, reject) => {
      db.all("SELECT * FROM category", [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });

    const categoriesData = await Promise.all(
      categories.map(async (category) => {
        const subcategories = await new Promise((resolve, reject) => {
          db.all(
            "SELECT * FROM sub_category WHERE cat_id = ?",
            [category.cat_id],
            (err, rows) => {
              if (err) reject(err);
              else resolve(rows);
            }
          );
        });

        const subcategoriesData = await Promise.all(
          subcategories.map(async (subcategory) => {
            const duas = await new Promise((resolve, reject) => {
              db.all(
                "SELECT * FROM dua WHERE subcat_id = ?",
                [subcategory.subcat_id],
                (err, rows) => {
                  if (err) reject(err);
                  else resolve(rows);
                }
              );
            });

            return { ...subcategory, duas };
          })
        );

        return { ...category, subcategories: subcategoriesData };
      })
    );

    res.json(categoriesData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getCategoriesWithSubcategoriesAndDuas };
