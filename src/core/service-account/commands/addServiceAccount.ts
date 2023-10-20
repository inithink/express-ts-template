import {ServiceAccount} from "@prisma/client";
import {prisma} from "../../../libs/prisma";
import {genId} from "../../../libs/genId";

export async function addServiceAccount(
  userId: string,
  serviceName: string,
  name: string,
  accountInfo: any,
): Promise<ServiceAccount> {
  return prisma.serviceAccount.create({
    data: {
      id: genId(),
      userId,
      name,
      status: 'NORMAL',
      accountInfo,
      serviceName,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
}
