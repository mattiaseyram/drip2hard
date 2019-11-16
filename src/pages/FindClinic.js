import React, { useState, useContext, useEffect } from 'react';
import { Link } from '@reach/router';
import { FirestoreContext } from '../utils/context';
import { mapGLToken } from '../utils/keys';
import ReactMapGL, { Marker } from 'react-map-gl';
import Box from 'react-bulma-components/lib/components/box';
import Section from 'react-bulma-components/lib/components/section';
import Columns from 'react-bulma-components/lib/components/columns';
import Level from 'react-bulma-components/lib/components/level';
import { Field } from 'react-bulma-components/lib/components/form';
import Heading from 'react-bulma-components/lib/components/heading';
import Button from 'react-bulma-components/lib/components/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const initialViewport = {
    height: "80vh",
    width: "100%",
    latitude: 0,
    longitude: 0,
    zoom: 12
};

const clinicItem = (clinic, key) => (
    <Section key={key}>
        <Box>
            <Level>
                <Level.Side align="left">
                    <Level.Item>
                        <Heading size={5} subtitle>{clinic.name}</Heading>
                    </Level.Item>
                </Level.Side>
                <Level.Side align="right" className="is-fullwidth">
                    <Field kind="addons">
                        <Button renderAs={Link} to={`/clinics/${clinic.id}/create_visit`}>Book Visit</Button>
                    </Field>
                </Level.Side>
            </Level>
        </Box>
    </Section>
);

export default function FindClinic() {
    const { user, clinics } = useContext(FirestoreContext);
    const clinicsArr = clinics ? Object.values(clinics) : [];

    const [viewport, setViewport] = useState(initialViewport);
    const [currentCoords, setCurrentCoords] = useState({ latitude: 0, longitude: 0 });

    useEffect(() => {
        return navigator.geolocation.getCurrentPosition(pos => {
            const coords = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
            setCurrentCoords(coords);
            setViewport(viewport => ({ ...viewport, ...coords }));
        });
    }, []);

    const clinicItems = clinicsArr.map((clinic, i) => clinicItem(clinic, i));

    const clinicMarkers = clinicsArr.map((clinic, i) => {
        const latitude = parseFloat(clinic.latitude) || 0;
        const longitude = parseFloat(clinic.longitude) || 0;

        return (
            <Marker key={i} latitude={latitude} longitude={longitude}>
                <Box>{clinic.name}<br />{clinic.address}</Box>
            </Marker>
        );
    });

    const userMarker = (
        <Marker latitude={currentCoords.latitude} longitude={currentCoords.longitude}>
            <Box><FontAwesomeIcon icon={faUser} /></Box>
        </Marker>
    );

    if (!user) return (<p>You are not signed in!</p>)

    return (
        <div className="Page">
            <Columns>
                <Columns.Column size="half">
                    {clinicItems}
                </Columns.Column>
                <Columns.Column size="half">
                    <ReactMapGL
                        {...viewport}
                        onViewportChange={viewport => setViewport(viewport)}
                        mapboxApiAccessToken={mapGLToken}>
                        {clinicMarkers}
                        {userMarker}
                    </ReactMapGL>
                </Columns.Column>
            </Columns>
        </div>
    );
}