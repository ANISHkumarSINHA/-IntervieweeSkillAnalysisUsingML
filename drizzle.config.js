/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://ai-interview-mocker_owner:yNWru9JZHD8S@ep-weathered-dawn-a5h5wge5.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require',
    }
  };
