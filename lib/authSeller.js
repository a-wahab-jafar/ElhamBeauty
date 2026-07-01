import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const authSeller = async (userId) => {
    if (!userId) {
        return false;
    }

    try {
        const client = await clerkClient();
        const user = await client.users.getUser(userId);
        return user.publicMetadata.role === 'seller';
    } catch (error) {
        return false;
    }
}

export default authSeller;