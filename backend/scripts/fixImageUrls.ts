import mongoose from 'mongoose';
import 'dotenv/config';
import CharityItem from '../models/CharityItem';
import Dog from '../models/Dog';

async function fixImageUrls() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');

    // Fix charity items
    const charityItems = await CharityItem.find({});
    for (const item of charityItems) {
      if (item.imageUrl) {
        // Extract just the path part from the URL
        const url = new URL(item.imageUrl);
        item.imageUrl = url.pathname;
        await item.save();
        console.log(`Updated charity item image URL: ${item.imageUrl}`);
      }
    }

    // Fix dogs
    const dogs = await Dog.find({});
    for (const dog of dogs) {
      if (dog.image) {
        // Extract just the path part from the URL
        const url = new URL(dog.image);
        dog.image = url.pathname;
        await dog.save();
        console.log(`Updated dog image URL: ${dog.image}`);
      }
    }

    console.log('All image URLs have been updated to use relative paths');
  } catch (error) {
    console.error('Error updating image URLs:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

fixImageUrls(); 