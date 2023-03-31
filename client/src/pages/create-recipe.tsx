import { Box, Button, Container, FormControl, Input, InputLabel, Stack, TextareaAutosize, Typography } from '@mui/material';
import { title } from 'process';
import * as React from 'react';
import { useState } from 'react';
import { useGetUserID } from '@/hooks/useGetUserID';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';

export interface CreateRecipeProps {
}

export interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string;
  imageURL: string;
  cookingTime: number;
  userOwner: any;
}

const CreateRecipe = (props: CreateRecipeProps) => {
  const router = useRouter();
  const userID = useGetUserID();
  const [recipe, setRecipe] = useState<Recipe>({
    name: '',
    ingredients: [],
    instructions: "",
    imageURL: "",
    cookingTime: 0,
    userOwner: userID,
  });
  const cookie = getCookie('access_token');
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    // this automatically gets the name property from the input, and the value
    const { name, value } = event.target;
    // we are only changing the property that was changed
    setRecipe({...recipe, [name]: value})
  }

  const handleIngredientChange = (event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>, index: number) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({...recipe, ingredients})
  }
  const addIngredient = () => {
    setRecipe({...recipe, ingredients: [...recipe.ingredients, '']})
  }
  const onSubmit = async (event: any) => {
    event.preventDefault();
    const filteredIngredients = recipe.ingredients.filter((ingredient) => ingredient.trim() !== '');
    const newRecipe = { ...recipe, ingredients: filteredIngredients }
    setRecipe(newRecipe)
  
    try {
      console.log(newRecipe)
      const res = await fetch('http://localhost:3001/recipes', {
      method: 'POST',
      headers: { "Content-Type": "application/json",
      "authorization": `${cookie}`},
      body: JSON.stringify(newRecipe),
    });
    alert("recipe created")
    router.push("/");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Container>
    <Typography variant='h2' textAlign="center">Create Recipe</Typography>
    <Stack component="form" autoComplete="off" onSubmit={onSubmit}>
      {/* we put the name property here so we can use it in handleChange */}
      <FormControl variant="standard">
        <InputLabel htmlFor="name">Name</InputLabel>
        <Input id="name" type="text" name="name" required onChange={handleChange}/>
      </FormControl>
      
        <Button onClick={addIngredient}>Add Ingredient</Button>
        {recipe.ingredients.map((ingredient, index) => {
          return (
            <FormControl variant="standard" key={index}>
              <InputLabel htmlFor={`ingredient-${index}`}>{`Ingredient ${index + 1}`}</InputLabel>
          <Input  type="text" name="ingredients" value={ingredient} onChange={(event) => handleIngredientChange(event, index)}/>
          </FormControl>)
        })}
     
      <FormControl variant="standard">
        <InputLabel htmlFor="instructions">Instructions</InputLabel>
        <TextareaAutosize id="instructions" name="instructions" required placeholder='Instructions' onChange={handleChange}/>
      </FormControl>
      <FormControl variant="standard">
        <InputLabel htmlFor="imageURL">Image URL</InputLabel>
        <Input id="imageURL" type="text" name="imageURL" required onChange={handleChange}/>
      </FormControl>
      <FormControl variant="standard">
        <InputLabel htmlFor="cookingTime">Cooking time</InputLabel>
        <Input id="cookingTime" type="number" name="cookingTime" required onChange={handleChange}/>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Stack>
    </Container>
  );
}

export default CreateRecipe