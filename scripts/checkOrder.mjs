process.env.MONGODB_URI = "mongodb+srv://abdalwahab:abdalwahab123@cluster0.ylugf95.mongodb.net/?appName=Cluster0";

import connectDB from '../config/db.js';
import Order from '../models/Order.js';

const id = '6a4548b9732a8ee898e5f0c';

try {
  await connectDB();
  const order = await Order.findById(id).lean();
  console.log(order ? 'FOUND:' + JSON.stringify(order) : 'NOT_FOUND');
} catch (err) {
  console.error(err);
}
