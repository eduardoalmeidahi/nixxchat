import sequelize from "../database";
import Contact from "../models/Contact";
import Ticket from "../models/Ticket";
import Message from "../models/Message";
import TicketTraking from "../models/TicketTraking";
import { Op } from "sequelize";

const run = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established.");

    // Find all contacts where the number has 14 or more digits
    // Brazilian numbers have at most 13 digits (55 + 2 area + 9 phone)
    const contacts = await Contact.findAll({
      where: sequelize.where(
        sequelize.fn("char_length", sequelize.col("number")),
        {
          [Op.gte]: 14
        }
      )
    });

    console.log(`Found ${contacts.length} newsletter/channel contacts to delete.`);

    for (const contact of contacts) {
      console.log(`Deleting contact: ${contact.name} (${contact.number})`);

      // Find tickets for this contact
      const tickets = await Ticket.findAll({
        where: { contactId: contact.id }
      });

      for (const ticket of tickets) {
        // Delete ticket tracking
        await TicketTraking.destroy({
          where: { ticketId: ticket.id }
        });

        // Delete messages
        await Message.destroy({
          where: { ticketId: ticket.id }
        });

        // Delete ticket
        await ticket.destroy();
      }

      // Delete the contact
      await contact.destroy();
    }

    console.log("Cleanup completed successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Error running cleanup script:", err);
    process.exit(1);
  }
};

run();
