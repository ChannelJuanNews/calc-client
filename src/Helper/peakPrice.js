export default (thisRef, event, text, tempTab, peak) => {
  console.log(thisRef)

  if (peak === 'onPeak') {

    tempTab.data.peakData.onPeakPrice = text
    return thisRef.setState({
        tab : tempTab
    })
    onPeak(thisRef, event, text, tempTab)
  }
  else if(peak === 'offPeak'){
    tempTab.data.peakData.offPeakPrice = text
    return thisRef.setState({
        tab : tempTab
    })
    offPeak(thisRef, event, text, tempTab)
  }
  else if(peak === 'midPeak'){
    tempTab.data.peakData.midPeakPrice = text
    return thisRef.setState({
        tab : tempTab
    })
    midPeak(thisRef, event, text, tempTab)
  }
  else if(peak === 'defaultPeaks'){
      tempTab.data.peakData.onPeakPrice = "$0.1033"
      tempTab.data.peakData.offPeakPrice = "$0.0828"
      tempTab.data.peakData.midPeakPrice = "$0.0727"

      return thisRef.setState({
          tab : tempTab
      })
  }

  else if (peak === "defaultDemandPrices"){
      tempTab.data.peakData.demandOnPeakPrice = "$6.88"
      tempTab.data.peakData.demandOffPeakPrice = "$1.31"
      tempTab.data.peakData.demandMidPeakPrice = "$2.74"

      return thisRef.setState({
          tab : tempTab
      })
  }

  else if (peak === "demandOnPeak"){
     tempTab.data.peakData.demandOnPeakPrice = text
     return thisRef.setState({
         tab : tempTab
     })
  }
  else if (peak === "demandOffPeak"){
     tempTab.data.peakData.demandOffPeakPrice = text
     return thisRef.setState({
         tab : tempTab
     })
  }
  else if (peak === "demandMidPeak"){
     tempTab.data.peakData.demandMidPeakPrice = text
     return thisRef.setState({
         tab : tempTab
     })
  }



  else if(peak === 'time'){
    let time = event.target.id.split('-')
    if (time.length !== 3){
        console.error("The length of this array should be 3", time)
    }
    for (var key in (tempTab.data.peakData.peaks)){
      if (key === time[2]){
          console.log(key, time[1])
          tempTab.data.peakData.peaks[key] = time[1]
          return thisRef.setState({
              tab : tempTab
          })
      }
    }
  }

  else if (peak === "defaultPeakTimes"){

      tempTab.data.peakData.peaks.oneAM = "off"
      tempTab.data.peakData.peaks.twoAM = "off"
      tempTab.data.peakData.peaks.threeAM = "off"
      tempTab.data.peakData.peaks.fourAM = "off"
      tempTab.data.peakData.peaks.fiveAM = "off"
      tempTab.data.peakData.peaks.sixAM = "off"
      tempTab.data.peakData.peaks.sevenAM = "off"
      tempTab.data.peakData.peaks.eightAM = "mid"
      tempTab.data.peakData.peaks.nineAM = "mid"
      tempTab.data.peakData.peaks.tenAM = "mid"
      tempTab.data.peakData.peaks.elevenAM = "mid"
      tempTab.data.peakData.peaks.twelvePM = "on"
      tempTab.data.peakData.peaks.onePM = "on"
      tempTab.data.peakData.peaks.twoPM = "on"
      tempTab.data.peakData.peaks.threePM = "on"
      tempTab.data.peakData.peaks.fourPM = "on"
      tempTab.data.peakData.peaks.fivePM = "on"
      tempTab.data.peakData.peaks.sixPM = "on"
      tempTab.data.peakData.peaks.sevenPM = "mid"
      tempTab.data.peakData.peaks.eightPM = "mid"
      tempTab.data.peakData.peaks.ninePM = "mid"
      tempTab.data.peakData.peaks.tenPM = "mid"
      tempTab.data.peakData.peaks.elevenPM = "mid"
      tempTab.data.peakData.peaks.twelveAM = "off"

      return thisRef.setState({
          tab : tempTab
      })
  }

  else {
      console.log('ERROR, we should not be here', event)
  }
}


