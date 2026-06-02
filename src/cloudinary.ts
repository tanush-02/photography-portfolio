// Cloudinary configuration
export const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || '';
export const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || '';
export const CLOUDINARY_API_KEY = process.env.REACT_APP_CLOUDINARY_API_KEY || '';
export const CLOUDINARY_API_SECRET = process.env.REACT_APP_CLOUDINARY_API_SECRET || '';

export interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  context?: {
    custom?: {
      description?: string;
      title?: string;
      content?: string;
      alt?: string;
    };
  };
  created_at: string;
  folder: string;
}

// Helper function to upload image to Cloudinary with metadata
export const uploadToCloudinary = async (
  file: File,
  folder: string = 'photography-portfolio',
  metadata?: { description?: string; title?: string; content?: string }
): Promise<CloudinaryResource> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('folder', folder);
  
  // Add metadata as context
  if (metadata) {
    const context = Object.entries(metadata)
      .filter(([_, value]) => value)
      .map(([key, value]) => `${key}=${value}`)
      .join('|');
    if (context) {
      formData.append('context', context);
    }
  }

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

// Fetch all images from a specific folder
export const fetchImagesFromCloudinary = async (folder: string): Promise<CloudinaryResource[]> => {
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/image?prefix=${folder}&context=true&max_results=500`,
      {
        headers: {
          'Authorization': `Basic ${btoa(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`)}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }

    const data = await response.json();
    return data.resources || [];
  } catch (error) {
    console.error('Error fetching images from Cloudinary:', error);
    return [];
  }
};

// Update image metadata (context)
export const updateImageMetadata = async (
  publicId: string,
  metadata: { description?: string; title?: string; content?: string }
): Promise<void> => {
  const context = Object.entries(metadata)
    .filter(([_, value]) => value)
    .map(([key, value]) => `${key}=${value}`)
    .join('|');

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/image/upload/${publicId}/context`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`)}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ context }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update metadata');
    }
  } catch (error) {
    console.error('Error updating metadata:', error);
    throw error;
  }
};

// Delete image from Cloudinary
export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = await generateSignature(publicId, timestamp);

    const formData = new FormData();
    formData.append('public_id', publicId);
    formData.append('timestamp', timestamp.toString());
    formData.append('api_key', CLOUDINARY_API_KEY);
    formData.append('signature', signature);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/destroy`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Failed to delete image');
    }
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
};

// Generate signature for authenticated requests (simplified - in production use backend)
const generateSignature = async (publicId: string, timestamp: number): Promise<string> => {
  // Note: This is a simplified version. In production, generate signature on backend
  const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;
  
  // Use SubtleCrypto API for SHA-1 hash
  const encoder = new TextEncoder();
  const data = encoder.encode(stringToSign);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
};

// Helper function to extract public_id from Cloudinary URL
export const getPublicIdFromUrl = (url: string): string => {
  try {
    // Extract public_id from URL like: https://res.cloudinary.com/cloud/image/upload/v123/folder/image.jpg
    const parts = url.split('/upload/');
    if (parts.length < 2) return '';
    
    const pathParts = parts[1].split('/');
    // Remove version (v123456) if present
    const relevantParts = pathParts.filter(part => !part.startsWith('v'));
    // Remove file extension
    const lastPart = relevantParts[relevantParts.length - 1];
    relevantParts[relevantParts.length - 1] = lastPart.split('.')[0];
    
    return relevantParts.join('/');
  } catch (error) {
    console.error('Error extracting public_id:', error);
    return '';
  }
};

// Made with Bob