import {ServiceAccount} from '@prisma/client';
import {prisma} from "../../../libs/prisma";

export async function changeServiceAccount(
  userId: string,
  id: string,
  serviceName: string,
  name: string,
  accountInfo: any,
): Promise<ServiceAccount> {
  return await prisma.serviceAccount.update({
    data: {
      name,
      serviceName,
      status: 'NORMAL',
      accountInfo,
      updatedAt: new Date(),
    },
    where: {
      id,
      userId,
    },
  });
}
