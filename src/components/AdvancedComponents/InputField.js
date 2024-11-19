import "./InputField.css";
const InputField = ({ type, value, onChange }) => {
    // Map type to titles
    const Title = (type) => {
      if (type === "country") return "Country";
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
  
    // Map type to input fields
    const Input = (type) => {
      if (type === "country") {
        return (
          <select name="country" value={value} onChange={onChange}>
            <option value="">-</option>
            <option value="Ireland">Ireland</option>
            <option value="Iceland">Iceland</option>
            <option value="Norway">Norway</option>
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
            <option value="harmless">Harmless</option>
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
            <option value="harmless">Harmless</option>
            <option value="potential pest">Potential Pest</option>
            <option value="ciguatera poisoning">ciguatera poisoning</option>
            <option value="venomous">venomous</option>
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
          </select>
        );
      }
      
      return null;
    };
  
    // Log value and type for debugging purposes
    console.log(`InputField - Type: ${type}, Value: ${value}`);
  
    return (
      <div className="general_container">
        <div className="title"> {Title(type)}</div>
        <div className="input"> {Input(type)}</div>
      </div>
    );
  };
  
  export default InputField; 
