import React, { useRef, useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { CUISINE_TYPES, MEAL_TYPE, ALLERGENS, DIETARY_PREFENCES, ALLOWED_FILE_TYPES } from '../constants';
import toast from 'react-hot-toast';
import ReCapcha from "react-google-recaptcha";

interface ImageUploadFormProps {
  loading: boolean;
  imageUrl: string;
  cuisine_type: string;
  meal_type: string;
  allergens: string[];
  dietary: string;
  onCuisineChange: (value: string) => void;
  onMealChange: (value: string) => void;
  onAllergensChange: (value: string[]) => void;
  onDietaryChange: (value: string) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent, captchaToken: string | null) => void;
}
export const ImageUploadForm: React.FC<ImageUploadFormProps> = ({
  loading,
  imageUrl,
  cuisine_type,
  meal_type,
  allergens,
  dietary,
  onCuisineChange,
  onMealChange,
  onAllergensChange,
  onDietaryChange,
  onFileChange,
  onSubmit
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  
  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken) {
      toast.error('Please complete the reCAPTCHA first.');
      return;
    }

    onSubmit(e, captchaToken);
  };

  return (
    <form onSubmit={onSubmit} className="max-w-2xl mx-auto mb-12 bg-gray-900/90 p-6 rounded-lg border border-cyan-500 shadow-lg shadow-cyan-500/20 cyber-border">
      <div className="mb-6">
        <div className="mb-4">
          <label className="block text-cyan-400 mb-2">Upload Image</label>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/png,image/jpeg,image/webp"
            onChange={onFileChange}
            className="w-full bg-gray-800 border border-cyan-500 rounded p-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-cyan-600 file:text-white hover:file:bg-cyan-700 file:cursor-pointer"
            required
          />
          <p className="mt-2 text-sm text-cyan-300">Maximum file size: 5MB. Supported formats: PNG, JPG, WEBP</p>
        </div>
        {imageUrl && (
          <div className="mb-4 relative aspect-video">
            <img
              src={imageUrl}
              alt="Preview"
              className="w-full h-full object-contain rounded-md border border-cyan-500"
            />
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-cyan-400 mb-2">Select Dietary Preferance</label>
        <select
          value={dietary}
          onChange={(e) => onDietaryChange(e.target.value)}
          className="w-full bg-gray-800 border border-cyan-500 rounded p-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        >
          {DIETARY_PREFENCES.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-cyan-400 mb-2">Select Type of Meal</label>
        <select
          value={meal_type}
          onChange={(e) => onMealChange(e.target.value)}
          className="w-full bg-gray-800 border border-cyan-500 rounded p-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        >
          {MEAL_TYPE.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-cyan-400 mb-2">Select Allergens</label>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-2 text-white">
          {ALLERGENS.map((option, index) => (
            <label key={index} className="break-inside-avoid flex items-center space-x-2">
              <input
                type="checkbox"
                value={option}
                checked={allergens.includes(option)}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  const value = option;
                  let updatedAllergens = [...allergens];

                  if (isChecked) {
                    updatedAllergens.push(value);
                  } else {
                    updatedAllergens = updatedAllergens.filter((item) => item !== value);
                  }

                  onAllergensChange(updatedAllergens);
                }}
                className="accent-cyan-500"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-cyan-400 mb-2">Select Type of Cuisine</label>
        <select
          value={cuisine_type}
          onChange={(e) => onCuisineChange(e.target.value)}
          className="w-full bg-gray-800 border border-cyan-500 rounded p-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        >
          {CUISINE_TYPES.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className='flex justify-center py-4'>
      <ReCapcha 
        ref={recaptchaRef}
        sitekey="6LdKGyIrAAAAALaJkot260SP8d1dNa7agre57NIu"
        onChange={handleCaptchaChange}
        />
      </div>
      <button
        type="submit"
        disabled={loading || !imageUrl || !dietary || !meal_type || !allergens || !cuisine_type || !captchaToken}
        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cyber-glow"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
        {loading ? 'Analyzing...' : 'Post Image'}
      </button>
    </form>
  );
};