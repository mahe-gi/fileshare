import { NextRequest, NextResponse } from 'next/server';

async function createShareWithRetry(files: any[], retryCount = 0, maxRetries = 3): Promise<{ id: string; url: string }> {
  try {
    console.log(`Creating share link for ${files.length} files (attempt ${retryCount + 1}/${maxRetries + 1})`);

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

    // Handle rate limiting with retry
    if (response.status === 429) {
      if (retryCount < maxRetries) {
        // Exponential backoff: 2s, 4s, 8s
        const delay = Math.pow(2, retryCount + 1) * 1000;
        console.log(`Rate limited, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return createShareWithRetry(files, retryCount + 1, maxRetries);
      }
      throw new Error('Service is temporarily busy. Please try again in a few moments.');
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error('dpaste API error:', response.status, errorText);
      throw new Error(`Failed to create share link: ${response.status}`);
    }

    const pasteUrl = await response.text();
    // Extract ID from URL (e.g., https://dpaste.com/ABCD -> ABCD)
    const id = pasteUrl.trim().split('/').pop();
    
    if (!id) {
      throw new Error('Invalid response from paste service');
    }
    
    console.log('Share link created successfully:', id);
    
    return { 
      id: id,
      url: pasteUrl 
    };
  } catch (error) {
    // Don't retry on non-rate-limit errors
    if (error instanceof Error && !error.message.includes('temporarily busy')) {
      throw error;
    }
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { files } = await request.json();

    if (!files || !Array.isArray(files) || files.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request', details: 'Files array is required' },
        { status: 400 }
      );
    }

    const result = await createShareWithRetry(files);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error creating share link:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const statusCode = errorMessage.includes('temporarily busy') ? 429 : 500;
    
    return NextResponse.json(
      { 
        error: 'Failed to create share link', 
        details: errorMessage 
      },
      { status: statusCode }
    );
  }
}
