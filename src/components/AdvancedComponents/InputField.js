import "./InputField.css";
import React from "react";

const InputField = ({ type }) => {
    const Title = (type) => {
        if (type === "country") {
            return "Country";
        }
        if (type === "age") {
            return "Age";
        }
        if (type === "weight") {
            return "Weight";
        }
        if (type === "length") {
            return "Length";
        }
        if (type === "status") {
            return "IUCN Status";
        }
        if (type === "gear") {
            return "Fishing Gear";
        }
        return "";
    };

    const Input = (type) => {
        if(type==="country"){
            return (
                <select name="country">
                    <option value="Ireland">Ireland</option>
                    <option value="Iceland">Iceland</option>
                    <option value="Norway">Norway</option>
                </select>
            );
        }
        if (type === "age") {
            return <input type="text" placeholder="Enter age..." />;
        }
        if (type === "weight") {
            return <input type="text" placeholder="Enter weight..." />;
        }
        if (type === "length") {
            return <input type="text" placeholder="Enter length..." />;
        }
        if (type === "status") {
            return (
                <select name="status">
                    <option value="harmless">Harmless</option>
                    <option value="not_evaluated">Not evaluated</option>
                    <option value="near_threatened">Near threatened</option>
                    <option value="vulnerable">vulnerable</option>
                </select>
            );
        }
        if (type === "gear") {
            return (
                <select name="fishingGear">
                    <option value="bottom_trawls">Bottom trawls (nei)</option>
                    <option value="single_boat_bottom_otter_trawls">Single boat bottom otter trawls</option>
                    <option value="gillnets_and_entangling_nets">Gillnets and entangling nets (nei)</option>
                    <option value="twin_bottom_otter_trawls">Twin bottom otter trawls</option>
                    <option value="longlines_nei">Longlines (nei)</option>
                    <option value="danish_seines">Danish seines</option>
                    <option value="midwater_trawls">Midwater trawls (nei)</option>
                    <option value="scottish_seines">Scottish seines</option>
                    <option value="set_gillnets_anchored">Set gillnets (anchored)</option>
                    <option value="bottom_pair_trawls">Bottom pair trawls</option>
                    <option value="trawls">Trawls</option>
                    <option value="vertical_lines">Vertical Lines</option>
                    <option value="handlines_hand_operated">Handlines hand operated</option>
                    <option value="set_longlines">Set longlines</option>
                    <option value="purse_seines">Purse seines</option>
                    <option value="seine_nets">Seine nets (nei)</option>
                    <option value="pots">Pots</option>
                    <option value="mechanized_lines">Mechanized lines</option>
                    <option value="hooks_and_lines">Hooks and lines (nei)</option>
                    <option value="drifting_longlines">Drifting longlines</option>
                    <option value="handlines_and_hand_operated_pole_and_lines">Handlines and hand-operated pole-and-lines</option>
                    <option value="trolling_lines">Trolling lines</option>
                    <option value="cast_nets">Cast nets</option>
                    <option value="gear_nei">Gear (nei)</option>
                    <option value="beach_seines">Beach seines</option>
                    <option value="drift_gillnets">Drift gillnets</option>
                    <option value="harpoons">Harpoons</option>
                    <option value="traps_nei">Traps (nei)</option>
                    <option value="buoy_gear">Buoy gear</option>
                    <option value="pole_lines_hand_operated">Pole-lines hand operated</option>
                    <option value="encircling_gillnets">Encircling gillnets</option>
                </select>
            );
        }
        return null;
    };

    return (
        <div className="general_container">
            <div className="title"> {Title(type)}</div>
            <div className="input"> {Input(type)}</div>
        </div>
    );
};

export default InputField;

