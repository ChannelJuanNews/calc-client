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
  else if(peak === 'defaultPeaks'){
      tempTab.data.peakData.onPeakPrice = "$0.45"
      tempTab.data.peakData.offPeakPrice = "$0.13"
      tempTab.data.peakData.midPeakPrice = "$0.28"

      return thisRef.setState({
          tab : tempTab
      })
  }


}


function onPeak(thisRef, event, text, tempTab){

  // there are 3 main categories we want to deal with.
  // first is deletion,
  // second is insertion
  // and third is transformation from int to a double (e.g. 10 == > 10.00)



  // this means there was a deletion
  if (tempTab.data.peakData.onPeakPrice.length > text.length){
    console.log('delete was called')
    // there are 2 differnt types of deletion, the first is if there is no decimal
    // and the second is if there is a decimal
    if (tempTab.data.peakData.onPeakPrice.indexOf('.') !== -1){
      // there is a decimal so deletion works differently
      if (tempTab.data.peakData.onPeakPrice[tempTab.data.peakData.onPeakPrice.length - 2] === "0" && tempTab.data.peakData.onPeakPrice[tempTab.data.peakData.onPeakPrice.length -1] === "0"){
        tempTab.data.peakData.onPeakPrice = tempTab.data.peakData.onPeakPrice.slice(0, -3)
        return thisRef.setState({
          tab : tempTab
        })
      }
      else if(tempTab.data.peakData.onPeakPrice[tempTab.data.peakData.onPeakPrice.length - 2] === "0" && tempTab.data.peakData.onPeakPrice[tempTab.data.peakData.onPeakPrice.length -1 ] !== "0"){
        tempTab.data.peakData.onPeakPrice = tempTab.data.peakData.onPeakPrice.slice(0, -1)
        tempTab.data.peakData.onPeakPrice= tempTab.data.peakData.onPeakPrice + "0"
        return thisRef.setState({
          tab : tempTab
        })
      }

      else {
        let charToBeShiftedDown = tempTab.data.peakData.onPeakPrice[tempTab.data.peakData.onPeakPrice.length - 2]
        tempTab.data.peakData.onPeakPrice = tempTab.data.peakData.onPeakPrice.slice(0, -2)
        tempTab.data.peakData.onPeakPrice = tempTab.data.peakData.onPeakPrice + "0" + charToBeShiftedDown
        return thisRef.setState({
          tab : tempTab
        })
      }

    }
    else {
      // no decimal so deletion works by just popping off the trailing number
      tempTab.data.peakData.onPeakPrice = tempTab.data.peakData.onPeakPrice.slice(0, -1)
      if (tempTab.data.peakData.onPeakPrice.length === 1){
        tempTab.data.peakData.onPeakPrice = ""
      }
      return thisRef.setState({
        tab : tempTab
      })
    }
  }





  // if there was no deletion, then there was an insertion. we handle two types of insertion
  // the first is normal insertion, and the second is insertion with a decimal since there can
  // only be insertion with a precision of up to 2 decimal places

  // first, let's grab the key code for the character that was just inserted.
  // we want to validate that it is in fact a number using ASCII
  let keyCode = text.charCodeAt(text.length - 1) // t the char/key code for the character that was just inputted
  console.log(keyCode, text)


  // first we deal with the transformation insertion
  if (keyCode === 46){
    if (tempTab.data.peakData.onPeakPrice.indexOf('.') !== -1){
      return alert('Decimal is already inserted')
    }
    tempTab.data.peakData.onPeakPrice = tempTab.data.peakData.onPeakPrice + ".00"
    return thisRef.setState({
      tab : tempTab
    })
  }





  if(keyCode >= 48 && keyCode <= 57){

    if (tempTab.data.peakData.onPeakPrice.indexOf('.') !== -1){

        // since there is a decimal, insertion works differently
        console.log(tempTab.data.peakData.onPeakPrice[tempTab.data.peakData.onPeakPrice.length - 1], "=======================")

        if (tempTab.data.peakData.onPeakPrice[tempTab.data.peakData.onPeakPrice.length - 2 ] === "0" && tempTab.data.peakData.onPeakPrice[tempTab.data.peakData.onPeakPrice.length - 1] === "0"){
          tempTab.data.peakData.onPeakPrice = tempTab.data.peakData.onPeakPrice.slice(0, -1)
          tempTab.data.peakData.onPeakPrice = tempTab.data.peakData.onPeakPrice + text[text.length -1]
          return thisRef.setState({
            tab : tempTab
          })
        }

        else if (tempTab.data.peakData.onPeakPrice[tempTab.data.peakData.onPeakPrice.length - 2] === "0" && tempTab.data.peakData.onPeakPrice[tempTab.data.peakData.onPeakPrice.length -1] !== "0"){
          console.log('this is where we are supposed to do the stuffs')
          let charToBeShiftedUp = tempTab.data.peakData.onPeakPrice[tempTab.data.peakData.onPeakPrice.length - 1]
          tempTab.data.peakData.onPeakPrice = tempTab.data.peakData.onPeakPrice.slice(0, -2)
          tempTab.data.peakData.onPeakPrice = tempTab.data.peakData.onPeakPrice + charToBeShiftedUp + text[text.length - 1]
          return thisRef.setState({
            tab : tempTab
          })
        }
        else if (tempTab.data.peakData.onPeakPrice[tempTab.data.peakData.onPeakPrice.length - 2] !== "0" && tempTab.data.peakData.onPeakPrice[tempTab.data.peakData.onPeakPrice.length - 1] === "0"){
          tempTab.data.peakData.onPeakPrice = tempTab.data.peakData.onPeakPrice.slice(0, -1)
          tempTab.data.peakData.onPeakPrice = tempTab.data.peakData.onPeakPrice + text[text.length -1]
          return thisRef.setState({
            tab : tempTab
          })
        }
        else {
          return alert('decimal precision of only 2 points allowed')
        }

    }
    else {
      // there is no decimal so indertion works by just appending to end
      if (tempTab.data.peakData.onPeakPrice === ""){
        tempTab.data.peakData.onPeakPrice = "$" // if empty, initialize with a dollar sign
      }
      tempTab.data.peakData.onPeakPrice = tempTab.data.peakData.onPeakPrice + text[text.length - 1]
      return thisRef.setState({
        tab : tempTab
      })
    }

  }
  else {
    return alert('Please input numbers only')
  }
}

