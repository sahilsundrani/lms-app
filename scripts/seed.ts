const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                {name: "Computer Science"},
                {name: "DevOps"},
                {name: "AI/ML"},
                {name: "Fitness"},
                {name: "Filming"},
                {name: "Accounting"},
                {name: "Medical"},
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