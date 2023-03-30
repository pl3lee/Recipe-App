import { AuthContext } from '@/stores/AuthContext';
import { Typography } from '@mui/material';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';

export interface SavedRecipesProps {
}

const SavedRecipes = (props: SavedRecipesProps) => {
  const { user, getSavedRecipes } = useContext(AuthContext)
  const [savedRecipes, setSavedRecipes] = useState<any>([]);
  
  const fetchSavedRecipes = async () => {
    const savedRecipesData = await getSavedRecipes();
    setSavedRecipes(savedRecipesData.savedRecipes);
  };

  useEffect(() => {
    if (user) {
      fetchSavedRecipes();
    }
  }, [user]);

  
  return (
    <>
    <Typography variant="h1">Saved Recipes</Typography>
    <ul>
    {savedRecipes.map((recipe: any) => (<li key={recipe._id}>
      <div>
        <Typography variant="h2">{recipe.name}</Typography>
      </div>
      <div>
        <Typography variant="h3">Instructions</Typography>
        <Typography variant='body1'>{recipe.instructions}</Typography>
      </div>
      <div>
        <Typography variant="h3">Image</Typography>
        <img src={recipe.imageURL} alt={recipe.name}/>
      </div>
      <div>
        <Typography variant="h3">Cooking Time (In minutes)</Typography>
        <Typography variant='body1'>{recipe.cookingTime}</Typography>
      </div>
    </li>))}
    </ul>
    </>
      
  )
}

export default SavedRecipes;
