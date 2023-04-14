import React, { useState, useEffect } from 'react'
import { ListGroup, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export const PeopleData = () => {
    const navigate = useNavigate();
    let people = require('./data/people.json');
    let planets = require('./data/planets.json');
    let films = require('./data/films.json');
    let allFilms = Object.values(films);
    let allPlanets = Object.values(planets);
    const [selectedItem, setSelectedItem] = useState();
    const [selectedPlanet, setSelectedPlanet] = useState(allPlanets[0]);
    const [selectedFilm, setSelectedFilm] = useState(allFilms[0]);
    const [isVisible, setIsVisible] = useState(false);
    const [isPlanetVisible, setIsPlanetVisible] = useState(false);
    const [isFilmVisible, setIsFilmVisible] = useState(false);

    useEffect(() => {
        //displayPlanetData();
    }, []);

    const displayItem = (url) => {
        if (url.indexOf(' ') > 0)
            url = url.replace(/ /g, "-")
        navigate(url);
    }

    const getUrl = (item) => {
        setIsVisible(true);
        setSelectedItem(item);
        return `/people/${item.name}`;
    }

    const displayPlanetData = (url) => {
        for (var i = 0; i < allPlanets.length; i++) {
            if (allPlanets[i].url === url) {
                setSelectedPlanet(allPlanets[i]);
                console.info("selectedPlanet", selectedPlanet);
                setIsPlanetVisible(true);
                break;
            }
        }
    }

    const displayFilmData = (url) => {
        console.log("Selected film url", url);
        for (var i = 0; i < allFilms.length; i++) {
            if (allFilms[i].url === url) {
                setSelectedFilm(allFilms[i]);
                console.info("selected Film", selectedFilm);
                setIsFilmVisible(true);
                break;
            }
        }
    }

    return (
        <>
            <div className='container mt-5'>
                <Row>
                    <Col md={3}>
                        <h5>Star Wars</h5>
                        <ListGroup style={{ height: '570px', width: '250px', overflowY: 'auto' }}>
                            {Object.values(people).map((item) => (
                                <ListGroup.Item key={item.url} onClick={() => displayItem(getUrl(item))}
                                    style={{ cursor: 'pointer' }}
                                >{item.name} </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        {isVisible &&
                            (
                                <div>
                                    <h5> People </h5>
                                    <h4>{selectedItem.name}</h4> <br />
                                    <p> <strong>Height</strong> {selectedItem.height} </p>
                                    <p> <strong>Mass</strong> {selectedItem.mass} </p>
                                    <p> <strong>Hair Color</strong> {selectedItem.hair_color} </p>
                                    <p> <strong>Skin Color</strong> {selectedItem.skin_color} </p>
                                    <p> <strong>Eye Color</strong> {selectedItem.eye_color} </p>
                                    <p> <strong>Birth Year</strong> {selectedItem.birth_year} </p>
                                    <p> <strong>Gender</strong> {selectedItem.gender} </p>
                                      
                                    <Row>
                                        <Col md={4}>
                                            <strong>Homeworld</strong>
                                        </Col>
                                        <Col>
                                        <p onClick={() => displayPlanetData(selectedItem.homeworld)} style={{ cursor: 'pointer', color:'blue' }}> {selectedItem.homeworld} </p>
                                        </Col>
                                    </Row>
                                    <p> <strong>Films</strong> </p>
                                    <ul>
                                        {
                                            selectedItem.films.map(ele => {
                                                return <li key={ele} onClick={() => displayFilmData(ele)} style={{ cursor: 'pointer', color:'blue' }}> {ele} </li>
                                            })
                                        }
                                    </ul>
                                </div>
                            )
                        }
                    </Col>
                    <Col md={3}>
                        {
                            isPlanetVisible && (<div>
                                <h5> Planets </h5>
                                <h4>{selectedPlanet.name}</h4> <br />
                                <p> <strong>Population</strong> {selectedPlanet.population} </p>
                                <p> <strong>Climate</strong> {selectedPlanet.climate} </p>
                                <p> <strong>Rotation Period</strong> {selectedPlanet.rotation_period} </p>
                                <p> <strong>Orbital Period</strong> {selectedPlanet.orbital_period} </p>
                                <p> <strong>Diameter</strong> {selectedPlanet.diameter} </p>
                            </div>)
                        }
                    </Col>
                    <Col md={3}>
                        {
                            isFilmVisible && (
                                <div>
                                    <h5> Films </h5>
                                    <h4>{selectedFilm.title}</h4> <br />
                                    <p> <strong>Director</strong> {selectedFilm.director} </p>
                                    <p> <strong>Producer</strong> {selectedFilm.producer} </p>
                                    <p> <strong>Release Date</strong> {selectedFilm.release_date} </p>
                                    <p> <strong>Episode</strong> {selectedFilm.episode_id} </p>
                                </div>
                            )
                        }
                    </Col>
                </Row>
            </div>
        </>
    )
}
