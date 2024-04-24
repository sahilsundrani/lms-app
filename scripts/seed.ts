const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                {name: "Computer Science"},
                {name: "Music"},
                {name: "Photography"},
                {name: "Fitness"},
                {name: "Filming"},
                {name: "Accounting"},
                {name: "Engineering"},
            ]
        });
        
        console.log("success");
    } catch (error) {
        console.log("Error seeding the database cat  egory", error);
    } finally {
        await database.$disconnect();
    }
}

main();