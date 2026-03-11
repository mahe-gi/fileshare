import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { files } = await request.json();

    // Create a GitHub Gist with the files data
    const gistData = {
      description: 'Shared files from File Sharing Platform',
      public: true,
      files: {
        'files.json': {
          content: JSON.stringify(files, null, 2)
        }
      }
    };

    // Create gist without authentication (anonymous gist)
    const response = await fetch('https://api.github.com/gists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json',
      },
      body: JSON.stringify(gistData)
    });

    if (!response.ok) {
      throw new Error('Failed to create gist');
    }

    const gist = await response.json();
    
    // Return the gist ID
    return NextResponse.json({ 
      id: gist.id,
      url: gist.html_url 
    });
  } catch (error) {
    console.error('Error creating share link:', error);
    return NextResponse.json(
      { error: 'Failed to create share link' },
      { status: 500 }
    );
  }
}
