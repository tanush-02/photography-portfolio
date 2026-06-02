import React, { useState, useEffect } from 'react';
import {
  uploadToCloudinary,
  fetchImagesFromCloudinary,
  updateImageMetadata,
  deleteFromCloudinary,
  CloudinaryResource
} from '../cloudinary';
import { useAuth } from '../contexts/AuthContext';
import './Gallery.css';

interface Photo {
  id: string;
  url: string;
  description: string;
  createdAt: Date;
}

const Gallery: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDescription, setEditDescription] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const resources = await fetchImagesFromCloudinary('gallery');
      const photosData: Photo[] = resources.map((resource: CloudinaryResource) => ({
        id: resource.public_id,
        url: resource.secure_url,
        description: resource.context?.custom?.description || '',
        createdAt: new Date(resource.created_at),
      }));
      setPhotos(photosData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0] || !currentUser) return;

    const file = e.target.files[0];
    setUploading(true);

    try {
      // Upload to Cloudinary with metadata
      await uploadToCloudinary(file, 'gallery', { description: '' });
      await fetchPhotos();
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Failed to upload photo. Please check your Cloudinary configuration.');
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateDescription = async (photoId: string) => {
    if (!currentUser) return;

    try {
      await updateImageMetadata(photoId, { description: editDescription });
      
      setEditingId(null);
      setEditDescription('');
      await fetchPhotos();
    } catch (error) {
      console.error('Error updating description:', error);
      alert('Failed to update description');
    }
  };

  const handleDelete = async (photo: Photo) => {
    if (!currentUser || !window.confirm('Are you sure you want to delete this photo?')) return;

    try {
      const publicId = photo.id;
      await deleteFromCloudinary(publicId);
      await fetchPhotos();
    } catch (error) {
      console.error('Error deleting photo:', error);
      alert('Failed to delete photo');
    }
  };

  const startEdit = (photo: Photo) => {
    setEditingId(photo.id);
    setEditDescription(photo.description);
  };

  if (loading) {
    return <div className="loading">Loading gallery...</div>;
  }

  return (
    <div className="gallery-container">
      <h1>Photography Gallery</h1>
      
      {currentUser && (
        <div className="upload-section">
          <label className="upload-button">
            {uploading ? 'Uploading...' : 'Upload Photo'}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              style={{ display: 'none' }}
            />
          </label>
        </div>
      )}

      <div className="gallery-grid">
        {photos.map((photo) => (
          <div key={photo.id} className="gallery-item">
            <img src={photo.url} alt={photo.description || 'Photo'} />
            
            {editingId === photo.id ? (
              <div className="edit-section">
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Add description..."
                  rows={3}
                />
                <div className="edit-buttons">
                  <button onClick={() => handleUpdateDescription(photo.id)} className="save-btn">
                    Save
                  </button>
                  <button onClick={() => setEditingId(null)} className="cancel-btn">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="photo-info">
                <p className="description">{photo.description || 'No description'}</p>
                {currentUser && (
                  <div className="admin-buttons">
                    <button onClick={() => startEdit(photo)} className="edit-btn">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(photo)} className="delete-btn">
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {photos.length === 0 && (
        <div className="empty-state">
          <p>No photos yet. {currentUser ? 'Upload your first photo!' : ''}</p>
        </div>
      )}
    </div>
  );
};

export default Gallery;

// Made with Bob
