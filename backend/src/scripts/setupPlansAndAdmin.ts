import sequelize from "../database";
import Plan from "../models/Plan";
import User from "../models/User";
import Company from "../models/Company";

const run = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established.");

    // Update or create plans
    const plansData = [
      {
        id: 1,
        name: "Start",
        users: 1,
        connections: 1,
        queues: 1,
        value: 59.90,
        useSchedules: true,
        useCampaigns: false,
        useInternalChat: false,
        useExternalApi: false,
        useKanban: false,
        useOpenAi: false,
        useIntegrations: false
      },
      {
        id: 2,
        name: "Basic",
        users: 2,
        connections: 1,
        queues: 2,
        value: 99.90,
        useSchedules: true,
        useCampaigns: true,
        useInternalChat: true,
        useExternalApi: false,
        useKanban: false,
        useOpenAi: false,
        useIntegrations: false
      },
      {
        id: 3,
        name: "Pro",
        users: 5,
        connections: 2,
        queues: 5,
        value: 189.90,
        useSchedules: true,
        useCampaigns: true,
        useInternalChat: true,
        useExternalApi: true,
        useKanban: true,
        useOpenAi: true,
        useIntegrations: true
      },
      {
        id: 4,
        name: "Business",
        users: 10,
        connections: 3,
        queues: 999,
        value: 299.90,
        useSchedules: true,
        useCampaigns: true,
        useInternalChat: true,
        useExternalApi: true,
        useKanban: true,
        useOpenAi: true,
        useIntegrations: true
      },
      {
        id: 5,
        name: "Enterprise",
        users: 999,
        connections: 999,
        queues: 999,
        value: 999.90,
        useSchedules: true,
        useCampaigns: true,
        useInternalChat: true,
        useExternalApi: true,
        useKanban: true,
        useOpenAi: true,
        useIntegrations: true
      }
    ];

    // Rename existing plans to temp names first to avoid unique name constraint violations
    const existingPlans = await Plan.findAll();
    for (const p of existingPlans) {
      await p.update({ name: `temp_plan_${p.id}_${Math.floor(Math.random() * 10000)}` });
    }
    console.log("Renamed existing plans to temp names.");

    for (const planData of plansData) {
      const plan = await Plan.findByPk(planData.id);
      if (plan) {
        await plan.update(planData);
        console.log(`Plan '${planData.name}' updated.`);
      } else {
        await Plan.create(planData);
        console.log(`Plan '${planData.name}' created.`);
      }
    }

    // Create or update default company first
    const [company, createdCompany] = await Company.findOrCreate({
      where: { id: 1 },
      defaults: {
        name: "Nixx Suite",
        planId: 5,
        dueDate: "2030-12-31 23:59:59"
      }
    });

    if (!createdCompany) {
      await company.update({
        name: "Nixx Suite",
        planId: 5
      });
      console.log("Default company updated.");
    } else {
      console.log("Default company created.");
    }

    // Create or update superadmin user
    const email = "eduardoalmeida.hi@gmail.com";
    const password = "19921702";

    const [user, createdUser] = await User.findOrCreate({
      where: { email },
      defaults: {
        name: "Eduardo Almeida",
        email,
        password,
        profile: "admin",
        super: true,
        companyId: 1
      }
    });

    if (!createdUser) {
      await user.update({
        name: "Eduardo Almeida",
        password,
        profile: "admin",
        super: true
      });
      console.log("Superadmin user updated.");
    } else {
      console.log("Superadmin user created.");
    }

    console.log("Setup completed successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Error running setup:", err);
    process.exit(1);
  }
};

run();
