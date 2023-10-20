import {ServiceAccount} from '@prisma/client';
import {prisma} from "../../../libs/prisma";

export async function deleteServiceAccount(
  userId: string,
  id: string,
): Promise<ServiceAccount> {
  return await prisma.serviceAccount.delete({
    where: {
      id,
      userId,
    },
  });
}
