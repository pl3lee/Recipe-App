import RecipeCard from '@/components/RecipeCard';
import { AuthContext } from '@/stores/AuthContext';
import { Container, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';

export interface SavedRecipesProps {
}

const SavedRecipes = (props: SavedRecipesProps) => {
  const { user, getSavedRecipesID, getSavedRecipes, saveRecipe, fetchSavedRecipes, savedRecipes, savedRecipesID, getRecipes, recipes } = useContext(AuthContext)
  
  

  useEffect(() => {
    if (user) {
      fetchSavedRecipes();
    }
  }, [user]);

  useEffect(() => {
    getRecipes();
  }, [])

  
  return (
    <Stack sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
    <Typography variant="h2" sx={{textAlign: "center"}}>Saved Recipes</Typography>
    <Stack spacing={5}>{savedRecipes.map((recipe: any) => (
      <Container key={recipe._id}><RecipeCard recipe={recipe}/></Container>
 ))}</Stack>
    </Stack>
      
  )
}

export default SavedRecipes;
