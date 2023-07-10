import AuthTile from "../AuthTile/AuthTile"
import axios from 'axios'
import { useState, useEffect } from 'react'
import "./NutritionPage.css"

export default function NutritionPage({ calories, setCalories, activities, setActivities }) {
  const [nutritionSent, setNutritionSent] = useState(false)
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [quantity, setQuantity] = useState("")
  
  const [error, setError] = useState("")
  const [form, setForm] = useState(false)
  
  const [newCalories, setNewCalories] = useState(0)

  useEffect(() => {
    const storedActivities = localStorage.getItem('activities');
    const parsedActivities = storedActivities ? JSON.parse(storedActivities) : [];
    setActivities(parsedActivities);
  }, [])

  async function recordNutrition(event) {
    event.preventDefault();
    try {
      const totalCals = newCalories * quantity;
      const userData = {
        email: localStorage.getItem('email'),
        name: name,
        category: category,
        calories: totalCals,
        quantity: quantity
      };
      const response = await axios.post('http://localhost:3000/nutrition', userData)
      console.log('Nutrition data sent.')
      console.log(response.data.id)
      const newActivity = {
        id: response.data.id, 
        name: name,
        category: category,
        calories: totalCals,
        quantity: quantity
      }
      const curCalories = parseInt(localStorage.getItem('calories')) + totalCals
      localStorage.setItem('calories', curCalories)
      setActivities(prevActivities => {
        const newActivities = [...prevActivities, newActivity]
        localStorage.setItem('activities', JSON.stringify(newActivities))
        return newActivities
      })
      setCalories(prevCalories => prevCalories + newActivity.calories)
      setNutritionSent(true)
      setNewCalories(0)
      setQuantity(0)
    } catch (error) {
      setError(error.response.data)
      console.error(error)
    }
  }

  const containerStyle = {
    backgroundColor: 'rgb(238, 238, 238)',
    border: '1px solid pink',
    width: '300px',
    height: '60px',
    fontSize: '25px',
    fontFamily: ['Ubuntu', 'sans-serif'],
    borderRadius: '10px',
    cursor: 'pointer'
  };

  return (
    <div className="activities">
      <div>
        <h1>Nutrition</h1>
      </div>
      {!form && (
        <div className="record-btn">
          <button style={containerStyle} className="record-button" onClick={() => setForm(true)}>
            + Record nutrition
          </button>
        </div>
      )}
      {form && !nutritionSent && (
        <div className="registration">
          <form onSubmit={recordNutrition}>
            <h3>Enter each field below</h3>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              placeholder="Name"
            ></input>
            <input
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              required
              placeholder="Category"
            ></input>
            <input
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              required
              type="number"
              placeholder="Quantity"
            ></input>
            <input
              value={newCalories}
              type="number"
              onChange={(event) => setNewCalories(event.target.value)}
              required
              placeholder="Calories"
            ></input>

            <input id="submit-btn" type="submit"></input>
          </form>
        </div>
      )}
      {nutritionSent && (
        <div className="registration">
          <h3>Data sent</h3>
          <button
            id="submit-btn"
            type="submit"
            onClick={() => {
                setNutritionSent(false);
                setForm(false);
            }}
            >
            OK
            </button>
        </div>
      )}
      {activities && activities.length > 0 ? (
  activities.map(activity => (
    <div key={activity.id}>
      <AuthTile
        key={activity.id}
        id={activity.id}
        showDate={true}
        header={`${activity.name}`}
        leftLabel={"Calories"}
        rightLabel={"Quantity"}
        leftValue={activity.calories}
        rightValue={activity.quantity}
      />
    </div>
  ))
) : (
  <p>No activities found.</p>
)}
    </div>
  )
}
