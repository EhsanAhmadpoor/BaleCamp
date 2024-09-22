import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Pool } from "pg";

// type Q = Pool["query"];

@Injectable()
export class DBService implements OnModuleInit, OnModuleDestroy {
  pool: Pool | undefined;

  async onModuleInit() {
    this.pool = new Pool();
    return this.pool.connect();
  }

  async onModuleDestroy() {
    return this.pool?.end();
  }

  // public query: Q = (...args: Parameters<Q>): ReturnType<Q> => {
  //   this.pool?.query(...args);
  // };
}
