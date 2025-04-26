import React from 'react';
import { Clock, Trash2, RefreshCw, Loader2, AlertCircle } from 'lucide-react';
import { Image } from '../types';

interface RecipeCardProps {
  image: Image;
  onRemove: (id: string) => void;
  onRetry: (id: string) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ image, onRemove, onRetry }) => {
  const renderErrorContent = () => {
    if (image.errorType === 'invalid_image') {
      return (
        <div className="text-center p-8">
          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-4" />
          <p className="text-red-400 mb-4">Invalid image format. Please use a valid food image.</p>
          <button
            onClick={() => onRetry(image.id)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-md transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      );
    }

    if (image.errorType === 'rate_limit' && image.errorDetails?.countdown) {
      const total_seconds = Number(image.errorDetails.countdown);

      const hours = Math.floor(total_seconds/3600);
      const minutes = Math.floor((total_seconds % 3600) / 60);
      const seconds = total_seconds % 60;

      return (
        <div className="text-center p-8">
          <AlertCircle className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-yellow-400 mb-2">API Keys Exhausted</h3>
          <p className="text-gray-300 mb-2">All available API keys have been used. Please wait until the next reset.</p>
          <p className="text-cyan-400">
            Time remaining: {hours}h {minutes}m {seconds}s
          </p>
        </div>
      );
    }

    if (image.errorType === 'server_unavailable') {
      return (
        <div className="text-center p-8">
          <AlertCircle className="w-8 h-8 text-orange-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-orange-400 mb-2">Server Unavailable</h3>
          <p className="text-gray-300 mb-4">We couldn't connect to the backend server</p>
          <button
            onClick={() => onRetry(image.id)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-md transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>
      );
    }

    return (
      <div className="text-center p-8">
        <p className="text-red-400 mb-4">Failed to analyze recipe</p>
        <button
          onClick={() => onRetry(image.id)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-md transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Retry Analysis
        </button>
      </div>
    );
  };

  return (
    <div className="bg-gray-900/90 rounded-lg overflow-hidden border border-cyan-500 shadow-lg shadow-cyan-500/20 cyber-border">
      <div className="aspect-video relative">
        <img
          src={image.image_url}
          alt={image.prompt}
          className="w-full h-full object-cover object-center"
        />
        <button
          onClick={() => onRemove(image.id)}
          className="absolute top-2 right-2 p-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
          title="Remove image"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <div className="p-6">
        <p className="text-cyan-300 text-sm mb-2">{new Date(image.created_at).toLocaleDateString()}</p>
        <p className="text-white mb-4">{image.prompt}</p>

        {image.status === 'loading' && (
          <div className="flex items-center justify-center p-8">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
              <p className="text-cyan-400">Analyzing recipe...</p>
            </div>
          </div>
        )}

        {image.status === 'error' && renderErrorContent()}

        {image.status === 'success' && image.recipe && (
          <div className="mt-6 space-y-4">
            <h3 className="text-xl font-bold text-cyan-400 cyber-glow">{image.recipe.title}</h3>
            <p className="text-gray-300">{image.recipe.description}</p>

            <div className="flex items-center gap-2 text-cyan-300">
              <Clock className="w-4 h-4" />
              <span>{image.recipe.estimated_time}</span>
            </div>

            <div className="mt-4 flex gap-8">

              <div className="w-1/2">
                <h4 className="text-lg font-semibold text-cyan-400 mb-2">Ingredients</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  {image.recipe.ingredients.map((ingredient, idx) => (
                    <li key={idx}>
                      {ingredient.name} - {ingredient.quantity}
                    </li>
                  ))}
                </ul>
              </div>


              <div className="w-1/2">
                <h4 className="text-lg font-semibold text-cyan-400 mb-2">Additional Ingredients</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  {image.recipe.ingredients_additional.map((ingredient, idx) => (
                    <li key={idx}>
                      {ingredient.name} - {ingredient.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-lg font-semibold text-cyan-400 mb-2">Instructions</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-300">
                {image.recipe.recipe.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="mt-4">
              <h4 className="text-lg font-semibold text-cyan-400 mb-2">Nutrition Facts</h4>
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-cyan-300">Per Serving</h5>
                    <ul className="space-y-1 text-gray-300">
                      {image.recipe.nutritions.map((item, idx) => (
                        <li key={idx} className="flex justify-between">
                          <span>{item.name}</span>
                          <span>{item.nutrition.calories} cal</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-cyan-300">Total</h5>
                    <ul className="space-y-1 text-gray-300">
                      <li className="flex justify-between">
                        <span>Calories</span>
                        <span>{image.recipe.total_nutritions.calories}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Carbs</span>
                        <span>{image.recipe.total_nutritions.carbs}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Fat</span>
                        <span>{image.recipe.total_nutritions.fat}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Protein</span>
                        <span>{image.recipe.total_nutritions.protein}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};