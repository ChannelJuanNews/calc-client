export default (thisRef, event, text) => {

    let tempTab = Object.assign({}, thisRef.state.tab)

    // as of right now, there is ZERO validation
    if (event.target.id === "existing-generator-input"){
        tempTab.data.existingTech.generator.size = text
    }

    else if (event.target.id === "existing-solar-input-zip"){
        tempTab.data.existingTech.solar.location = text
    }
    else if (event.target.id === "existing-solar-input-size"){
        tempTab.data.existingTech.solar.power = text
    }
    else if(event.target.id === "existing-battery-input-power"){
        tempTab.data.existingTech.battery.power = text
    }
    else if(event.target.id === "existing-battery-input-energy"){
        tempTab.data.existingTech.battery.energy = text
    }


}
