import { NextResponse } from 'next/server';
import {uploadToPinata} from '../../../utils/back/pinata/pinata'

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { image } = body;
        
        if (!image) {
            return NextResponse.json(
                { error: 'Missing required parameters', status: 'error' },
                { status: 400 }
            );
        }

        const result = await uploadToPinata(image);
        
        if (result.status === 'error') {
            console.error('Error from Pinata:', result.message);
            return NextResponse.json(
                { error: result.message, status: 'error' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            link: result.link,
            status: 'success'
        });
    } catch (error: any) {
        console.error('Error in IPFS upload:', error);
        return NextResponse.json(
            { error: error.message || 'Internal server error', status: 'error' },
            { status: 500 }
        );
    }
} 