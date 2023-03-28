import Navbar from '@/components/Navbar'
import { Inter } from '@next/font/google'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { Recipe } from './create-recipe'
import { Button, Typography } from '@mui/material'
import { useGetUserID } from '@/hooks/useGetUserID'

const inter = Inter({ subsets: ['latin'] })

interface HomeProps {
  recipes: any;
}

const Home: React.FC<HomeProps> = ({recipes}) => {
  const userID = useGetUserID();
  // console.log(savedRecipes)
  const saveRecipe = async (recipeID: any) => {
    try {
      const res = await fetch('http://localhost:3001/recipes', {
      method: 'PUT',
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({recipeID, userID}),
    });
    alert("recipe saved")
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
    <Typography variant="h1">Recipes</Typography>
    <ul>
    {recipes.map((recipe: any) => (<li key={recipe._id}>
      <div>
        <Typography variant="h2">{recipe.name}</Typography>
      </div>
      <Button onClick={() => saveRecipe(recipe._id)}>Save</Button>
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

export const getServerSideProps: any = async () =>{
  try {
  const res = await fetch('http://localhost:3001/recipes', {
    method: 'GET',
  });
  const recipes = await res.json();
  // const savedRecipesData = await fetch('http://localhost:3001/recipes/savedRecipes/id', {
  //   method: 'GET'
  // });
  // const savedRecipes = await savedRecipesData.json();
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
