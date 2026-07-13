import { QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // Verificar se o número destino já existe para evitar violação de restrição única
    const [existing] = await queryInterface.sequelize.query(
      `SELECT id FROM "Contacts" WHERE "number" = '15997146119' LIMIT 1;`
    ) as any[];

    if (existing && existing.length > 0) {
      // Se já existir, removemos o registro incorreto para evitar duplicação ou conflito
      await queryInterface.sequelize.query(
        `DELETE FROM "Contacts" WHERE "number" = '196829929074690';`
      );
    } else {
      await queryInterface.sequelize.query(
        `UPDATE "Contacts" SET "number" = '15997146119' WHERE "number" = '196829929074690';`
      );
    }
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query(
      `UPDATE "Contacts" SET "number" = '196829929074690' WHERE "number" = '15997146119';`
    );
  }
};
