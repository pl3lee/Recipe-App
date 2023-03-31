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
  const { user, getSavedRecipesID, getSavedRecipes, saveRecipe, fetchSavedRecipes, savedRecipes, savedRecipesID } = useContext(AuthContext)
  
  const userID = user
  

  useEffect(() => {
    if (user) {
      fetchSavedRecipes();
    }
  }, [user]);
  


  return (
    <Stack sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
    <Typography variant="h1" sx={{textAlign: "center"}}>Recipes</Typography>
    <Stack spacing={5}>{recipes.map((recipe: any) => (
      <Container key={recipe._id}><RecipeCard recipe={recipe}/></Container>
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
