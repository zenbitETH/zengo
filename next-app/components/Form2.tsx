import Map from "../components/Map"
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from 'use-places-autocomplete';


  const PlacesAutocomplete = ({
    onAddressSelect,
  }: {
    onAddressSelect?: (address: string) => void;
  }) => {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: { componentRestrictions: { country: 'us' } },
      debounce: 300,
      cache: 86400,
    });
  
    const renderSuggestions = () => {
      return data.map((suggestion) => {
        const {
          place_id,
          structured_formatting: { main_text, secondary_text },
          description,
        } = suggestion;
  
        return (
          <li
            key={place_id}
            onClick={() => {
              setValue(description, false);
              clearSuggestions();
              onAddressSelect && onAddressSelect(description);
            }}
          >
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </li>
        );
      });
    };
  
    return (
      <div >
        <input
          value={value}
          disabled={!ready}
          onChange={(e) => setValue(e.target.value)}
          placeholder="123 Stariway To Heaven"
        />
  
        {status === 'OK' && (
          <ul>{renderSuggestions()}</ul>
        )}
      </div>
    );
  };


export default function Form2 (props: any) {
    const {nextStep} = props;
    
    return(
        <div className='p-3 gap-5 grid font-exo'>
            <div>
                <div className='formLabel'>Ubicación de la propuesta</div>
                <div id="map-parent" className="h-96 bg-gray-300 rounded-med relative grid text-center">
                    <Map/>
                    <input type='text' placeholder='Escribe una dirección para ubicar tu propuesta' 
                      className='placeholder:italic px-6 py-3 text-black w-full mx-auto rounded-med absolute top-0 left-0'/>  
                </div>   
                 
            </div>
            {/*<PlacesAutocomplete
                onAddressSelect={(address) => {
                getGeocode({ address: address }).then((results) => {
                  const { lat, lng } = getLatLng(results[0]);
                
                  setLat(lat);
                  setLng(lng);
                });
              }}
            />
            */}
        </div>
    )
}