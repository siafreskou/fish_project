import "./Text.css";

const Text = ({ info, type }) => {
  const title = (type) => {
    if (type === "environment") {
      return "Environment: ";
    }
    else if(type==="biology"){
        return "Biology:";
    }
    else if(type==="distribution"){
        return "Distribution:";
    }
    else if(type==="climate"){
        return "Climate Zone:";
    }
    else if(type==="threat"){
        return "Threat to humans:";
    }
    else if(type==="distribution_rng"){
      return "Distribution range:";
  }
  };

  const content = (type) => {
    if (type === "environment") {
      return info.environment.join(", ");
    }
    else if(type==="biology"){
        return info.biology;
    }
    else if(type==="distribution"){
        return info.distribution;
    }
    else if(type==="climate"){
        return info.climate_zone;
    }
    else if(type==="threat"){
        return info.threat_to_humans || "No threat information";
    }
    else if(type==="distribution_rng"){
      return info.dimensions?.distribution_range;
  }
  };

 
  return (
    <div className="txt_container">
      <div className="title">
      <div >{title(type)}</div>
      </div>

      <div className="txt">
      <div >{content(type)}</div>
      </div>
    </div>
  );
};

export default Text;
