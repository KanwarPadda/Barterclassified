import React from 'react';
import {useField} from "formik";
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from "react-places-autocomplete";
import {FormField, Label, List, Segment} from "semantic-ui-react";


const PlaceInput = ({label, options, ...props}) => {

    const [field, meta, helpers] = useField(props);



    //region ***handleSelect(address) ---> sets addres for the field of the form.***
    const handleSelect = address => {
        geocodeByAddress(address) // passed to googleMaps geocoder returns a promoise
            .then(results => getLatLng(results[0])) // returns latitude and altitude of the passed location comes as [0]
            .then(latLng => helpers.setValue({
                address,
                latLng
            })) // setvalue based on adress selected or lat and longrirude
            .catch(error => helpers.setError(error));
    };
    //endregion


    //region ***handleBlur=(e)*** event handler when a user leaves the field
    const handleBlur = (e) => {
        field.onBlur(e)
        if (!field.value.latLng) {
            helpers.setValue({address: '', latLng: ''})
        }
    }


    //endregion

    return (

        <PlacesAutocomplete
            value={field.value['address']} // address  helpers.setValue({address, latLng})) its coming from here.
            onChange={value => helpers.setValue({address: value})} // set the value based on what user chooses.
            onSelect={value => handleSelect(value)} //select the value passed
            searchOptions={options} // options coming from optins.
        >
            {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (



                <FormField error={meta.touched && !!meta.error}>
                    <label>{label}</label>
                    <input {...getInputProps({name: field.name, onBlur: e => handleBlur(e), ...props})}
                    />

                    {meta.touched && meta.error ? (<Label basic color={'red'}>{meta.error['address']}</Label>) : null}

                    {suggestions?.length > 0 && (
                        <Segment loading={loading}
                                 style={{marginTop: 0, position: 'absolute', zIndex: 1000, width: '100%'}}>
                            <List selection>
                                {suggestions.map(suggestion => (
                                    <List.Item key={suggestion.placeId} {...getSuggestionItemProps(suggestion)}

                                    >

                                        <List.Header>
                                            {suggestion.formattedSuggestion.mainText}

                                        </List.Header>
                                        <List.Description>
                                            {suggestion.formattedSuggestion.secondaryText}



                                        </List.Description>
                                    </List.Item>
                                ))}

                            </List>
                        </Segment>
                    )}

                </FormField>
            )}

        </PlacesAutocomplete>

    )

};

export default PlaceInput;