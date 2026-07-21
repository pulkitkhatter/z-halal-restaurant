import "dotenv/config";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";

type DietType = "VEG" | "NON_VEG" | "EGG";

interface Dish {
  name: string;
  category: string;
  isPopular: boolean;
  dietType: DietType;
  description: string;
  imageUrl?: string;
}

const DISHES: Dish[] = [
  {
    name: "Tiebou Dieun",
    category: "Rice Dishes",
    isPopular: true,
    dietType: "NON_VEG",
    description:
      "Senegal's national dish — fish and vegetables slow-simmered in a rich tomato-and-tamarind rice, deeply savory with a bright tangy finish.",
    imageUrl: "/images/menu/tiebou-dieun.jpg",
  },
  {
    name: "Tiebou Naar",
    category: "Rice Dishes",
    isPopular: false,
    dietType: "NON_VEG",
    description:
      "A lighter, white-rice take on the classic fish-and-rice combo, simmered with fresh vegetables for a clean, comforting bowl.",
  },
  {
    name: "Tiebou Yapp",
    category: "Rice Dishes",
    isPopular: true,
    dietType: "NON_VEG",
    description:
      "Tender chunks of beef simmered into tomato rice until every grain soaks up the meaty, spiced broth.",
    imageUrl: "/images/menu/tiebou-yapp.jpg",
  },
  {
    name: "Tiebou Guinar",
    category: "Rice Dishes",
    isPopular: false,
    dietType: "NON_VEG",
    description:
      "Juicy braised chicken folded into seasoned tomato rice — a family-table favorite.",
  },
  {
    name: "Tiebou Niebe",
    category: "Rice Dishes",
    isPopular: false,
    dietType: "VEG",
    description:
      "Hearty black-eyed peas simmered into tomato rice — a filling, plant-based classic.",
  },
  {
    name: "Mafe",
    category: "Stews & Sauces",
    isPopular: true,
    dietType: "NON_VEG",
    description:
      "A silky, slow-simmered peanut stew with tender meat and vegetables, spooned generously over rice.",
    imageUrl: "/images/menu/mafe.jpg",
  },
  {
    name: "Soup Kandia",
    category: "Stews & Sauces",
    isPopular: true,
    dietType: "NON_VEG",
    description:
      "A rich, deeply savory okra soup simmered with fish and meat until velvety — a Senegalese comfort classic.",
    imageUrl: "/images/menu/soup-kandia.jpg",
  },
  {
    name: "Mborokhe",
    category: "Stews & Sauces",
    isPopular: false,
    dietType: "NON_VEG",
    description:
      "A hearty smoked-fish and vegetable stew, slow-cooked for deep, smoky flavor.",
  },
  {
    name: "Sakha Sakha",
    category: "Stews & Sauces",
    isPopular: false,
    dietType: "VEG",
    description:
      "Black-eyed pea leaves simmered with peanuts into a rustic, nourishing green stew.",
  },
  {
    name: "Yassa",
    category: "Stews & Sauces",
    isPopular: false,
    dietType: "NON_VEG",
    description:
      "Chicken marinated in tangy lemon and mustard, braised low and slow with sweet caramelized onions.",
  },
  {
    name: "Vermicelle",
    category: "Sides",
    isPopular: false,
    dietType: "VEG",
    description: "Delicately spiced vermicelli, light and fragrant.",
  },
  {
    name: "Tiere",
    category: "Sides",
    isPopular: false,
    dietType: "VEG",
    description: "Steamed millet couscous, fluffy and mild — the perfect base for any sauce.",
  },
  {
    name: "Couscous",
    category: "Sides",
    isPopular: false,
    dietType: "VEG",
    description: "Fluffy semolina couscous, steamed to perfection.",
  },
  {
    name: "Macaroni",
    category: "Sides",
    isPopular: false,
    dietType: "VEG",
    description: "A simple, comforting side of lightly seasoned pasta.",
  },
  {
    name: "Lakh",
    category: "Sides",
    isPopular: false,
    dietType: "VEG",
    description: "Sweet millet porridge served with creamy soured milk — a beloved Senegalese treat.",
  },
  {
    name: "Mbakhal Saloum",
    category: "Sides",
    isPopular: false,
    dietType: "NON_VEG",
    description:
      "Rice and dried fish simmered in a peanut-tomato sauce, a specialty from the Saloum region.",
  },
  {
    name: "Dakhone",
    category: "Sides",
    isPopular: false,
    dietType: "VEG",
    description: "Steamed millet couscous served with sweet milk — a comforting, mildly sweet side.",
  },
];

async function main() {
  const adminEmail = process.env["ADMIN_EMAIL"];
  const adminPassword = process.env["ADMIN_PASSWORD"];

  if (!adminEmail || !adminPassword) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD must be set in the environment to seed an admin user",
    );
  }

  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await prisma.admin.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: { email: adminEmail, passwordHash },
  });
  console.log(`Admin user ready: ${adminEmail}`);

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  });
  console.log("Site settings ready");

  for (const [index, dish] of DISHES.entries()) {
    // Use the dish name as a stable id so re-running the seed is idempotent.
    await prisma.menuItem.upsert({
      where: { id: dish.name },
      update: { ...dish, sortOrder: index },
      create: { id: dish.name, ...dish, sortOrder: index },
    });
  }
  console.log(`Seeded ${DISHES.length} menu items`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
