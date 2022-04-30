import React from 'react'

export default function CurrencyRow(props) {


    const{
        currencyOption,
        selectedCurrency,
        onChangeCurrency,
        amount,
        onChangeAmount
    }=props
  return (
    <div>
      <div>
      <input type ="number" value={amount} onChange={onChangeAmount}/>
      <select value={selectedCurrency}  onChange={onChangeCurrency} >
      
      {currencyOption.map(option => (
          <option key={option} value={option}>{option}</option>
      ))}
      
          
      </select>
    </div>
    </div>
  )
}
