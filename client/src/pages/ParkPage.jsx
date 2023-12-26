import React, { useState } from "react";
import api from "../../utils/api.utils";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";

const ParkPage = () => {
    const [location, setLocation] = useState('');
    const [dogParks, setDogParks] = useState([]);

    const searchDogParks = async () => {
        try {
            const response = await api.get(`/api/dogparks?location=${location}`);
            setDogParks(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <input 
                type="text" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
                placeholder="Enter location"
            />
            <button onClick={searchDogParks}>Search Dog Parks</button>

            <div>
                {dogParks.map((park, index) => (
                    <Card key={index} style={{ width: '18rem', marginBottom: '1rem' }}>
                        <Card.Body>
                            <Card.Title>{park.name}</Card.Title>
                            <Card.Text>
                                {park.address}
                            </Card.Text>
                            <Card.Text>
                                {park.description}
                            </Card.Text>
                            <Button variant="primary">Visit Park</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ParkPage;
