
import "./Tag.css";

const Tag = ({ info, type }) => {
  const title = (type) => {
    if (type === "max_age") {
      return "Max Age";
    }
    else if(type==="max_depth"){
      return "Max Depth";
    }
    else if(type==="max_length"){
      return "Max Length";
    }
    else if(type==="max_weight"){
      return "Max Weight";
    }
    else if(type==="average_length"){
      return "Average Length";
    }
    else if(type==="status"){
      return "IUCN Status";
    }
  };

  const content = (type) => {
    if (type === "max_age") {
      return info.dimensions.max_age|| "-";
    }
    else if(type==="max_depth"){
      return info.dimensions.max_depth|| "-";
    }
    else if(type==="max_length"){
      return info.dimensions.max_length|| "-";
    }
    else if(type==="max_weight"){
      return info.dimensions.max_weight|| "-";
    }
    else if(type==="average_length"){
      return info.dimensions.average_length|| "-";
    }
    else if(type==="status"){
      return info.iucn_status|| "-";
    }
  };

  const icon = (type) => {
    if(type === "max_age"){
      return <img src="https://static.vecteezy.com/system/resources/thumbnails/007/126/419/small/fish-seafood-icon-free-vector.jpg" className="icon" />
    }
    else if(type === "max_depth"){
      return <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpR7i-DQppk5vIYQHtNGeFsbIm8EatQDQUQg&s" className="icon" />
    }
    else if(type === "max_length"){
      return <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5OLrqxI-Pov7sw4Z9Vw3H4OZy6xRk1Y6JjA&s" className="icon" />
    }
    else if(type === "max_weight"){
      return <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-GICX2AmVKiutOg40T2Q0FAATFWtBcJuD_r1WQVQg0MzCLKY5WY-ccs6-kGt_ICX5He8&usqp=CAU" className="icon" />
    }
    else if(type === "average_length"){
      return <img src="https://www.shutterstock.com/image-vector/average-icon-middle-midpoint-symbol-600nw-2274000095.jpg" className="icon" />
    }
    else if(type === "status"){
      return <img src="https://www.shutterstock.com/image-vector/threatened-fish-icon-marine-species-260nw-436736530.jpg" className="icon" />
    }
  };

  const measurement = (type) => {
    if (type === "max_age") {
      return "years";
    }
    else if(type==="max_depth"){
      return "m";
    }
    else if(type==="max_length"){
      return "cm";
    }
    else if(type==="max_weight"){
      return "kg";
    }
    else if(type==="average_length"){
      return "cm";
    }
  };

  
  return (
    <div className="tag_container">
      <div className="photo">
        <div >{icon(type)}</div>
      </div>
      <div className="content_container">
        <div className="title_1">{title(type)}</div>

        <div className="title_2">{content(type)} {content(type) !== "-" && measurement(type)}</div>
      </div>
    </div>
  );
};

export default Tag;