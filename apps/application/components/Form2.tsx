import Map from "./Map";
import Autocomplete from "react-google-autocomplete";
import { useNewProposalState } from "@/contexts/NewProposalContext";

export default function Form2() {
  const { location, setLocation } = useNewProposalState();

  const handlePlaceSelected = (place: google.maps.places.PlaceResult) => {
    if (place.geometry?.location) {
      const updatedLocationCoords = {
        locationText: place.formatted_address!,
        gMapsLocationObject: place.geometry?.location.toJSON(),
      };
      setLocation(updatedLocationCoords);
    }
  };

  return (
    <div className="p-3 gap-5 grid font-exo">
      <div>
        <div className="formLabel">Ubicación de la propuesta</div>
        <Autocomplete
          style={{
            height: "40px",
            width: "90%",
            borderRadius: "12px",
            marginBottom: "10px",
          }}
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}
          // onPlaceSelected={(place) => {
          //   console.log("Autocomplete onPlaceSelected ", { place });
          //   setSearchLocation(place.geometry?.location);
          //   const updatedLocationCoords = {
          //     ...location,
          //     lat: place.geometry?.location?.lat()!,
          //     lng: place.geometry?.location?.lng()!,
          //   };
          //   setLocation(updatedLocationCoords);
          // }} // Removing js code from jsx
          onPlaceSelected={handlePlaceSelected}
          inputAutocompleteValue={location.locationText}
          defaultValue={location.locationText}
          options={{
            types: ["address"],
          }}
        />
        <div
          id="map-parent"
          className="h-96 bg-gray-300 rounded-med relative grid text-center"
        >
          <Map />
        </div>
      </div>
    </div>
  );
}
