import {PrismaClient} from '@prisma/client';
import {DeepMockProxy, mockDeep, mockReset} from 'jest-mock-extended';
import {prisma} from "./libs/prisma";

// https://www.prisma.io/docs/guides/testing/unit-testing
jest.mock('./infrastructure/prisma', () => ({
  __esModule: true,
  prisma: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
