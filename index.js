const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

//import function to connect to database
const { initializeDatabase } = require('./db/db.connect')
initializeDatabase()

const Recipe = require('./models/recipe.models')

//writing a function to add a recipe to mongoose Database
async function createRecipe(newRecipe) {
     try {
          const recipe = new Recipe(newRecipe)
          const recipeSave = await recipe.save()
          console.log(recipeSave)
          return recipeSave
     } catch (error) {
          console.log(error)
     }
}

app.post("/recipes", async (req, res) => {
     try {
          const savedRecipe = await createRecipe(req.body)
          if (savedRecipe) {
               res.status(201).json({ message: "Recipe added to Database" })
          } else {
               res.status(400).json({error: "Failed to add recipe"})
          }
          
     } catch (error) {
          res.status(500).json({error: "Failed to add recipe"})
     }
})

//6 writing a function to get all recipes from mongoose Database
async function getRecipes() {
     try {
       const recipes = await Recipe.find()
     //    console.log(recipes)
       return recipes
     } catch (error) {
       console.log(error)
     }
}


app.get("/recipes", async (req, res) => {
     try {
          const recipes = await getRecipes()
           if (recipes) {
             res.json(recipes)
           } else {
             res.status(404).json({ error: "Recipes not found" })
           }
     } catch (error) {
       res.status(500).json({ error: "Failed to get recipes" })
     }
})

//7 get recipes by title
async function getRecipeByTitle(title) {
  try {
    const recipe = await Recipe.findOne({title: title})
//     console.log(recipe)
    return recipe
  } catch (error) {
    console.log(error)
  }
}

app.get("/recipes/:title", async (req, res) => {
  try {
    const recipe = await getRecipeByTitle(req.params.title)
    if (recipe) {
      res.json(recipe)
    } else {
      res.status(404).json({ error: "Recipe not found" })
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get recipes" })
  }
})


//8 get recipes by author
async function getRecipeByAuthor(author) {
  try {
    const recipe = await Recipe.findOne({author: author})
//     console.log(recipe)
    return recipe
  } catch (error) {
    console.log(error)
  }
}

app.get("/recipes/info/:author", async (req, res) => {
  try {
    const recipe = await getRecipeByAuthor(req.params.author)
    if (recipe) {
      res.json(recipe)
    } else {
      res.status(404).json({ error: "Recipe not found" })
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get recipes" })
  }
})



//9 get recipes by difficulty level
async function getRecipeByDifficulty(level) {
  try {
    const recipe = await Recipe.findOne({difficulty: level})
//     console.log(recipe)
    return recipe
  } catch (error) {
    console.log(error)
  }
}

app.get("/recipes/difficulty/:level", async (req, res) => {
  try {
    const recipe = await getRecipeByDifficulty(req.params.level)
    if (recipe) {
      res.json(recipe)
    } else {
      res.status(404).json({ error: "Recipe not found" })
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get recipes" })
  }
})


//10 updates recipe by its id
async function updateRecipeDifficulty(recipeId, dataToUpdate) {
  try {
    const recipe = await Recipe.findByIdAndUpdate(recipeId, dataToUpdate, {new: true})
//     console.log(recipe)
    return recipe
  } catch (error) {
    console.log(error)
  }
}

app.post("/recipes/:recipeId", async (req, res) => {
  try {
    const recipe = await updateRecipeDifficulty(req.params.recipeId, req.body)
    if (recipe) {
         res.status(200).json({
              message: "Recipe updated successfully.",
           updatedRecipe: recipe
      })
    } else {
      res.status(404).json({ error: "Recipe not found" })
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get recipes" })
  }
})


//11 updates recipe by its title
async function updateRecipeData(title, dataToUpdate) {
  try {
    const recipe = await Recipe.findOneAndUpdate({title: title}, dataToUpdate, {new: true})
//     console.log(recipe)
    return recipe
  } catch (error) {
    console.log(error)
  }
}


app.post("/recipes/title/:title", async (req, res) => {
  try {
    const recipe = await updateRecipeData(req.params.title, req.body)
    if (recipe) {
      res.status(200).json({
        message: "Recipe updated successfully.",
        updatedRecipe: recipe,
      })
    } else {
      res.status(404).json({ error: "Recipe not found" })
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get recipes" })
  }
})


//12 Delete a recipe by id
async function deleteRecipe(recipeId) {
  try {
    const recipe = await Recipe.findByIdAndDelete(recipeId)
//     console.log(recipe)
    return recipe
  } catch (error) {
    console.log(error)
  }
}

app.delete("/recipes/:recipeId", async (req, res) => {
  try {
    const recipe = await deleteRecipe(req.params.recipeId)
    if (recipe) {
      res.status(200).json({
        message: "Recipe deleted successfully.",
        deletedRecipe: recipe,
      })
    } else {
      res.status(404).json({ error: "Recipe not found" })
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get recipes" })
  }
})

app.get("/", (req, res) => {
     res.send("Hello! Express Server")
})

const PORT = 3000
app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`)
})