function onPeak(thisRef, event, text, tempTab){

  // there are 3 main categories we want to deal with.
  // first is deletion,
  // second is insertion
  // and third is transformation from int to a double (e.g. 10 == > 10.00)

  let formatter = new Intl.NumberFormat('en-US', {
    style     : 'currency',
    currency  : 'USD'
  })

  if (tempTab.data.peakData.onPeakPrice.length > text.length){
    // there was a deletion

  }




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

    // if they input a decimal when it is empty
    if (tempTab.data.peakData.onPeakPrice === ""){
        tempTab.data.peakData.onPeakPrice = "$0.00"
        return thisRef.setState({
            tab : tempTab
        })
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

        // if they input a decimal when it is empty
        if (tempTab.data.peakData.offPeakPrice === ""){
            tempTab.data.peakData.offPeakPrice = "$0.00"
            return thisRef.setState({
                tab : tempTab
            })
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

function midPeak (thisRef, event, text, tempTab) {
    // there are 3 main categories we want to deal with.
    // first is deletion,
    // second is insertion
    // and third is transformation from int to a double (e.g. 10 == > 10.00)

    // this means there was a deletion
    if (tempTab.data.peakData.midPeakPrice.length > text.length){
      console.log('delete was called')
      // there are 2 differnt types of deletion, the first is if there is no decimal
      // and the second is if there is a decimal
      if (tempTab.data.peakData.midPeakPrice.indexOf('.') !== -1){
        // there is a decimal so deletion works differently
        if (tempTab.data.peakData.midPeakPrice[tempTab.data.peakData.midPeakPrice.length - 2] === "0" && tempTab.data.peakData.midPeakPrice[tempTab.data.peakData.midPeakPrice.length -1] === "0"){
          tempTab.data.peakData.midPeakPrice = tempTab.data.peakData.midPeakPrice.slice(0, -3)
          return thisRef.setState({
            tab : tempTab
          })
        }
        else if(tempTab.data.peakData.midPeakPrice[tempTab.data.peakData.midPeakPrice.length - 2] === "0" && tempTab.data.peakData.midPeakPrice[tempTab.data.peakData.midPeakPrice.length -1 ] !== "0"){
          tempTab.data.peakData.midPeakPrice = tempTab.data.peakData.midPeakPrice.slice(0, -1)
          tempTab.data.peakData.midPeakPrice= tempTab.data.peakData.midPeakPrice + "0"
          return thisRef.setState({
            tab : tempTab
          })
        }

        else {
          let charToBeShiftedDown = tempTab.data.peakData.midPeakPrice[tempTab.data.peakData.midPeakPrice.length - 2]
          tempTab.data.peakData.midPeakPrice = tempTab.data.peakData.midPeakPrice.slice(0, -2)
          tempTab.data.peakData.midPeakPrice = tempTab.data.peakData.midPeakPrice + "0" + charToBeShiftedDown
          return thisRef.setState({
            tab : tempTab
          })
        }

      }
      else {
        // no decimal so deletion works by just popping off the trailing number
        tempTab.data.peakData.midPeakPrice = tempTab.data.peakData.midPeakPrice.slice(0, -1)
        if (tempTab.data.peakData.midPeakPrice.length === 1){
          tempTab.data.peakData.midPeakPrice = ""
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
      if (tempTab.data.peakData.midPeakPrice.indexOf('.') !== -1){
        return alert('Decimal is already inserted')
      }

      // if they input a decimal when it is empty
      if (tempTab.data.peakData.midPeakPrice === ""){
          tempTab.data.peakData.midPeakPrice = "$0.00"
          return thisRef.setState({
              tab : tempTab
          })
      }

      tempTab.data.peakData.midPeakPrice = tempTab.data.peakData.midPeakPrice + ".00"
      return thisRef.setState({
        tab : tempTab
      })
    }

    if(keyCode >= 48 && keyCode <= 57){

      if (tempTab.data.peakData.midPeakPrice.indexOf('.') !== -1){

          // since there is a decimal, insertion works differently
          console.log(tempTab.data.peakData.midPeakPrice[tempTab.data.peakData.midPeakPrice.length - 1], "=======================")

          if (tempTab.data.peakData.midPeakPrice[tempTab.data.peakData.midPeakPrice.length - 2 ] === "0" && tempTab.data.peakData.midPeakPrice[tempTab.data.peakData.midPeakPrice.length - 1] === "0"){
            tempTab.data.peakData.midPeakPrice = tempTab.data.peakData.midPeakPrice.slice(0, -1)
            tempTab.data.peakData.midPeakPrice = tempTab.data.peakData.midPeakPrice + text[text.length -1]
            return thisRef.setState({
              tab : tempTab
            })
          }

          else if (tempTab.data.peakData.midPeakPrice[tempTab.data.peakData.midPeakPrice.length - 2] === "0" && tempTab.data.peakData.midPeakPrice[tempTab.data.peakData.midPeakPrice.length -1] !== "0"){
            console.log('this is where we are supposed to do the stuffs')
            let charToBeShiftedUp = tempTab.data.peakData.midPeakPrice[tempTab.data.peakData.midPeakPrice.length - 1]
            tempTab.data.peakData.midPeakPrice = tempTab.data.peakData.midPeakPrice.slice(0, -2)
            tempTab.data.peakData.midPeakPrice = tempTab.data.peakData.midPeakPrice + charToBeShiftedUp + text[text.length - 1]
            return thisRef.setState({
              tab : tempTab
            })
          }
          else if (tempTab.data.peakData.midPeakPrice[tempTab.data.peakData.midPeakPrice.length - 2] !== "0" && tempTab.data.peakData.midPeakPrice[tempTab.data.peakData.midPeakPrice.length - 1] === "0"){
            tempTab.data.peakData.midPeakPrice = tempTab.data.peakData.midPeakPrice.slice(0, -1)
            tempTab.data.peakData.midPeakPrice = tempTab.data.peakData.midPeakPrice + text[text.length -1]
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
        if (tempTab.data.peakData.midPeakPrice === ""){
          tempTab.data.peakData.midPeakPrice = "$" // if empty, initialize with a dollar sign
        }
        tempTab.data.peakData.midPeakPrice = tempTab.data.peakData.midPeakPrice + text[text.length - 1]
        return thisRef.setState({
          tab : tempTab
        })
      }

    }
    else {
      return alert('Please input numbers only')
    }
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
