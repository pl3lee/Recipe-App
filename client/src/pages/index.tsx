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

const Home: React.FC<HomeProps> = () => {
  const { user, fetchSavedRecipes, getRecipes, recipes } = useContext(AuthContext)
  
  const userID = user
  

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
    <Typography variant="h2" sx={{textAlign: "center"}}>Recipes</Typography>
    <Stack spacing={5}>{recipes.map((recipe: any) => (
      <Container key={recipe._id}><RecipeCard recipe={recipe}/></Container>
 ))}</Stack>
    </Stack>
      
  )
}

export default Home
