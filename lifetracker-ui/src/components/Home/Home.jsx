import "./Home.css"

export default function Home() {
    const tilesData = [
        { name: "Fitness", image: "https://lifetracker.up.railway.app/assets/athlete-adf95577.jpg" },
        { name: "Food", image: "https://lifetracker.up.railway.app/assets/food-e5a7cc9e.jpg" },
        { name: "Rest", image: "https://lifetracker.up.railway.app/assets/alarm-cff3823f.jpg" },
        { name: "Planner", image: "	https://lifetracker.up.railway.app/assets/calendar-debf6f3b.jpg" },
      ];
    return (
        <div className="home">
            <div className="main">
            <div className="tiles">
                <div>
                <h1>Lifetracker</h1>
                </div>
                <h2>Helping you take back control of your world.</h2>
                <div id="style-line"></div>
            </div>
            <div>
            <img className="main-img" src="https://lifetracker.up.railway.app/assets/tracker-2a96bfd0.jpg" />
            </div>
            </div>
            <div className="footer">
                <ul>
                {tilesData.map((tile, index) => (
                <li key={index}>
                    <h3>{tile.name}</h3>
                    <img className="footer-img" src={tile.image} alt={tile.name} />
                </li>
                ))}
                </ul>
            </div>
        </div>
    )
}