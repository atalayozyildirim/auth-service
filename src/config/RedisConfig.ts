import { createClient } from "redis";

const url: any = process.env.REDIS_HOST;

const client = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

const redisConnect = async () => {
  try {
    await client.connect();

    client.on("connect", () => {
      console.log("Redis connected");
    });

    client.on("error", (error) => {
      console.error("Error connecting to redis:", error);
    });
  } catch (error) {
    console.error("Error connecting to redis:", error);
  }
};

export default client;
export { redisConnect };
