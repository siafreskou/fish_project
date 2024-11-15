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
