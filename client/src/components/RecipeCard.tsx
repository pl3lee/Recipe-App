import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useContext } from "react";
import { AuthContext } from "@/stores/AuthContext";
import { Recipe } from "@/interfaces/RecipeInterface";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface RecipeCardProps {
  recipe: Recipe;
}
export default function RecipeCard(props: RecipeCardProps) {
  const [expanded, setExpanded] = React.useState(false);
  const { user, savedRecipes, savedRecipesID, saveRecipe } =
    useContext(AuthContext);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: "60vw" }}>
      <CardHeader title={props.recipe.name} sx={{ textAlign: "center" }} />
      <CardMedia
        component="img"
        height="250"
        image={props.recipe.imageURL}
        alt={props.recipe.name}
      />
      <CardContent>
        <Typography variant="h5">Cooking Time:</Typography>
        <Typography paragraph> {props.recipe.cookingTime} minutes</Typography>
        <Typography paragraph>Ingredients:</Typography>
        <ul>
          {props.recipe.ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient[0].toUpperCase() + ingredient.slice(1)}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardActions disableSpacing>
        {user && (
          <IconButton
            color={
              savedRecipesID.includes(props.recipe._id) ? "error" : "default"
            }
            onClick={() => saveRecipe(props.recipe._id)}
          >
            <FavoriteIcon />
          </IconButton>
        )}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="h6">Instructions:</Typography>
          <Typography paragraph>{props.recipe.instructions}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