function offPeak(thisRef, event, text, tempTab){
      // there are 3 main categories we want to deal with.
      // first is deletion,
      // second is insertion
      // and third is transformation from int to a double (e.g. 10 == > 10.00)

      // this means there was a deletion
      if (tempTab.data.peakData.offPeakPrice.length > text.length){
        console.log('delete was called')
        // there are 2 differnt types of deletion, the first is if there is no decimal
        // and the second is if there is a decimal
        if (tempTab.data.peakData.offPeakPrice.indexOf('.') !== -1){
          // there is a decimal so deletion works differently
          if (tempTab.data.peakData.offPeakPrice[tempTab.data.peakData.offPeakPrice.length - 2] === "0" && tempTab.data.peakData.offPeakPrice[tempTab.data.peakData.offPeakPrice.length -1] === "0"){
            tempTab.data.peakData.offPeakPrice = tempTab.data.peakData.offPeakPrice.slice(0, -3)
            return thisRef.setState({
              tab : tempTab
            })
          }
          else if(tempTab.data.peakData.offPeakPrice[tempTab.data.peakData.offPeakPrice.length - 2] === "0" && tempTab.data.peakData.offPeakPrice[tempTab.data.peakData.offPeakPrice.length -1 ] !== "0"){
            tempTab.data.peakData.offPeakPrice = tempTab.data.peakData.offPeakPrice.slice(0, -1)
            tempTab.data.peakData.offPeakPrice= tempTab.data.peakData.offPeakPrice + "0"
            return thisRef.setState({
              tab : tempTab
            })
          }

          else {
            let charToBeShiftedDown = tempTab.data.peakData.offPeakPrice[tempTab.data.peakData.offPeakPrice.length - 2]
            tempTab.data.peakData.offPeakPrice = tempTab.data.peakData.offPeakPrice.slice(0, -2)
            tempTab.data.peakData.offPeakPrice = tempTab.data.peakData.offPeakPrice + "0" + charToBeShiftedDown
            return thisRef.setState({
              tab : tempTab
            })
          }

        }
        else {
          // no decimal so deletion works by just popping off the trailing number
          tempTab.data.peakData.offPeakPrice = tempTab.data.peakData.offPeakPrice.slice(0, -1)
          if (tempTab.data.peakData.offPeakPrice.length === 1){
            tempTab.data.peakData.offPeakPrice = ""
          }
          return thisRef.setState({
            tab : tempTab
          })
        }
      }

      // if there was no deletion, then there was an insertion. we handle two types of insertion
      // the first is normal insertion, and the second is insertion with a decimal since there can
      // only be insertion with a precision of up to 2 decimal places

      // first, let's grab the key code for the character that was just inserted.
      // we want to validate that it is in fact a number using ASCII
      let keyCode = text.charCodeAt(text.length - 1) // t the char/key code for the character that was just inputted
      console.log(keyCode, text)


      // first we deal with the transformation insertion
      if (keyCode === 46){
        if (tempTab.data.peakData.offPeakPrice.indexOf('.') !== -1){
          return alert('Decimal is already inserted')
        }
        tempTab.data.peakData.offPeakPrice = tempTab.data.peakData.offPeakPrice + ".00"
        return thisRef.setState({
          tab : tempTab
        })
      }

      if(keyCode >= 48 && keyCode <= 57){

        if (tempTab.data.peakData.offPeakPrice.indexOf('.') !== -1){

            // since there is a decimal, insertion works differently
            console.log(tempTab.data.peakData.offPeakPrice[tempTab.data.peakData.offPeakPrice.length - 1], "=======================")

            if (tempTab.data.peakData.offPeakPrice[tempTab.data.peakData.offPeakPrice.length - 2 ] === "0" && tempTab.data.peakData.offPeakPrice[tempTab.data.peakData.offPeakPrice.length - 1] === "0"){
              tempTab.data.peakData.offPeakPrice = tempTab.data.peakData.offPeakPrice.slice(0, -1)
              tempTab.data.peakData.offPeakPrice = tempTab.data.peakData.offPeakPrice + text[text.length -1]
              return thisRef.setState({
                tab : tempTab
              })
            }

            else if (tempTab.data.peakData.offPeakPrice[tempTab.data.peakData.offPeakPrice.length - 2] === "0" && tempTab.data.peakData.offPeakPrice[tempTab.data.peakData.offPeakPrice.length -1] !== "0"){
              console.log('this is where we are supposed to do the stuffs')
              let charToBeShiftedUp = tempTab.data.peakData.offPeakPrice[tempTab.data.peakData.offPeakPrice.length - 1]
              tempTab.data.peakData.offPeakPrice = tempTab.data.peakData.offPeakPrice.slice(0, -2)
              tempTab.data.peakData.offPeakPrice = tempTab.data.peakData.offPeakPrice + charToBeShiftedUp + text[text.length - 1]
              return thisRef.setState({
                tab : tempTab
              })
            }
            else if (tempTab.data.peakData.offPeakPrice[tempTab.data.peakData.offPeakPrice.length - 2] !== "0" && tempTab.data.peakData.offPeakPrice[tempTab.data.peakData.offPeakPrice.length - 1] === "0"){
              tempTab.data.peakData.offPeakPrice = tempTab.data.peakData.offPeakPrice.slice(0, -1)
              tempTab.data.peakData.offPeakPrice = tempTab.data.peakData.offPeakPrice + text[text.length -1]
              return thisRef.setState({
                tab : tempTab
              })
            }
            else {
              return alert('decimal precision of only 2 points allowed')
            }

        }
        else {
          // there is no decimal so indertion works by just appending to end
          if (tempTab.data.peakData.offPeakPrice === ""){
            tempTab.data.peakData.offPeakPrice = "$" // if empty, initialize with a dollar sign
          }
          tempTab.data.peakData.offPeakPrice = tempTab.data.peakData.offPeakPrice + text[text.length - 1]
          return thisRef.setState({
            tab : tempTab
          })
        }

      }
      else {
        return alert('Please input numbers only')
      }
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
