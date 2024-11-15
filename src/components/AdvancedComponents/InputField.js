const InputField = ({ type, value, onChange }) => {
    // Map type to titles
    const Title = (type) => {
      if (type === "country") return "Country";
      if (type === "age") return "Age";
      if (type === "weight") return "Weight";
      if (type === "length") return "Length";
      if (type === "status") return "IUCN Status";
      if (type === "gear") return "Fishing Gear";
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
      if (type === "age" || type === "weight" || type === "length") {
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
          </select>
        );
      }
      if (type === "gear") {
        return (
          <select name="fishingGear" value={value} onChange={onChange}>
            <option value="">-</option>
            <option value="bottom_trawls">Bottom trawls (nei)</option>
            <option value="single_boat_bottom_otter_trawls">Single boat bottom otter trawls</option>
            {/* Add all the other gear options here */}
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
