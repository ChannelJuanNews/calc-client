export default (thisRef, event, text, tempTab, peak) => {
  console.log(thisRef)

  if (peak === 'onPeak') {
    onPeak(thisRef, event, text, tempTab)
  }
  else if(peak === 'offPeak'){
    offPeak(thisRef, event, text, tempTab)
  }
  else if(peak === 'midPeak'){
    midPeak(thisRef, event, text, tempTab)
  }

}


function onPeak(thisRef, event, text, tempTab){

  // this means there was a deletion
  if (tempTab.data.peakData.onPeakPrice > text.length){

  }

}

function offPeak(){

}

function midPeak () {

}



/*

console.log('we are gereeee')

if (tempTab.data.peakData.onPeakPrice.length > text.length){
  // delete was pressed

  if(tempTab.data.peakData.onPeakPrice.indexOf('.') !== -1){
    // there is a decimal point, so we treat this differently then normal

    // if they are both zeros, then just get rid of the decimals
    if (tempTab.data.peakData.onPeakPrice[tempTab.data.peakData.onPeakPrice - 2] === "0" && tempTab.data.peakData.onPeakPrice[tempTab.data.peakData.onPeakPrice - 1] === "0"){
      console.log('wtf is going onn')
      tempTab.data.peakData.onPeakPrice = tempTab.data.peakData.onPeakPrice.slice(0, -3)
      return this.setState({
        tab : tempTab
      })
    }

    // if the tens place is a zero and the hundreds place is non zero, then make them both zeros
    if (tempTab.data.peakData.onPeakPrice[tempTab.data.peakData.onPeakPrice - 2] === "0" && tempTab.data.peakData.onPeakPrice[tempTab.data.peakData.onPeakPrice - 1] !== "0" ){
        tempTab.data.peakData.onPeakPrice = tempTab.data.peakData.onPeakPrice.slice(0, -1)
        tempTab.data.peakData.onPeakPrice = tempTab.data.peakData.onPeakPrice + "0";
        return this.setState({
          tab : tempTab
        })
    }


    let charToBeShiftedDown = tempTab.data.peakData.onPeakPrice[tempTab.data.peakData.onPeakPrice.length - 2]
    tempTab.data.peakData.onPeakPrice = tempTab.data.peakData.onPeakPrice.slice(0, -2)
    tempTab.data.peakData.onPeakPrice = tempTab.data.peakData.onPeakPrice + "0" + charToBeShiftedDown

    return this.setState({
      tab : tempTab
    })
s
    return console.log('there is a a decimal so we delete differently')
  }

  tempTab.data.peakData.onPeakPrice = tempTab.data.peakData.onPeakPrice.substring(0,tempTab.data.peakData.onPeakPrice.length - 1 )
  if (tempTab.data.peakData.onPeakPrice.length === 1){
    // if they deleted the last number, there is still a dollar sign in there, we must delete
    tempTab.data.peakData.onPeakPrice = ""
  }

  return this.setState({
    tab : tempTab
  })
}

// if the user inputs a decimal/period
else if (keyCode === 46){
  console.log('decimallllllll input')
  // if there is already a decimal, we don't want to let them input a decimal
  if (tempTab.data.peakData.onPeakPrice.indexOf('.') !== -1){
    // there is alredy a decimal in here so, alert and do nothing
    return alert('Decimal already in place')
  }

  tempTab.data.peakData.onPeakPrice = tempTab.data.peakData.onPeakPrice + ".00";
  return this.setState({
    tab : tempTab
  })
}

// if the keyCode is within this range then it is a number
else if (keyCode >= 48 && keyCode <= 57){
  console.log('KEY IS A NUMBER')

  if (tempTab.data.peakData.onPeakPrice.indexOf('.') !== -1){
    // there is a decimal, so the way we handle insertion is different
    if (tempTab.data.peakData.onPeakPrice[tempTab.data.peakData.onPeakPrice.length - 1] === "0"){
      tempTab.data.peakData.onPeakPrice = tempTab.data.peakData.onPeakPrice.slice(0, -1) + text[text.length - 1]
      return this.setState({
        tab : tempTab
      })
    }
    else if (tempTab.data.peakData.onPeakPrice[tempTab.data.peakData.onPeakPrice.length - 2] === "0"){
      // shift up
      let charToBeShiftedUp = tempTab.data.peakData.onPeakPrice[tempTab.data.peakData.onPeakPrice.length - 1]
      tempTab.data.peakData.onPeakPrice = tempTab.data.peakData.onPeakPrice.slice(0, -2)
      tempTab.data.peakData.onPeakPrice = tempTab.data.peakData.onPeakPrice + charToBeShiftedUp + text[text.length - 1]
      return this.setState({
        tab : tempTab
      })
    }
    else {
      return alert('Dollars only have 2 decimal points')
    }

  }


  // if the variable is empty, we initialize it to have a dollar sign in the beginning
  if (tempTab.data.peakData.onPeakPrice === ""){
    tempTab.data.peakData.onPeakPrice+= "$"
  }
  tempTab.data.peakData.onPeakPrice = tempTab.data.peakData.onPeakPrice + text[text.length - 1]
  return this.setState({
    tab : tempTab
  })
}
// if the user inputted a decimal/period
else if (keyCode === 190 || keyCode === 110){

}
else {
  return alert("Please input numbers only")
}
*/
