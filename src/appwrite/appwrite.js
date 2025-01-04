import { Client, Databases } from 'appwrite';

const client = new Client();
const DB_ID = '676744db0005f5b35294';
const COLLECTION_ID = '676744f800156fc2045c';

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('676744280039fb68b721');

export const databases = new Databases(client);

export { client, DB_ID, COLLECTION_ID };
