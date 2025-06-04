import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../../redux/features/productSlice';
import { toast } from 'sonner';

const ImageUpload = ({ onImagesChange }) => {
  const [previews, setPreviews] = useState([]);
  const dispatch = useDispatch();
  const { loading: uploading, error: uploadError } = useSelector(state => state.products.uploadStatus);

  const onDrop = useCallback(async (acceptedFiles) => {
    try {
      const uploadedUrls = [];
      
      for (const file of acceptedFiles) {
        // Create preview URL
        const preview = URL.createObjectURL(file);
        
        // Upload to Cloudinary
        const result = await dispatch(uploadImage(file)).unwrap();
        
        if (!result || !result.secure_url) {
          throw new Error('Failed to get image URL from upload response');
        }
        
        uploadedUrls.push({
          url: result.secure_url,
          preview
        });
      }

      setPreviews(prev => [...prev, ...uploadedUrls]);
      onImagesChange(uploadedUrls.map(img => img.url));
      toast.success('Images uploaded successfully');
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error(error.message || 'Failed to upload images');
    }
  }, [dispatch, onImagesChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: true,
    disabled: uploading
  });

  const removeImage = (index) => {
    setPreviews(prev => {
      const newPreviews = [...prev];
      URL.revokeObjectURL(newPreviews[index].preview);
      newPreviews.splice(index, 1);
      onImagesChange(newPreviews.map(img => img.url));
      return newPreviews;
    });
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'}
          ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} disabled={uploading} />
        {uploading ? (
          <p className="text-primary">Uploading images...</p>
        ) : isDragActive ? (
          <p className="text-primary">Drop the images here...</p>
        ) : (
          <div className="space-y-2">
            <p className="text-gray-600">Drag and drop images here, or click to select files</p>
            <p className="text-sm text-gray-500">Supports: JPG, JPEG, PNG, WEBP</p>
          </div>
        )}
      </div>

      {uploadError && (
        <p className="text-red-500 text-sm">{uploadError}</p>
      )}

      {previews.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative group">
              <img
                src={preview.preview}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload; 