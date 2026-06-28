// src/inngest/client.ts
import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";

// Create an Inngest client to send and receive events
export const inngest = new Inngest({ id: "elhambeauty-next" });


// Inngest function to save user data to a database

export const syncUserCreation = inngest.createFunction(
    {
        id: "sync-user-from-clerk",
        triggers: {
            event: "clerk/user.created",
        },
    },
    async({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        const userData = {
            _id: id,
            name: first_name + " " + last_name,
            email: email_addresses[0].email_address,
            imageUrl: image_url,
        };
        await connectDB();
        await User.create(userData);
    }
);

//Inngest function to update user data in the database 
export const syncUserUpdation = inngest.createFunction(
    {
        id: 'update-user-from-clerk',
        triggers: {
            event: 'clerk/user.updated',
        },
    },
    async({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        const userData = {
            _id: id,
            name: first_name + " " + last_name,
            email: email_addresses[0].email_address,
            imageUrl: image_url,
        };
        await connectDB();
        await User.findByIdAndUpdate(id, userData);
    }
);

// IIngest function to delete user data from the database
export const syncUserDeletion = inngest.createFunction(
    {
        id: 'delete-user-with-clerk',
        triggers: {
            event: 'clerk/user.deleted',
        },
    },
    async({ event }) => {
        const { id } = event.data;
        await connectDB();
        await User.findByIdAndDelete(id);
    }
);