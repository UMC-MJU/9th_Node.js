import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 예시: food_category 기본 데이터
  const categories = [
    { name: "한식" },
    { name: "중식" },
    { name: "일식" },
    { name: "양식" },
    { name: "디저트" },
  ];

  await prisma.foodCategory.createMany({
    data: categories,
    skipDuplicates: true, // 이미 있으면 넘어감
  });
  console.log("Food categories created");

  const regions = [
    { name: "서울" },
    { name: "경기" },
    { name: "인천" },
    { name: "부산" },
    { name: "대구" },
  ];

  await prisma.region.createMany({
    data: regions,
    skipDuplicates: true,
  });
  console.log("Regions created");

  // 필요 시 region, store 등도 같은 방식으로 추가
  // await prisma.region.create({ data: { name: "서울" } });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seed complete");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });