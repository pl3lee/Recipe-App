import { Inter } from '@next/font/google'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { Recipe } from './create-recipe'
import { Button, Typography } from '@mui/material'
import { useGetUserID } from '@/hooks/useGetUserID'
import { useContext } from 'react'
import { getCookie } from 'cookies-next'
import { AuthContext } from '@/stores/AuthContext'
import RecipeCard from '@/components/RecipeCard'
import { Container, Stack } from '@mui/system'

const inter = Inter({ subsets: ['latin'] })

interface HomeProps {
  recipes?: any;
}

const Home: React.FC<HomeProps> = ({recipes}) => {
  const { user, getSavedRecipesID } = useContext(AuthContext)
  const [savedRecipes, setSavedRecipes] = useState<any>([]);
  const userID = user
  const cookie = getCookie('access_token');
  
  const saveRecipe = async (recipeID: any) => {
    try {
      const res = await fetch('http://localhost:3001/recipes', {
      method: 'PUT',
      headers: { "Content-Type": "application/json",
                "authorization": `${cookie}`},
      body: JSON.stringify({recipeID, userID}),
    });
    // just to make the page rerender
    setSavedRecipes((prev) => [...prev, recipeID] )
    } catch (err) {
      console.log(err);
    }
  }
  const fetchSavedRecipes = async () => {
    const savedRecipesData = await getSavedRecipesID();
    setSavedRecipes(savedRecipesData.savedRecipes);
  };

  useEffect(() => {
    if (user) {
      fetchSavedRecipes();
    }
  }, [user]);
  


  return (
    <Stack sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
    <Typography variant="h1" sx={{textAlign: "center"}}>Recipes</Typography>
    <Stack spacing={5}>{recipes.map((recipe: any) => (
      <Container key={recipe._id}><RecipeCard recipe={recipe} saveRecipe={saveRecipe} savedRecipes={savedRecipes} user={user}/></Container>
 ))}</Stack>
    </Stack>
      
  )
}

export const getServerSideProps: any = async () =>{
  try {
  const res = await fetch('http://localhost:3001/recipes', {
    method: 'GET',
  });
  const recipes = await res.json();
  if (recipes) {
    return {
      props: { recipes },
    }
  }
  } catch (err) {
    console.log(err);
    return {
      props: {recipes: []},
    }
  }
}

export default Home
