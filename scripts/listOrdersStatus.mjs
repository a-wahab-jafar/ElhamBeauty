process.env.MONGODB_URI = "mongodb+srv://abdalwahab:abdalwahab123@cluster0.ylugf95.mongodb.net/?appName=Cluster0";
import connectDB from '../config/db.js';
import Order from '../models/Order.js';

try {
  await connectDB();
  const orders = await Order.find({}).limit(20).lean();
  console.log('orders count:', orders.length);
  orders.forEach(o => console.log(o._id.toString(), o.status, o.date));
} catch (err) {
  console.error(err);
}
