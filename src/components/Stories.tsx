import React, { useState, useEffect } from 'react';
import {
  uploadToCloudinary,
  fetchImagesFromCloudinary,
  updateImageMetadata,
  deleteFromCloudinary,
  CloudinaryResource
} from '../cloudinary';
import { useAuth } from '../contexts/AuthContext';
import './Stories.css';

interface Story {
  id: string;
  title: string;
  content: string;
  photoUrl: string;
  createdAt: Date;
}

const Stories: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    photoFile: null as File | null,
  });
  const [uploading, setUploading] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const resources = await fetchImagesFromCloudinary('stories');
      const storiesData: Story[] = resources.map((resource: CloudinaryResource) => ({
        id: resource.public_id,
        title: resource.context?.custom?.title || 'Untitled',
        content: resource.context?.custom?.content || '',
        photoUrl: resource.secure_url,
        createdAt: new Date(resource.created_at),
      }));
      setStories(storiesData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
    } catch (error) {
      console.error('Error fetching stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !formData.photoFile) return;

    setUploading(true);

    try {
      if (editingId) {
        // Update existing story
        if (formData.photoFile) {
          // If new photo uploaded, upload it
          await uploadToCloudinary(formData.photoFile, 'stories', {
            title: formData.title,
            content: formData.content,
          });
          // Delete old image
          await deleteFromCloudinary(editingId);
        } else {
          // Just update metadata
          await updateImageMetadata(editingId, {
            title: formData.title,
            content: formData.content,
          });
        }
      } else {
        // Create new story
        await uploadToCloudinary(formData.photoFile, 'stories', {
          title: formData.title,
          content: formData.content,
        });
      }

      resetForm();
      await fetchStories();
    } catch (error) {
      console.error('Error saving story:', error);
      alert('Failed to save story. Please check your Cloudinary configuration.');
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (story: Story) => {
    setEditingId(story.id);
    setFormData({
      title: story.title,
      content: story.content,
      photoFile: null,
    });
    setShowForm(true);
  };

  const handleDelete = async (story: Story) => {
    if (!currentUser || !window.confirm('Are you sure you want to delete this story?')) return;

    try {
      await deleteFromCloudinary(story.id);
      await fetchStories();
    } catch (error) {
      console.error('Error deleting story:', error);
      alert('Failed to delete story');
    }
  };

  const resetForm = () => {
    setFormData({ title: '', content: '', photoFile: null });
    setShowForm(false);
    setEditingId(null);
  };

  if (loading) {
    return <div className="loading">Loading stories...</div>;
  }

  return (
    <div className="stories-container">
      <h1>Photography Stories</h1>

      {currentUser && (
        <div className="stories-admin">
          {!showForm ? (
            <button onClick={() => setShowForm(true)} className="add-story-btn">
              Add New Story
            </button>
          ) : (
            <div className="story-form">
              <h2>{editingId ? 'Edit Story' : 'Create New Story'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    placeholder="Enter story title"
                  />
                </div>

                <div className="form-group">
                  <label>Story Content</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    required
                    placeholder="Write your story..."
                    rows={8}
                  />
                </div>

                <div className="form-group">
                  <label>Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({ ...formData, photoFile: e.target.files?.[0] || null })}
                    required={!editingId}
                  />
                </div>

                <div className="form-buttons">
                  <button type="submit" disabled={uploading} className="submit-btn">
                    {uploading ? 'Saving...' : editingId ? 'Update Story' : 'Create Story'}
                  </button>
                  <button type="button" onClick={resetForm} className="cancel-btn">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      <div className="stories-list">
        {stories.map((story) => (
          <div key={story.id} className="story-card">
            <div className="story-image">
              <img src={story.photoUrl} alt={story.title} />
            </div>
            <div className="story-content">
              <h2>{story.title}</h2>
              <p className="story-text">{story.content}</p>
              <p className="story-date">
                {story.createdAt.toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              {currentUser && (
                <div className="story-actions">
                  <button onClick={() => handleEdit(story)} className="edit-btn">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(story)} className="delete-btn">
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {stories.length === 0 && (
        <div className="empty-state">
          <p>No stories yet. {currentUser ? 'Create your first story!' : ''}</p>
        </div>
      )}
    </div>
  );
};

export default Stories;

// Made with Bob
