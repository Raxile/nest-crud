// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnApplicationShutdown } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnApplicationShutdown {
  /**
   * Connect to the database when the module initializes.
   * PrismaClient.$connect is fully typed, no @ts-expect-error needed.
   */
  async onModuleInit(): Promise<void> {
    await this.$connect();
    console.log('✅ Prisma connected');
  }

  /**
   * Disconnect from the database when the application shuts down.
   */
  async onApplicationShutdown(signal?: string): Promise<void> {
    await this.$disconnect();
    console.log(`🛑 Prisma disconnected (signal: ${signal ?? 'N/A'})`);
  }
}
