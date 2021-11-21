import React, {useState, useEffect} from "react";
import './App.css';
import axios from 'axios';
import Recipe from './Recipe';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    margin: '10px auto',

    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
 
}));


function App() {
    const classes = useStyles();
  const APP_ID = "d2deb56c";
  const APP_KEY = "cb664b2799819104360ad614a798bdd4";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');

  const [query, setQuery] = useState('chicken');

  useEffect(() =>{
    getRecipe();
  }, [query]);


  const getRecipe = async () => { 
    const response =  await axios.get(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    setRecipes(response.data.hits);
    console.log(response.data.hits);
    };

const updateSearch = (e) => {
  setSearch(e.target.value);

};

const updateQuery = (e) => {
  e.preventDefault();
  setQuery(search);
  setSearch("");
}
return (
    <div>
    <Paper
     onSubmit={updateQuery} component="form" className={classes.root}>
     
      <InputBase
        type='text'
        value={search} 
        onChange={updateSearch}
        className={classes.input}
        placeholder="Search For Recipes"
        inputProps={{ 'aria-label': 'search for recipes' }}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      
    </Paper>
    
      {/* <form onSubmit={updateQuery}>
        <input type='text' value={search} onChange={updateSearch}/>
          <button type="submit">Search</button>
      </form> */}
      <div>
      <Grid container>
      {recipes.map((recipe) => (
        <Grid conainer item={3} xs={6} md={4} lg={3} >
        <Recipe 
        key = {recipe.recipe.label}
        title = {recipe.recipe.label}
        calories = {recipe.recipe.calories}
        image = {recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
      />
      </Grid>
      ))}

    </Grid>

       <Recipe/>
       </div>
    </div>
  );
}

export default App;
