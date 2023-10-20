import {prisma} from "../../../libs/prisma";

export async function getAccounts(userId: string) {
  return await prisma.serviceAccount.findMany({
    where: {
      userId,
    },
  });
}
