import { db } from "./db";
import { users } from "./database/schema";

async function main() {
  try {
    await db
      .insert(users)
      .values({
        name: "John Doe",
        email: "john.doe@email.com",
        profileImage:
          "https://unsplash.com/collections/9452494/demo-profile-images",
      });
    const result = await db.select().from(users);
    console.log("Successfully queried the database:", result);
  } catch (error) {
    console.error("Error querying the database:", error);
  }
}

main();
