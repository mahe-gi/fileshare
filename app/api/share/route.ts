import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { files } = await request.json();

    console.log('Creating share link for', files.length, 'files');

    // Use dpaste.com as free storage (no auth needed)
    const response = await fetch('https://dpaste.com/api/v2/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        content: JSON.stringify(files),
        syntax: 'json',
        expiry_days: '1', // 1 day expiry
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('dpaste API error:', response.status, errorText);
      throw new Error(`Failed to create share link: ${response.status}`);
    }

    const pasteUrl = await response.text();
    // Extract ID from URL (e.g., https://dpaste.com/ABCD -> ABCD)
    const id = pasteUrl.trim().split('/').pop();
    
    console.log('Share link created successfully:', id);
    
    return NextResponse.json({ 
      id: id,
      url: pasteUrl 
    });
  } catch (error) {
    console.error('Error creating share link:', error);
    return NextResponse.json(
      { error: 'Failed to create share link', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
