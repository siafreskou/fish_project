import "./InputField.css";
const InputField = ({ type, value, onChange }) => {

    const Title = (type) => {
      if (type === "flag_state_name") return "Country";
      if (type === "age") return "Age";
      if (type === "weight") return "Weight";
      if (type === "length") return "Length";
      if (type === "status") return "IUCN Status";
      if (type === "depth") return "Minimum Depth";
      if (type === "depth2") return "Maximum Depth";
      if (type === "threat_to_humans") return "Threat To Humans";
      if (type === "climate_zone") return "Climate Zone";
      if (type === "environment") return "Environment";
      return "";
    };
  
    const Input = (type) => {
      if (type === "flag_state_name") {
        return (
          <select name="country" value={value} onChange={onChange}>
            <option value="">-</option>
            <option value="Ireland">Ireland</option>
            <option value="Iceland">Iceland</option>
            <option value="Norway">Norway</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Canada">Canada</option>
            <option value="Russian Federation">Russian Federation</option>
            <option value="Denmark">Denmark</option>
            <option value="Netherlands">Netherlands</option>
            <option value="France">France</option>
            <option value="Morocco">Morocco</option>
            <option value="Angola">Angola</option>
            <option value="Spain">Spain</option>
            <option value="Taiwan Province of China">Taiwan Province of China</option>
            <option value="Ghana">Ghana</option>
            <option value="Spain">Spain</option>
            <option value="Mauritania">Mauritania</option>
            <option value="Poland">Poland</option>
            <option value="Montenegro">Montenegro</option>
            <option value="Australia">Australia</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Turkey">Turkey</option>
            <option value="United States of America">United States of America</option>
            <option value="Japan">Japan</option>
            <option value="Palau">Palau</option>
            <option value="Korea, Republic of">Korea, Republic of</option>
            <option value="Niue">Niue</option>
            <option value="Papua New Guinea">Papua New Guinea</option>
            <option value="Solomon Islands">Solomon Islands</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Vanuatu">Vanuatu</option>
            <option value="Viet Nam">Viet Nam</option>
            <option value="Saint Vincent/Grenadines">Saint Vincent/Grenadines</option>
            <option value="Liberia">Liberia</option>
            <option value="Togo">Togo</option>
            <option value="Portugal">Portugal</option>
            <option value="Cabo Verde">Cabo Verde</option>
            <option value="Antigua and Barbuda">Antigua and Barbuda</option>
            <option value="Nauru">Nauru</option>
            <option value="Indonesia">Indonesia</option>
            <option value="Chile">Chile</option>
            <option value="Germany">Germany</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Samoa">Samoa</option>
            <option value="Mexico">Mexico</option>
            <option value="Iran (Islamic Rep. of)">Iran (Islamic Rep. of)</option>
            <option value="Seychelles">Seychelles</option>
            <option value="Ecuador">Ecuador</option>
            <option value="Maldives">Maldives</option>
            <option value="Marshall Islands">Marshall Islands</option>
            <option value="Micronesia, Fed.States of">Micronesia, Fed.States of</option>
            <option value="Saint Helena">Saint Helena</option>
            <option value="Philippines">Philippines</option>
            <option value="Costa Rica">Costa Rica</option>
            <option value="Trinidad and Tobago">Trinidad and Tobago</option>
            <option value="El Salvador">El Salvador</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="Venezuela, Boliv Rep of">Venezuela, Boliv Rep of</option>
            <option value="French Guiana">French Guiana</option>
            <option value="Suriname">Suriname</option>
            <option value="Faroe Islands">Faroe Islands</option>
            <option value="Finland">Finland</option>
            <option value="Lithuania">Lithuania</option>
            <option value="Ukraine">Ukraine</option>
            <option value="Uganda">Uganda</option>
            <option value="Oman">Oman</option>
            <option value="Slovenia">Slovenia</option>
            <option value="Italy">Italy</option>
          </select>
        );
      }
      if (type === "age" || type === "weight" || type === "length" || type === "depth"|| type === "depth2" ) {
        return (
          <input
            type="text"
            placeholder={`Enter ${type}...`}
            value={value}
            onChange={onChange}
          />
        );
      }
      if (type === "status") {
        return (
          <select name="status" value={value} onChange={onChange}>
            <option value="">-</option>
            <option value="not_evaluated">Not evaluated</option>
            <option value="near_threatened">Near threatened</option>
            <option value="vulnerable">Vulnerable</option>
            <option value="least concern">least concern</option>
          </select>
        );
      }

      if (type === "threat_to_humans") {
        return (
          <select name="threat_to_humans" value={value} onChange={onChange}>
            <option value="">-</option>
            <option value="harmlesss">harmless</option>
            <option value="potential pest">Potential Pest</option>
            <option value="ciguatera poisoning">ciguatera poisoning</option>
            <option value="venomous">venomous</option>
            <option value="traumatogenic">traumatogenic</option>
          </select>
        );
      }

      if (type === "climate_zone") {
        return (
          <select name="climate_zone" value={value} onChange={onChange}>
            <option value="">-</option>
            <option value="subtropical">subtropical</option>
            <option value="temperat">temperate</option>
            <option value="tropical">tropical</option>
            <option value="deep-water">deep-water</option>
          </select>
        );
      }

      if (type === "environment") {
        return (
          <select name="environment" value={value} onChange={onChange}>
            <option value="">-</option>
            <option value="marine">marine</option>
            <option value="benthopelagic">benthopelagic</option>
            <option value="demersal">demersal</option>
            <option value="oceanodromous">oceanodromous</option>
            <option value="brackish">brackish</option>
            <option value="pelagic-oceanic">pelagic-oceanic</option>
            <option value="bathydemersal">bathydemersal</option>
            <option value="potamodromous">potamodromous</option>
            <option value="freshwater">freshwater</option>
            <option value="bathypelagic">bathypelagic</option>
            <option value="reef-associated">reef-associated</option>
            <option value="pelagic-neritic">pelagic-neritic</option>
          </select>
        );
      }
      
      return null;
    };
  
    console.log(`InputField - Type: ${type}, Value: ${value}`);
  
    return (
      <div className="general_container">
        <div className="title"> {Title(type)}</div>
        <div className="input"> {Input(type)}</div>
      </div>
    );
  };
  
  export default InputField; 
