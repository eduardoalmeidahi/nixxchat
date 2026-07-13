import { QueryInterface } from "sequelize";
import { v4 as uuidv4 } from "uuid";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    // Buscar todos os tickets onde o uuid é nulo ou vazio
    const [tickets] = await queryInterface.sequelize.query(
      `SELECT id FROM "Tickets" WHERE "uuid" IS NULL OR "uuid" = '';`
    ) as any[];

    // Atualizar cada ticket com um UUID válido gerado pelo JS (compatível com qualquer dialeto de banco de dados)
    for (const ticket of tickets) {
      const newUuid = uuidv4();
      await queryInterface.sequelize.query(
        `UPDATE "Tickets" SET "uuid" = '${newUuid}' WHERE id = ${ticket.id};`
      );
    }
  },

  down: async (queryInterface: QueryInterface) => {
    // Sem ação necessária para reverter a geração de UUIDs
  }
};
