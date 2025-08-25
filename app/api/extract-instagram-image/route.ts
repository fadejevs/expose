import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Extract image URL from Instagram post
    const imageUrl = await extractInstagramImage(url);

    return NextResponse.json({ imageUrl });

  } catch (error) {
    console.error('Error extracting Instagram image:', error);
    return NextResponse.json(
      { error: 'Failed to extract image' }, 
      { status: 500 }
    );
  }
}

async function extractInstagramImage(url: string) {
  try {
    // Extract post ID from Instagram URL
    const postIdMatch = url.match(/instagram\.com\/p\/([^\/\?]+)/);
    if (!postIdMatch) {
      // If it's not an Instagram URL, return the original URL
      return url;
    }

    const postId = postIdMatch[1];
    
    // Try to construct the media URL
    const mediaUrl = `https://www.instagram.com/p/${postId}/media/?size=l`;
    
    return mediaUrl;

  } catch (error) {
    console.error('Error extracting Instagram image:', error);
    // Return the original URL as fallback
    return url;
  }
}
